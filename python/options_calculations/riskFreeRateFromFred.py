import pandas_datareader.data as web
from datetime import datetime, timedelta

FRED_RATES = [
    (30, 'DTB3'),    # 3-Month T Bill
    (90, 'DTB6'),    # 6-Month TBill
    (180, 'DTB6'),
    # Reuse 6-month for short-dated / Rates between 90 and 180 days shouldnt vary too much.
    # I could interpolate in the future for more accuracy
    (365, 'GS1'),(730, 'GS2'), (1095, 'GS3'),
    (1460, 'GS5'), (2555, 'GS7'), (3650, 'GS10'),
    (7300, 'GS20'), (99999, 'GS30')
]

def get_free_risk_rate_from_fred(days_to_expiry: int, as_decimal: bool = True) -> int:
    today = datetime.today()
    symbol = next(rate for days, rate in FRED_RATES if days_to_expiry <= days)

    try:
        data = web.DataReader(symbol, 'fred', today - timedelta(days=90), today)
        latest_rate = data.dropna().iloc[-1, 0]
        return latest_rate / 100 if as_decimal else latest_rate
    except Exception as e:
        print(f"No rate found in FRED - for {symbol}: {e}")
        try:
            # Fallback: Use GS10 (10-Year Treasury Yield)
            fallback_data = web.DataReader('GS10', 'fred', today - timedelta(days=90), today)
            fallback_rate = fallback_data.dropna().iloc[-1, 0]
            print("Using fallback rate (GS10).")
            return fallback_rate / 100 if as_decimal else fallback_rate
        except Exception as fallback_error:
            print(f"Fallback failed: {fallback_error}")
            return 0.04
