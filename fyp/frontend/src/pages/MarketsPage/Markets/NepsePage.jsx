import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../../components/Navbar/Navbar";
import Footer from "../../../components/Footer/footer";
import Header from "../../../components/header/header";
import "./NepsePage.css";

const NepsePage = () => {
    const [symbol, setSymbol] = useState("NEPSE"); // Default NEPSE market
    const navigate = useNavigate();

    const nepseIndices = [
        { label: "NEPSE Index", value: "NEPSE" },
        { label: "Sensitive Index", value: "SENSITIVE" },
        { label: "Float Index", value: "FLOAT" },
        { label: "Sensitive Float Index", value: "SENSITIVE_FLOAT" },
    ];

    const getChartUrl = (symbol) => {
        switch (symbol) {
            case "NEPSE":
                return "https://chukul.com/nepse-charts#nepse-index";
            case "SENSITIVE":
                return "https://chukul.com/nepse-charts#sensitive-index";
            case "FLOAT":
                return "https://chukul.com/nepse-charts#float-index";
            case "SENSITIVE_FLOAT":
                return "https://chukul.com/nepse-charts#sensitive-float-index";
            default:
                return "https://chukul.com/nepse-charts";
        }
    };

    return (
        <div className="nepse-page">
            <Header />
            <Navbar />
            <h1 className="nepse-title-n">The NEPSE Markets</h1>

            <div className="content-container">
                {/* Display NEPSE Chart */}
                <div className="nepse-chart-container">
                    <iframe
                        src={getChartUrl(symbol)}
                        title="NEPSE Chart"
                        className="nepse-iframe"
                        frameBorder="0"
                    ></iframe>
                </div>

                {/* Vertical Section Break */}
                <div className="vertical-divider-n"></div>

                {/* Dropdowns and Buttons */}
                <div className="dropdown-section">
                    <h2 className="watchlist-heading">Watchlist</h2>
                    <hr className="horizontal-divider" />
                    <div className="dropdown">
                        <label htmlFor="nepse-dropdown">NEPSE Indices:</label>
                        <select
                            id="nepse-dropdown"
                            onChange={(e) => setSymbol(e.target.value)}
                        >
                            {nepseIndices.map((index) => (
                                <option key={index.value} value={index.value}>
                                    {index.label}
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
                            onClick={() => navigate("/cryptopage")}
                        >
                            View Crypto Charts
                        </button>
                    </div>
                    <hr className="horizontal-divider" />
                </div>
            </div>
            <hr className="section-divider" />
            <Footer />
        </div>
    );
};

export default NepsePage;
