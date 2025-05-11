from polygon import RESTClient
import mysql.connector
from datetime import datetime
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
    port=os.getenv('DB_PORT'),
)
cursor = connection.cursor()

def get_timeframe(filing):
    try:
        start = datetime.strptime(filing.start_date, '%Y-%m-%d')
        end = datetime.strptime(filing.end_date, '%Y-%m-%d')
        diff_days = (end - start).days

        return 'annual' if diff_days > 95 else 'quarterly'
    except Exception as e:
        print(f"Error determining timeframe: {e}")
        return None

def getActiveAssets():
    with open('../storage/app/public/cache/active_assets.json', 'r') as f:
        stocks = json.load(f)
    return {stock['symbol']: stock['company_name'] for stock in stocks}


def insert_filing(cursor, filing, symbol, cik):
    try:
        cursor.execute("""
            SELECT id FROM filings
            WHERE cik = %s AND symbol = %s AND filing_date = %s
        """, (cik, symbol, filing.filing_date))
        existing = cursor.fetchone()
        if existing:
            return 'EXISTS'

        cursor.execute("""
            INSERT INTO filings (
                `cik`, `symbol`, `filing_date`,
                `source_filing_url`, `source_filing_file_url`,
                `fiscal_period`, `fiscal_year`, `timeframe`,
                `start_date`, `end_date`, `created_at`, `updated_at`
            )
            VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, NOW(), NOW())
        """, (
            cik,
            symbol,
            filing.filing_date,
            filing.source_filing_url,
            filing.source_filing_file_url,
            getattr(filing, 'fiscal_period', None),
            getattr(filing, 'fiscal_year', None),
            getattr(filing, 'timeframe', None),
            getattr(filing, 'start_date', None),
            getattr(filing, 'end_date', None)
        ))
        return cursor.lastrowid

    except Exception as e:
        print(f"Skipping filing due to error: {e}")
        return 'ERROR'


def insert_statement(cursor, filing, symbol, cik, statement_type):
    cursor.execute("""
        INSERT INTO financial_statements (
            cik, symbol, filing_date, statement_type,
            fiscal_period, fiscal_year, timeframe,
            created_at, updated_at
        ) VALUES (%s, %s, %s, %s, %s, %s, %s, NOW(), NOW())
    """, (
        cik,
        symbol,
        filing.filing_date,
        statement_type,
        filing.fiscal_period,
        filing.fiscal_year,
        filing.timeframe,
    ))
    return cursor.lastrowid


def insert_metrics(cursor, statement_id, metrics_dict, symbol, filing_date, cik):
    for key, data in metrics_dict.items():
        if data:
            value = data['value']
            label = data['label']
            unit = data['unit']
            order = data['order']
            source = data['source']
            xpath = data['xpath']
            print(xpath)
            formula = data['formula']

            cursor.execute("""
                INSERT INTO financial_metrics (
                    symbol, cik, filing_date, statement_type,
                    metric_key, label, value, unit, metric_order,
                    source, xpath, formula, created_at, updated_at
                ) VALUES (
                    %s, %s, %s, %s,
                    %s, %s, %s, %s, %s,
                    %s, %s, %s, NOW(), NOW()
                )
            """, (
                symbol,
                cik,
                filing_date,
                statement_type,
                key,
                label,
                value,
                unit,
                order,
                source,
                xpath,
                formula
            ))

stocks = getActiveAssets()

for symbol in stocks:
    cik = None
    data = []
    for f in client.vx.list_stock_financials(
        ticker=symbol,
        filing_date_gte="2010-01-01",
        order="asc",
        limit="100",
        sort="filing_date",
        include_sources=True,
        ):
        data.append(f)


    for filing in data:
        cik = filing.cik
        filing_id = insert_filing(cursor, filing, symbol, cik)
        filing.timeframe = get_timeframe(filing)

        if filing_id == 'EXISTS':
            print(f'Filing - {filing.timeframe} for {symbol} already exists')
            continue

        print(f'processing {symbol}')
        # Convert the nested object structure to a dict for your insert_metrics function
        statement_map = {
            "balance_sheet": filing.financials.balance_sheet,
            "cash_flow": filing.financials.cash_flow_statement,
            "comprehensive_income": filing.financials.comprehensive_income,
            "income_statement": getattr(filing.financials, "income_statement", None),
        }

        for statement_type, statement_obj in statement_map.items():
            if statement_obj is None:
                continue
            statement_id = insert_statement(cursor, filing, symbol, cik, statement_type)

            metrics_dict = {
                field: {
                    key: getattr(data_point, key)
                    for key in vars(data_point)
                }
                for field, data_point in vars(statement_obj).items()
                if data_point is not None
            }

            insert_metrics(cursor, statement_id, metrics_dict, symbol, filing.filing_date, cik)

            connection.commit()

cursor.close()
connection.close()
