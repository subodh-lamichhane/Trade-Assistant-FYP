import React, { useState } from "react";
import Navbar from "../../../components/Navbar/Navbar";
import Footer from "../../../components/Footer/footer";
import Header from "../../../components/header/header";
import ForexChart from "../../../components/Charts/ForexChart";

const ForexPage = () => {
    const [symbol, setSymbol] = useState("OANDA:EURUSD"); // Default Forex pair

    return (
        <div className="markets-page">
            <Header />
            <Navbar />
            <h1>The Forex Markets</h1>

            {/* Dropdown to Select Currency Pair */}
            <select onChange={(e) => setSymbol(e.target.value)}>
                <option value="OANDA:EURUSD">EUR/USD</option>
                <option value="OANDA:GBPUSD">GBP/USD</option>
                <option value="OANDA:USDJPY">USD/JPY</option>
                <option value="OANDA:AUDUSD">AUD/USD</option>
            </select>

            {/* Display TradingView Chart */}
            <ForexChart symbol={symbol} />

            {/* Horizontal Line */}
            <hr className="section-divider" />

            <Footer />
        </div>
    );
};

export default ForexPage;
