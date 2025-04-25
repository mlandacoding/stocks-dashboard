import os
import json
from datetime import datetime, timedelta, time
from collections import defaultdict
import pytz

# Set your base path
BASE_PATH = r'c:\wamp64\www\reverb-test'
INPUT_DIR = os.path.join(BASE_PATH, 'storage', 'app', 'public', 'intraday')
OUTPUT_DIR = os.path.join(BASE_PATH, 'storage', 'app', 'public', 'intraday', '5mCon')

# Ensure output directory exists
os.makedirs(OUTPUT_DIR, exist_ok=True)

# Start of interval (7:30 AM ET)
ET = pytz.timezone('America/New_York')
INTERVAL_START = ET.localize(datetime.combine(datetime.now(), time(7, 30)))

def get_5m_bucket(timestamp):
    # Align timestamp to next closest 5-minute interval from 7:30
    diff = timestamp - INTERVAL_START
    total_minutes = int(diff.total_seconds() // 60)
    bucket_minutes = (total_minutes // 5) * 5
    return INTERVAL_START + timedelta(minutes=bucket_minutes)

for filename in os.listdir(INPUT_DIR):
    if not filename.endswith('.json'):
        continue

    symbol = filename.replace('.json', '')
    input_path = os.path.join(INPUT_DIR, filename)

    try:
        with open(input_path, 'r') as f:
            data = json.load(f)
    except (json.JSONDecodeError, FileNotFoundError):
        print(f"Skipping invalid file: {filename}")
        continue

    buckets = defaultdict(list)

    for entry in data:
        try:
            ts = datetime.fromisoformat(entry['timestamp']).astimezone(ET)
        except Exception:
            continue

        if ts < INTERVAL_START:
            continue

        bucket_time = get_5m_bucket(ts)

        # Optional: Stop at 8:00 PM if you want to limit range
        # if bucket_time > ET.localize(datetime.combine(ts.date(), time(20, 0))):
        #     continue

        buckets[bucket_time.isoformat()].append(entry)

    consolidated = []
    for bucket, entries in sorted(buckets.items()):
        if not entries:
            continue

        prices = [e['price'] for e in entries if 'price' in e]
        volumes = [e['volume'] for e in entries if 'volume' in e]

        if not prices or not volumes:
            continue

        avg_price = sum(prices) / len(prices)
        total_volume = sum(volumes)

        consolidated.append({
            'timestamp': bucket,
            'price': round(avg_price, 4),
            'total_volume': total_volume
        })

    output_path = os.path.join(OUTPUT_DIR, f"{symbol}.json")
    with open(output_path, 'w') as out:
        json.dump(consolidated, out, indent=4)

    print(f"Saved 5mConsolidated: {symbol} -> {len(consolidated)} entries")
