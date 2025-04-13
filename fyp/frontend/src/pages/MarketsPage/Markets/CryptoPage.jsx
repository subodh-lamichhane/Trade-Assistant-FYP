import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../../components/Navbar/Navbar";
import Footer from "../../../components/Footer/footer";
import Header from "../../../components/header/header";
import CryptoChart from "../../../components/Charts/CryptoChart";
import "./CryptoPage.css";

const CryptoPage = () => {
    const [symbol, setSymbol] = useState("BTC"); // Default cryptocurrency
    const [indicatorType, setIndicatorType] = useState(null); // Stores the selected indicator type
    const navigate = useNavigate();

    const cryptocurrencies = [
        { label: "Bitcoin (BTC)", value: "BTC" },
        { label: "Ethereum (ETH)", value: "ETH" },
        { label: "Tether (USDT)", value: "USDT" },
        { label: "Binance Coin (BNB)", value: "BNB" },
        { label: "Dogecoin (DOGE)", value: "DOGE" },
    ];

    return (
        <div className="crypto-page">
            <Header />
            <Navbar />
            <h1 className="crypto-title-c">The Crypto Markets</h1>

            <div className="content-container">
                {/* Display TradingView Chart */}
                <div className="crypto-chart-container">
                    <CryptoChart symbol={symbol} indicatorType={indicatorType} />
                </div>

                {/* Vertical Section Break */}
                <div className="vertical-divider-c"></div>

                {/* Dropdowns and Watchlist */}
                <div className="dropdown-section">
                    <h2 className="watchlist-heading">Watchlist</h2>
                    <hr className="horizontal-divider" />
                    <div className="dropdown">
                        <label htmlFor="crypto-dropdown">Cryptocurrencies:</label>
                        <select
                            id="crypto-dropdown"
                            onChange={(e) => setSymbol(e.target.value)}
                        >
                            {cryptocurrencies.map((crypto) => (
                                <option key={crypto.value} value={crypto.value}>
                                    {crypto.label}
                                </option>
                            ))}
                        </select>
                    </div>
                    <hr className="horizontal-divider" />
                    <div className="button-section">
                        <button
                            className="navigate-button"
                            onClick={() => navigate("/forexpage")}
                        >
                            View Forex Charts
                        </button>
                        <button
                            className="navigate-button"
                            onClick={() => navigate("/nepsepage")}
                        >
                            View NEPSE Charts
                        </button>
                    </div>
                    <hr className="horizontal-divider" />
                </div>
            </div>

            {/* View Predictions Section */}
            <div className="predictions-section">
                <h2 className="predictions-heading">View Predictions</h2>
                <div className="indicator-buttons">
                    <button
                        className="apply-button"
                        onClick={() => setIndicatorType("ICT")}
                    >
                        Apply ICT
                    </button>
                    <button
                        className="apply-button"
                        onClick={() => setIndicatorType("SMC")}
                    >
                        Apply SMC
                    </button>
                </div>
            </div>

            <hr className="section-divider" />
            <Footer />
        </div>
    );
};

export default CryptoPage;
