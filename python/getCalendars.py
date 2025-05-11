from polygon import RESTClient
from polygon.rest.models import MarketHoliday
import mysql.connector
from datetime import datetime
import os
from dotenv import load_dotenv

api_key = os.getenv("POLYGON_API_KEY")
client = RESTClient(api_key)

connection = mysql.connector.connect(
    host=os.getenv('DB_HOST'),
    user=os.getenv('DB_USERNAME'),
    password=os.getenv('DB_PASSWORD'),
    database=os.getenv('DB_DATABASE'),
    port= os.getenv('DB_PORT'),
)

def insertCalendar(connection, holidays):
    cursor = connection.cursor()
    insert_query = """
    INSERT IGNORE INTO calendars (
        date, name, exchange, status, open, close, created_at, updated_at
    ) VALUES (
        %s, %s, %s, %s,
        %s, %s, %s, %s
    )
    """
    cursor.executemany(insert_query, holidays)
    connection.commit()

    print(f"Inserted {cursor.rowcount} rows.")


def getHolidayRowsToInsert(holidays):
    data_to_insert = []
    for holiday in holidays:
    # verify this is an exchange
        if isinstance(holiday, MarketHoliday):
            # print("{:<15} {:<15}     {:<15} ({})".format(holiday.date, holiday.name, holiday.exchange, holiday.close))

            row = (
                holiday.date,
                holiday.name,
                holiday.exchange,
                holiday.status,
                holiday.open,
                holiday.close,
                datetime.utcnow(),
                datetime.utcnow(),
            )

            data_to_insert.append(row)

    return data_to_insert

def main():
    holidays = client.get_market_holidays()
    data_to_insert = getHolidayRowsToInsert(holidays)
    print(data_to_insert)
    insertCalendar(connection, data_to_insert)
if __name__ == "__main__":
    main()



