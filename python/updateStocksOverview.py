from polygon import RESTClient
from polygon.rest.models import TickerSnapshot, Agg
import mysql.connector
from datetime import datetime
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
    mycursor = connection.cursor()
    with open('./storage/app/private/cache/active_assets.json', 'r') as f:
        stocks = json.load(f)
    stocks = {stock['symbol']: stock['company_name'] for stock in stocks}

    return stocks

snapshot = client.get_snapshot_all("stocks")
stocks = getSNP500()
data_to_insert = []

for item in snapshot:
    if item.ticker not in stocks:
        continue

    if not isinstance(item, TickerSnapshot):
        continue

    if not isinstance(item.prev_day, Agg) or not isinstance(item.day, Agg):
        continue

    if not isinstance(item.prev_day.open, float) or not isinstance(item.prev_day.close, float):
        continue

    # if item.day.transactions is None:
    #     continue

    if item.day.close == 0:
        continue
    else:
        percent_change = ((item.prev_day.close * 100) / item.day.close) - 100
        percent_change *= -1

    row = (
        item.ticker,
        stocks[item.ticker],
        item.day.volume,
        round(item.day.close, 4),
        round(item.prev_day.open, 4),
        round(item.prev_day.close, 4),
        round(item.last_trade.price, 4) if item.last_trade else round(item.day.close, 4),
        round(percent_change, 2),
        datetime.fromtimestamp(int(str(item.updated)[:13]) / 1000),
        datetime.utcnow(),
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
