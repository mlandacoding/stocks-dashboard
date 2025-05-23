
from dotenv import load_dotenv
import os
from polygon import RESTClient
from dataclasses import asdict
from datetime import datetime
from options_calculations.riskFreeRateFromFred import get_free_risk_rate_from_fred
from options_calculations.blackScholesModel import price_using_black_sholes, get_greeks_black_scholes
from options_calculations.binomialOptionsPricingModel import *
from options_calculations.QuantLibMethods.QLPricingModels import *
import json
import mysql.connector
from decimal import Decimal, InvalidOperation
from options.Option import Option

def get_last_price(symbol, client):
    try:
        return client.get_snapshot_ticker('stocks',symbol).day.close
    except:
        return None


def is_in_the_money(option_type: str, option_strike_price: float, asset_price: float) -> bool:
    if option_type == 'call':
        return asset_price > option_strike_price
    return asset_price < option_strike_price

def get_active_asset_symbols() ->list:
    with open('../storage/app/public/cache/active_assets.json', 'r') as f:
        stocks = json.load(f)
    active_assets = {stock['symbol']: stock['company_name'] for stock in stocks}

    # to get rid of the exchange prefix
    active_assets = sorted([symbol.split(":")[-1].strip() for symbol in active_assets])
    return active_assets


def get_stocks_latest_prices(stocks: dict, snapshot: list) -> dict:
    stock_to_price = {}
    for item in snapshot:
        if item.ticker not in stocks:
            continue
        stock_to_price[item.ticker] = item.day.close

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

    active_stocks = get_active_asset_symbols()
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

        underlying_asset_price = get_last_price(symbol, client)
        if underlying_asset_price:
            for option in options_chain:
                if option.implied_volatility and option.day.close:
                    # try:
                    day_opt = asdict(option.day)
                    details_opt = asdict(option.details)
                    greeks_truth = asdict(option.greeks)
                    price_truth = day_opt['close']
                    days_to_expiry = (datetime.fromisoformat(details_opt['expiration_date']).date() - datetime.today().date()).days
                    expiration_date = details_opt['expiration_date']
                    implied_volatility = option.implied_volatility / 10
                    options_symbol = details_opt['ticker'][2:]

                    risk_free_rate = round(get_free_risk_rate_from_fred(days_to_expiry), 4)
                    strike_price = option.details.strike_price
                    type_of_option = option.details.contract_type
                    years_to_expiry = (days_to_expiry +1) / 252  # number of trading days

                    # this is considered truth
                    option_polygon = Option(options_symbol, symbol, type_of_option, strike_price, implied_volatility,
                        price_truth, datetime.today(), underlying_asset_price, years_to_expiry,risk_free_rate)
                    option_polygon.model = "Polygon API"
                    option_polygon.set_greeks(greeks_truth)
                    data_to_insert.append(option_polygon.to_mysql_row())

                    # not ideal for american style calls but a fun exercise
                    option_black_scholes = Option(options_symbol, symbol, type_of_option, strike_price, implied_volatility,
                        price_truth, datetime.today(), underlying_asset_price, years_to_expiry, risk_free_rate)

                    option_black_scholes.model = "Black-Scholes"
                    option_black_scholes.model_calculated_price = price_using_black_sholes(option_black_scholes)
                    option_black_scholes.set_greeks(get_greeks_black_scholes(option_black_scholes))
                    data_to_insert.append(option_black_scholes.to_mysql_row())

                    # better for pricing american options
                    option_binomial_jarrow = Option(options_symbol, symbol, type_of_option, strike_price, implied_volatility,
                        price_truth, datetime.today(), underlying_asset_price, years_to_expiry, risk_free_rate)
                    option_binomial_jarrow.model = "Binomial Jarrow Model"
                    option_binomial_jarrow.model_calculated_price = price_using_jarrow_rud_binomial_model(option_binomial_jarrow, 10)
                    data_to_insert.append(option_binomial_jarrow.to_mysql_row())

                    option_binomial_pricing = Option(options_symbol, symbol, type_of_option, strike_price, implied_volatility,
                        price_truth, datetime.today(), underlying_asset_price, years_to_expiry, risk_free_rate)
                    option_binomial_pricing.model = "Binomial Pricing"
                    binomial_pricing, options_tree = price_using_binomial_model(option_binomial_pricing, 10)
                    option_binomial_pricing.model_calculated_price = binomial_pricing

                    greeks_binomial = calculate_greeks_for_binomial_model(option_binomial_pricing,10, options_tree)
                    greeks_binomial['vega'] = calculate_vega(option_binomial_pricing, 10)
                    greeks_binomial['rho'] = calculate_rho(option_binomial_pricing, 10)
                    option_binomial_pricing.set_greeks(greeks_binomial)
                    data_to_insert.append(option_binomial_pricing.to_mysql_row())

                    # ql_black_scholes_obj = ql_fd_black_scholes(underlying_asset_price, strike_price, expiration_date,
                    #                                     risk_free_rate, implied_volatility, type_of_option)
                    # montecarlo, binomial_ql = ql_montecarlo_american_engine(underlying_asset_price, strike_price,expiration_date,risk_free_rate,implied_volatility, type_of_option)

                    # except:
                    #     print(f'Failed to process chain - {asdict(option.details)['ticker'][2:]} - {symbol}')
            insert_query = """
                INSERT INTO option_chains (
                    option_symbol, underlying_asset_symbol, option_type, strike_price, implied_volatility, last_price,
                    last_price_updated_at, model, moneyness, delta, gamma, theta, rho, vega, created_at, updated_at
                ) VALUES (
                    %s, %s, %s, %s, %s, %s, NOW(),
                    %s, %s, %s, %s, %s, %s, %s, NOW(), NOW()
                )"""
            if data_to_insert:
                for i, row in enumerate(data_to_insert):
                    try:
                        # Optional: cast rho to Decimal explicitly for safety
                        if row[12] is not None:
                            try:
                                row = list(row)  # convert to mutable
                                row[12] = Decimal(str(row[12]))
                            except InvalidOperation:
                                print(f"[Invalid Decimal] row {i}: rho = {row[12]}")
                                continue

                        cursor.execute(insert_query, row)
                    except Exception as e:
                        print(f"[Insert Error] row {i}: {row}")
                        print(f"Error: {e}")
                        continue

                connection.commit()

    cursor.close()
    connection.close()
if __name__ == "__main__":
    main()

# print(options_chain)
