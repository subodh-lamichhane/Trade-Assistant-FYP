import React, { useState } from "react";
import Navbar from "../../../components/Navbar/Navbar";
import Footer from "../../../components/Footer/footer";
import Header from "../../../components/header/header";
import CryptoChart from "../../../components/Charts/CryptoChart";

const CryptoPage = () => {
    const [symbol, setSymbol] = useState("BINANCE:BTCUSDT"); // Default Crypto pair

    return (
        <div className="markets-page">

            <Header />
            <Navbar />
            <h1>The Crypto Markets</h1>

            {/* Dropdown to Select Cryptocurrency */}
            <select onChange={(e) => setSymbol(e.target.value)}>
                <option value="BINANCE:BTCUSDT">Bitcoin (BTC/USDT)</option>
                <option value="BINANCE:ETHUSDT">Ethereum (ETH/USDT)</option>
                <option value="BINANCE:BNBUSDT">Binance Coin (BNB/USDT)</option>
                <option value="BINANCE:XRPUSDT">XRP (XRP/USDT)</option>
            </select>

            {/* Display TradingView Chart */}
            <CryptoChart symbol={symbol} />

            {/* Horizontal Line */}
            <hr className="section-divider" />

            <Footer />
        </div>
    );
};

export default CryptoPage;
