from polygon import RESTClient
import mysql.connector
from datetime import datetime, timezone
import os
from dotenv import load_dotenv
import json

env_path = os.path.join(os.path.dirname(__file__), '../.env')
load_dotenv(dotenv_path=env_path)
api_key = os.getenv('POLYGON_API_KEY')

client = RESTClient(api_key)

connection = mysql.connector.connect(
    host=os.getenv('DB_HOST'),
    user=os.getenv('DB_USERNAME'),
    password=os.getenv('DB_PASSWORD'),
    database=os.getenv('DB_DATABASE'),
    port= os.getenv('DB_PORT'),
)

def getSNP500():
    with open('../storage/app/public/cache/active_assets.json', 'r') as f:
        stocks = json.load(f)
    stocks = {stock['symbol']: stock['company_name'] for stock in stocks}

    return stocks

print("Populating assets ...")

stocks = getSNP500()
data_to_insert = []
for symbol in stocks:
    try:
        ticket_details = client.get_ticker_details(symbol)
        row = (
            symbol,
            ticket_details.market_cap,
            ticket_details.share_class_shares_outstanding,
            ticket_details.weighted_shares_outstanding,
            datetime.now(timezone.utc),
            datetime.now(timezone.utc),
            ticket_details.name,
            ticket_details.cik,
            ticket_details.composite_figi,
            ticket_details.share_class_figi,
            ticket_details.description,
            ticket_details.sic_code,
            ticket_details.sic_description,
            ticket_details.ticker_root,
            ticket_details.total_employees
        )
        data_to_insert.append(row)
    except:
        print(f'Symbol : {symbol} - not found')

cursor = connection.cursor()
insert_query = """
INSERT INTO asset_details (
    symbol, marketcap, share_class_shares_outstanding, weighted_shares_outstanding, created_at, updated_at,
    name,cik, composite_figi, share_class_figi, description, sic_code, sic_description,
    ticker_root, total_employees
) VALUES (
    %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s
)
"""

if len(data_to_insert) > 0:
    cursor.execute("TRUNCATE TABLE asset_details")
    cursor.executemany(insert_query, data_to_insert)
    connection.commit()

    print(f"Inserted {cursor.rowcount} rows.")
    cursor.close()
    connection.close()

