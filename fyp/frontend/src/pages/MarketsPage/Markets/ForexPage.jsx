import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../../components/Navbar/Navbar";
import Footer from "../../../components/Footer/footer";
import Header from "../../../components/header/header";
import ForexChart from "../../../components/Charts/ForexChart";
import "./ForexPage.css";

const ForexPage = () => {
    const [symbol, setSymbol] = useState("OANDA:EURUSD"); // Default Forex pair
    const [indicatorType, setIndicatorType] = useState(null); // Stores the selected indicator type
    const navigate = useNavigate();

    const majorPairs = [
        { label: "EUR/USD", value: "OANDA:EURUSD" },
        { label: "GBP/USD", value: "OANDA:GBPUSD" },
        { label: "USD/JPY", value: "OANDA:USDJPY" },
        { label: "AUD/USD", value: "OANDA:AUDUSD" },
    ];

    const minorPairs = [
        { label: "EUR/GBP", value: "OANDA:EURGBP" },
        { label: "GBP/JPY", value: "OANDA:GBPJPY" },
        { label: "AUD/JPY", value: "OANDA:AUDJPY" },
        { label: "NZD/USD", value: "OANDA:NZDUSD" },
    ];

    return (
        <div className="forex-page">
            <Header />
            <Navbar />
            <h1 className="forex-title-f">The Forex Markets</h1>

            <div className="content-container">
                {/* Display TradingView Chart */}
                <div className="forex-chart-container">
                    <ForexChart symbol={symbol} indicatorType={indicatorType} />
                </div>

                {/* Vertical Section Break */}
                <div className="vertical-divider-f"></div>

                {/* Dropdowns and Watchlist */}
                <div className="dropdown-section">
                    <h2 className="watchlist-heading">Watchlist</h2>
                    <hr className="horizontal-divider" />
                    <div className="dropdown">
                        <label htmlFor="major-pairs">Major Pairs:</label>
                        <select
                            id="major-pairs"
                            onChange={(e) => setSymbol(e.target.value)}
                        >
                            {majorPairs.map((pair) => (
                                <option key={pair.value} value={pair.value}>
                                    {pair.label}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="dropdown">
                        <label htmlFor="minor-pairs">Minor Pairs:</label>
                        <select
                            id="minor-pairs"
                            onChange={(e) => setSymbol(e.target.value)}
                        >
                            {minorPairs.map((pair) => (
                                <option key={pair.value} value={pair.value}>
                                    {pair.label}
                                </option>
                            ))}
                        </select>
                    </div>
                    <hr className="horizontal-divider" />
                    <div className="button-section">
                        <button
                            className="navigate-button"
                            onClick={() => navigate("/cryptopage")}
                        >
                            View Crypto Charts
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

export default ForexPage;
