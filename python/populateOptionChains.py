
from dotenv import load_dotenv
import os
import pandas as pd
from polygon.rest.models import OptionContractSnapshot, DayOptionContractSnapshot
from polygon import RESTClient
from dataclasses import asdict
from datetime import datetime
from options_calculations.riskFreeRateFromFred import get_free_risk_rate_from_fred
from options_calculations.blackScholesModel import price_using_black_sholes, get_greeks_black_scholes
from options_calculations.binomialOptionsPricingModel import *
import json
import mysql.connector


def is_in_the_money(option_type: str, option_strike_price: float, asset_price: float) -> bool:
    if option_type == 'call':
        return asset_price > option_strike_price
    return asset_price < option_strike_price

def get_active_assets() ->dict:
    with open('../storage/app/public/cache/active_assets.json', 'r') as f:
        stocks = json.load(f)
    return {stock['symbol']: stock['company_name'] for stock in stocks}


def get_stocks_latest_prices(stocks: dict, snapshot: list) -> dict:
    stock_to_price = {}
    for item in snapshot:
        if item.ticker not in stocks:
            continue
        stock_to_price[item.ticker] = item.day.vwap

    return  stock_to_price


def main():
    load_dotenv(dotenv_path='../.env')
    api_key = os.getenv("POLYGON_API_KEY")
    client = RESTClient(api_key)

    connection = mysql.connector.connect(
        host=os.getenv('DB_HOST'),
        user=os.getenv('DB_USERNAME'),
        password=os.getenv('DB_PASSWORD'),
        database=os.getenv('DB_DATABASE'),
        port=os.getenv('DB_PORT'),
    )

    todays_snapshot = client.get_snapshot_all("stocks")
    active_stocks = get_active_assets()
    stocks_with_latest_price = get_stocks_latest_prices(active_stocks, todays_snapshot)

    cursor = connection.cursor()
    cursor.execute("TRUNCATE TABLE option_chains")


    for symbol in active_stocks:
        options_chain = []
        data_to_insert = []

        print(f'Processing {symbol}')
        for o in client.list_snapshot_options_chain(
            symbol, params={"order": "asc", "limit": 50, "sort": "ticker","contract_type": "call"}, ):
            options_chain.append(o)
        # the limit filter in the api doesnt work well
        options_chain = options_chain[:75] if len(options_chain) >= 75 else options_chain

        for o in client.list_snapshot_options_chain(
            symbol, params={"order": "asc", "limit": 50, "sort": "ticker","contract_type": "put"}, ):
            options_chain.append(o)
        options_chain = options_chain[:150] if len(options_chain) >= 150 else options_chain

        for option in options_chain:
            if option.implied_volatility and option.day.vwap:
                try:
                    day_opt = asdict(option.day)
                    details_opt = asdict(option.details)
                    greeks_truth = asdict(option.greeks)
                    price_truth = day_opt['vwap']
                    days_to_expiry = (datetime.fromisoformat(details_opt['expiration_date']) - datetime.today()).days
                    implied_volatility = option.implied_volatility / 10
                    options_symbol = details_opt['ticker'][2:]
                    underlying_asset_price = stocks_with_latest_price[option.underlying_asset.ticker]
                    risk_free_rate = round(get_free_risk_rate_from_fred(days_to_expiry), 4)
                    strike_price = option.details.strike_price
                    type_of_option = option.details.contract_type
                    years_to_expiry = days_to_expiry / 252  # number of trading days

                    # not ideal for american style calls but a fun exercise
                    black_scholes_pricing = price_using_black_sholes(underlying_asset_price, strike_price, years_to_expiry,
                                                                     risk_free_rate, implied_volatility, type_of_option)
                    greeks_black_scholes = get_greeks_black_scholes(underlying_asset_price, strike_price, years_to_expiry,
                                                                    risk_free_rate, implied_volatility, type_of_option)
                    # better for pricing american options
                    binomial_pricing_jarrow = price_using_jarrow_rud_binomial_model(underlying_asset_price, strike_price,
                                                                                    years_to_expiry, risk_free_rate,
                                                                                    implied_volatility, type_of_option, 10)
                    binomial_pricing, options_tree = price_using_binomial_model(underlying_asset_price, strike_price,
                                                                                years_to_expiry, risk_free_rate,
                                                                                implied_volatility, type_of_option, 10)
                    greeks_binomial = calculate_greeks_for_binomial_model(underlying_asset_price, strike_price, years_to_expiry,
                                                                          risk_free_rate, implied_volatility, type_of_option,
                                                                          10, options_tree)
                    greeks_binomial['vega'] = calculate_vega(underlying_asset_price, strike_price, years_to_expiry,
                                                             risk_free_rate, implied_volatility, type_of_option, 10)
                    greeks_binomial['rho'] = calculate_rho(underlying_asset_price, strike_price, years_to_expiry,
                                                           risk_free_rate, implied_volatility, type_of_option, 10)
                    in_the_money = is_in_the_money(type_of_option, strike_price, underlying_asset_price)

                    truth_model_row = (options_symbol, symbol, type_of_option, strike_price, implied_volatility,
                        price_truth, "Polygon API", in_the_money, greeks_truth['delta'],
                        greeks_truth['gamma'], greeks_truth['theta'], None, greeks_truth['vega']
                    )
                    data_to_insert.append(truth_model_row)

                    black_scholes_pricing_row = (options_symbol, symbol, type_of_option, strike_price, implied_volatility,
                        black_scholes_pricing, "Black Scholes", in_the_money, greeks_black_scholes['delta'],
                        greeks_black_scholes['gamma'], greeks_black_scholes['theta'], greeks_black_scholes['rho'],
                        greeks_black_scholes['vega']
                    )
                    data_to_insert.append(black_scholes_pricing_row)

                    binomial_pricing_row = (options_symbol, symbol, type_of_option, strike_price, implied_volatility,
                        binomial_pricing, "Binomial Pricing", in_the_money, greeks_binomial['delta'], greeks_binomial['gamma'],
                                            greeks_binomial['theta'], greeks_binomial['rho'], greeks_binomial['vega'])
                    data_to_insert.append(binomial_pricing_row)

                    binomial_pricing_jarrow_row = (options_symbol,symbol, type_of_option,strike_price,implied_volatility,binomial_pricing_jarrow,
                        "Binomial Jarrow Model", in_the_money, None, None, None, None, None)
                    data_to_insert.append(binomial_pricing_jarrow_row)
                except:
                    print(f'Failed to process chain - {asdict(option.details)['ticker'][2:]} - {symbol}')
        insert_query = """
            INSERT INTO option_chains (
                option_symbol, underlying_asset_symbol, option_type, strike_price, implied_volatility, last_price,
                last_price_updated_at, model, moneyness, delta, gamma, theta, rho, vega, created_at, updated_at
            ) VALUES (
                %s, %s, %s, %s, %s, %s, NOW(),
                %s, %s, %s, %s, %s, %s, %s, NOW(), NOW()
            )"""
        if data_to_insert:
            cursor.executemany(insert_query, data_to_insert)
            connection.commit()
                # print(f"{options_symbol} - Truth: ${price_truth:.2f} | Asset price: $ {underlying_asset_price} | "
                #       f"Black-Scholes: ${black_scholes_pricing:.2f} | Binomial: ${binomial_pricing:.2f} | Binomial (Jarrow): ${binomial_pricing_jarrow:.2f} | In the Money : {in_the_money}")


    cursor.close()
    connection.close()
if __name__ == "__main__":
    main()

# print(options_chain)
