from polygon import RESTClient
import mysql.connector
from datetime import datetime, timezone
import os
from dotenv import load_dotenv
import json

load_dotenv(dotenv_path='./.env')
api_key = os.getenv("POLYGON_API_KEY")
client = RESTClient(api_key)

connection = mysql.connector.connect(
    host=os.getenv('DB_HOST'),
    user=os.getenv('DB_USERNAME'),
    password=os.getenv('DB_PASSWORD'),
    database=os.getenv('DB_DATABASE'),
    port= os.getenv('DB_PORT'),
)

def getSNP500():
    with open('./storage/app/public/cache/active_assets.json', 'r') as f:
        stocks = json.load(f)
    stocks = {stock['symbol']: stock['company_name'] for stock in stocks}

    return stocks

snapshot = client.get_snapshot_all("stocks")
stocks = getSNP500()
data_to_insert = []

for item in snapshot:
    if item.ticker not in stocks:
        continue

    percentage_change = 0

    row = (
        item.ticker,
        stocks[item.ticker],
        item.day.volume,
        round(item.day.close, 4),
        round(item.prev_day.open, 4),
        round(item.prev_day.close, 4),
        round(item.last_trade.price, 4) if item.last_trade else round(item.day.close, 4),
        round(percentage_change, 2),
        datetime.now(timezone.utc),
        # datetime.fromtimestamp(int(str(item.updated)[:13]) / 1000),
        datetime.now(timezone.utc),
    )

    data_to_insert.append(row)

cursor = connection.cursor()
insert_query = """
INSERT INTO stocks_overview (
    symbol, company_name, volume, day_close,
    prev_day_open, prev_day_close, latest_price,
    percentage_change, created_at, updated_at
) VALUES (
    %s, %s, %s, %s,
    %s, %s, %s,
    %s, %s, %s
)
"""

if len(data_to_insert) > 0:
    cursor.execute("TRUNCATE TABLE stocks_overview")
    cursor.executemany(insert_query, data_to_insert)
    connection.commit()

    print(f"Inserted {cursor.rowcount} rows.")

cursor.close()
connection.close()
