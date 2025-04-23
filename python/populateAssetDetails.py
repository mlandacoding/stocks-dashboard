from polygon import RESTClient
from polygon.rest.models import TickerSnapshot, Agg
import mysql.connector
from datetime import datetime, timezone
import os
from dotenv import load_dotenv
import json

load_dotenv(dotenv_path='./.env')
client = RESTClient(os.getenv("POLYGON_API_KEY"))

connection = mysql.connector.connect(
    host=os.getenv('DB_HOST'),
    user=os.getenv('DB_USERNAME'),
    password=os.getenv('DB_PASSWORD'),
    database=os.getenv('DB_DATABASE'),
    port= os.getenv('DB_PORT'),
)

def getSNP500():
    with open('./storage/app/private/cache/active_assets.json', 'r') as f:
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
        )
        data_to_insert.append(row)
    except:
        print(f'Symbol : {symbol} - not found')

cursor = connection.cursor()
insert_query = """
INSERT INTO asset_details (
    symbol, marketcap, share_class_shares_outstanding, weighted_shares_outstanding, updated_at, created_at
) VALUES (
    %s, %s, %s, %s, %s, %s
)
"""

if len(data_to_insert) > 0:
    cursor.execute("TRUNCATE TABLE asset_details")
    cursor.executemany(insert_query, data_to_insert)
    connection.commit()

    print(f"Inserted {cursor.rowcount} rows.")
    cursor.close()
    connection.close()

