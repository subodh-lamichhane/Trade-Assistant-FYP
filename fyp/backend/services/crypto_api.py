from fastapi import FastAPI
import yfinance as yf
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Allow frontend to access API
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/crypto/{symbol}")
def get_crypto_data(symbol: str):
    try:
        crypto = yf.Ticker(symbol)
        hist = crypto.history(period="1mo")  # Fetch 1-month historical data
        data = hist[['Close']].reset_index().to_dict(orient='records')
        return {"symbol": symbol, "history": data}
    except Exception as e:
        return {"error": str(e)}

# Run using: uvicorn crypto_api:app --reload
