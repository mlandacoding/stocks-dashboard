
from dotenv import load_dotenv
import os
import pandas as pd
from polygon.rest.models import OptionContractSnapshot, DayOptionContractSnapshot
from polygon import RESTClient
from dataclasses import asdict
from datetime import datetime
from options_calculations.riskFreeRateFromFred import get_free_risk_rate_from_fred
import json

load_dotenv(dotenv_path='../.env')
api_key = os.getenv("POLYGON_API_KEY")
client = RESTClient(api_key)

def get_active_assets() ->dict:
    with open('./storage/app/public/cache/active_assets.json', 'r') as f:
        stocks = json.load(f)
    return {stock['symbol']: stock['company_name'] for stock in stocks}

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
    risk_free_rate = round(get_free_risk_rate_from_fred(days_to_expiry), 4)

    print(1)
df = pd.DataFrame([OptionContractSnapshot.__dict__ for option in options_chain])

print(options_chain)
