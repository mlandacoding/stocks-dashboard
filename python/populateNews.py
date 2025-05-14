from polygon import RESTClient
import mysql.connector
from datetime import datetime
import os
from dotenv import load_dotenv
import json
import uuid

env_path = os.path.join(os.path.dirname(__file__), '../.env')
load_dotenv(dotenv_path=env_path)
api_key = os.getenv('POLYGON_API_KEY')

client = RESTClient(api_key)

connection = mysql.connector.connect(
    host=os.getenv('DB_HOST'),
    user=os.getenv('DB_USERNAME'),
    password=os.getenv('DB_PASSWORD'),
    database=os.getenv('DB_DATABASE'),
    port=os.getenv('DB_PORT'),
)
cursor = connection.cursor()

def getActiveAssets():
    with open('./storage/app/public/cache/active_assets.json', 'r') as f:
        stocks = json.load(f)
    return {stock['symbol']: stock['company_name'] for stock in stocks}

stocks = getActiveAssets()

for stock in stocks:
    news = []
    for n in client.list_ticker_news(ticker=stock, order="asc", limit="10", published_utc_gte=datetime.now().date(), sort="published_utc"):
        news.append(n)

    for item in news:
        cursor.execute("SELECT id FROM news WHERE article_url = %s", (item.article_url,))
        existing = cursor.fetchone()
        if existing:
            news_db_id = existing[0]
            continue  # or update if needed

        iso_timestamp = item.published_utc
        parsed_timestamp = datetime.strptime(iso_timestamp, '%Y-%m-%dT%H:%M:%SZ')
        mysql_timestamp = parsed_timestamp.strftime('%Y-%m-%d %H:%M:%S')
        # Insert into news table
        cursor.execute("""
            INSERT INTO news (
                publisher_name, publisher_homepage_url, publisher_logo_url, publisher_favicon_url,
                title, author, published_utc, article_url, image_url, description, keywords, created_at, updated_at
            ) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, NOW(), NOW())
        """, (
            item.publisher.name,
            item.publisher.homepage_url,
            item.publisher.logo_url,
            item.publisher.favicon_url,
            item.title,
            item.author,
            mysql_timestamp,
            item.article_url,
            item.image_url,
            item.description,
            json.dumps(item.keywords) if item.keywords else None
        ))

        news_id = cursor.lastrowid

        # Insert into symbols_news pivot table
        for ticker in item.tickers:
            cursor.execute("""
                INSERT INTO symbols_news (symbol, news_id, created_at, updated_at)
                VALUES (%s, %s, NOW(), NOW())
            """, (ticker, news_id))

        # Insert insights if present
        if item.insights:
            for insight in item.insights:
                cursor.execute("""
                    INSERT INTO insights (news_id, symbol, sentiment, sentiment_reasoning, created_at, updated_at)
                    VALUES (%s, %s, %s, %s, NOW(), NOW())
                """, (
                    news_id,
                    insight.ticker,
                    insight.sentiment,
                    insight.sentiment_reasoning
                ))

    # Commit the inserts
    connection.commit()
