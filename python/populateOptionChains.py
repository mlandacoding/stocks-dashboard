
from dotenv import load_dotenv
import os
import pandas as pd
from polygon.rest.models import OptionContractSnapshot, DayOptionContractSnapshot
from polygon import RESTClient
from dataclasses import asdict
from datetime import datetime
from options_calculations.riskFreeRateFromFred import get_free_risk_rate_from_fred
from options_calculations.blackScholesModel import price_using_black_sholes, get_greeks_black_scholes
import json

load_dotenv(dotenv_path='../.env')
api_key = os.getenv("POLYGON_API_KEY")
client = RESTClient(api_key)



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

todays_snapshot = client.get_snapshot_all("stocks")
active_stocks = get_active_assets()
stocks_with_latest_price = get_stocks_latest_prices(active_stocks, todays_snapshot)

options_chain = []
for o in client.list_snapshot_options_chain(
    "AAPL",
    params={
        "order": "asc",
        "limit": 250,
        "sort": "ticker",
    },
):
    options_chain.append(o)

for option in options_chain:
    day_opt = asdict(option.day)
    details_opt = asdict(option.details)
    greeks_truth = asdict(option.greeks)
    price_truth = day_opt['vwap']
    days_to_expiry = (datetime.fromisoformat(details_opt['expiration_date']) - datetime.today()).days
    implied_volatility = option.implied_volatility
    options_symbol = details_opt['ticker']
    underlying_asset_price = stocks_with_latest_price[option.underlying_asset.ticker]
    risk_free_rate = round(get_free_risk_rate_from_fred(days_to_expiry), 4)
    strike_price = option.details.strike_price
    exercise_style = option.details.exercise_style
    type_of_option = option.details.contract_type
    years_to_expiry = days_to_expiry / 252 # number of trading days

    # not ideal for american style calls but a fun exercise
    black_scholes_pricing = price_using_black_sholes(underlying_asset_price,strike_price,years_to_expiry,risk_free_rate,implied_volatility,type_of_option)
    greeks_black_scholes = get_greeks_black_scholes(underlying_asset_price,strike_price,years_to_expiry,risk_free_rate,implied_volatility,type_of_option)
    print(1)
df = pd.DataFrame([OptionContractSnapshot.__dict__ for option in options_chain])

print(options_chain)
