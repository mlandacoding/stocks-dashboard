import sys
import json

def main():
    input_text = sys.stdin.read()
    try:
        input_data = json.loads(input_text)
    except Exception:
        input_data = {}

    # Just echo input with added message
    output = {
        "message": "Python script ran successfully!",
        "input_received": input_data
    }

    print(json.dumps(output))

if __name__ == "__main__":
    main()
