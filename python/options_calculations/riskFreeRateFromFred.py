from datetime import datetime, timedelta
import pandas_datareader.data as web

FRED_RATES = [
    (30, 'DTB3'),
    (90, 'DTB6'),
    (180, 'DTB6'),
    (365, 'GS1'),
    (730, 'GS2'),
    (1095, 'GS3'),
    (1460, 'GS5'),
    (2555, 'GS7'),
    (3650, 'GS10'),
    (7300, 'GS20'),
    (99999, 'GS30')
]

def fetch_risk_free_rates(as_decimal=True):
    today = datetime.today()
    start_date = today - timedelta(days=90)
    rate_values = {}

    for _, symbol in set(FRED_RATES):  # fetch each symbol only once
        try:
            data = web.DataReader(symbol, 'fred', start_date, today)
            latest_value = data.dropna().iloc[-1, 0]
            rate_values[symbol] = latest_value / 100 if as_decimal else latest_value
        except Exception as e:
            print(f"Failed to fetch {symbol}: {e}")
            rate_values[symbol] = None

    # Fallback to GS10 if any rate is missing
    fallback = rate_values.get('GS10', 0.04 if as_decimal else 4.0)
    for k, v in rate_values.items():
        if v is None:
            rate_values[k] = fallback

    return rate_values

def build_static_rate_lookup(rate_values):
    def get_rate(days_to_expiry):
        symbol = next(rate for days, rate in FRED_RATES if days_to_expiry <= days)
        return rate_values.get(symbol, 0.04)  # safe fallback if not found

    return get_rate
