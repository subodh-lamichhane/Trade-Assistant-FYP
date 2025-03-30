import sys
import json
from nepse import NepseData

def fetch_stock_data(symbol):
    try:
        nepse = NepseData()
        data = nepse.get_stock(symbol)
        if not data:
            raise ValueError(f"No data found for the symbol: {symbol}")
        print(json.dumps(data))
    except Exception as e:
        print(json.dumps({"error": str(e)}), file=sys.stderr)

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print(json.dumps({"error": "No symbol provided"}), file=sys.stderr)
        sys.exit(1)
    symbol = sys.argv[1]
    fetch_stock_data(symbol)
