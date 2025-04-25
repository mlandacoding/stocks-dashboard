import os
import json
from datetime import datetime, timedelta, time
from collections import defaultdict
import pytz

# Set your base path
BASE_PATH = r'c:\wamp64\www\reverb-test'
INPUT_DIR = os.path.join(BASE_PATH, 'storage', 'app', 'public', 'intraday')
OUTPUT_DIR = os.path.join(BASE_PATH, 'storage', 'app', 'public', 'intraday', '5mCon2')

# Ensure output directory exists
os.makedirs(OUTPUT_DIR, exist_ok=True)
eastern = pytz.timezone('America/New_York')


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

    compressed_json = []
    for entry in data:
        timestamp = entry['timestamp']
        price = round(entry['price'],2)
        compressed_json.append([timestamp,price])

    filtered_data = []
    reference_time = datetime.fromisoformat(compressed_json[0][0])
    for compressed in compressed_json:
        entry_time = datetime.fromisoformat(compressed[0])
        if reference_time is None or entry_time >= reference_time + timedelta(minutes=5):
            filtered_data.append(compressed)
            reference_time = entry_time


    # converted = [[t , ] for t, p in filtered_data]

    output_path = os.path.join(OUTPUT_DIR, f"{symbol}.json")
    with open(output_path, 'w') as out:
        json.dump(filtered_data, out)

    # print(f"Saved 5mConsolidated: {symbol} -> {len(consolidated)} entries")
