import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../../components/Navbar/Navbar";
import Footer from "../../../components/Footer/footer";
import Header from "../../../components/header/header";
import CryptoChart from "../../../components/Charts/CryptoChart";
import "./CryptoPage.css";

const CryptoPage = () => {
    const [symbol, setSymbol] = useState("BTC"); // Default cryptocurrency
    const [indicatorType, setIndicatorType] = useState(null); // Stores the selected indicator type
    const [activeButton, setActiveButton] = useState(null); // Tracks which button is active
    const [predictions, setPredictions] = useState({
        "15": null, // 15 minutes
        "60": null, // 1 hour
        "D": null,  // 1 day
        "W": null   // 1 week
    });
    const [timeframe, setTimeframe] = useState("D"); // Default timeframe (D = daily)
    const navigate = useNavigate();

    // Reset chart when symbol changes
    useEffect(() => {
        setIndicatorType(null);
        setActiveButton(null);
        setPredictions({
            "15": null,
            "60": null,
            "D": null,
            "W": null
        });
    }, [symbol]);

    // Generate prediction when indicator type or timeframe changes
    useEffect(() => {
        if (indicatorType) {
            generatePrediction(indicatorType, symbol, timeframe);
        } else {
            setPredictions({
                "15": null,
                "60": null,
                "D": null,
                "W": null
            });
        }
    }, [indicatorType, symbol, timeframe]);

    const cryptocurrencies = [
        { label: "Bitcoin (BTC)", value: "BTC" },
        { label: "Ethereum (ETH)", value: "ETH" },
        { label: "Tether (USDT)", value: "USDT" },
        { label: "Binance Coin (BNB)", value: "BNB" },
        { label: "Dogecoin (DOGE)", value: "DOGE" },
    ];

    const timeframes = [
        { label: "Weekly", value: "W" },
        { label: "Daily", value: "D" },
        { label: "1 Hour", value: "60" },
        { label: "15 Minutes", value: "15" },
    ];

    // Handle indicator button clicks
    const handleIndicatorClick = (type, tf) => {
        // If the same button is clicked again, deactivate it
        if (activeButton === `${type}-${tf}`) {
            setIndicatorType(null);
            setActiveButton(null);
            return;
        }
        
        // If a different button is clicked, update the active button and indicator type
        setIndicatorType(type);
        setActiveButton(`${type}-${tf}`);
        setTimeframe(tf);
        
        // Generate prediction for the new selection
        generatePrediction(type, symbol, tf);
    };

    // Handle timeframe selection
    const handleTimeframeChange = (e) => {
        setTimeframe(e.target.value);
    };

    // Generate prediction based on indicator type, symbol, and timeframe
    const generatePrediction = (type, currentSymbol, currentTimeframe) => {
        // Generate random prediction data (in a real app, this would use actual market data)
        const directions = ["bullish", "bearish", "sideways"];
        const strengths = ["strong", "moderate", "weak"];
        
        const direction = directions[Math.floor(Math.random() * directions.length)];
        const strength = strengths[Math.floor(Math.random() * strengths.length)];
        
        let predictionText = "";
        let reasonText = "";
        
        // Format timeframe for display
        let timeframeDisplay = "";
        switch(currentTimeframe) {
            case "W":
                timeframeDisplay = "weekly";
                break;
            case "D":
                timeframeDisplay = "daily";
                break;
            case "60":
                timeframeDisplay = "1-hour";
                break;
            case "15":
                timeframeDisplay = "15-minute";
                break;
            default:
                timeframeDisplay = "daily";
        }
        
        if (type === "ICT") {
            predictionText = `Based on ICT analysis, ${currentSymbol} is expected to move in a ${strength} ${direction} direction on the ${timeframeDisplay} timeframe.`;
            
            if (direction === "bullish") {
                reasonText = `The RSI is showing oversold conditions (below 30), which often indicates a potential bounce. The MACD has crossed above its signal line, suggesting upward momentum is building. The price is near the lower Bollinger Band, which often acts as support.

ENTRY POINT: Consider buying at the current price or slightly lower if it retests the lower Bollinger Band.
STOP LOSS: Place your stop loss below the recent swing low.
TAKE PROFIT 1: First target at the middle Bollinger Band (20 EMA).
TAKE PROFIT 2: Second target at the upper Bollinger Band.
TAKE PROFIT 3: Final target at the next major resistance level (marked by a pivot high).`;
            } else if (direction === "bearish") {
                reasonText = `The RSI is showing overbought conditions (above 70), which often indicates a potential reversal. The MACD has crossed below its signal line, suggesting downward momentum is building. The price is near the upper Bollinger Band, which often acts as resistance.

ENTRY POINT: Consider selling at the current price or slightly higher if it retests the upper Bollinger Band.
STOP LOSS: Place your stop loss above the recent swing high.
TAKE PROFIT 1: First target at the middle Bollinger Band (20 EMA).
TAKE PROFIT 2: Second target at the lower Bollinger Band.
TAKE PROFIT 3: Final target at the next major support level (marked by a pivot low).`;
            } else {
                reasonText = `The RSI is moving sideways around the 50 level, indicating no clear directional bias. The MACD is flat near the zero line, suggesting a ranging market. The price is moving between the Bollinger Bands without a clear direction.

ENTRY POINT: Wait for a breakout above the upper Bollinger Band (for a long trade) or below the lower Bollinger Band (for a short trade).
STOP LOSS: For a long trade, place your stop loss below the lower Bollinger Band. For a short trade, place your stop loss above the upper Bollinger Band.
TAKE PROFIT: Target the opposite Bollinger Band as your take profit level.

Note: In ranging markets, it's often best to wait for a clear breakout before entering a position.`;
            }
        } else if (type === "SMC") {
            predictionText = `Based on SMC analysis, ${currentSymbol} is expected to move in a ${strength} ${direction} direction on the ${timeframeDisplay} timeframe.`;
            
            if (direction === "bullish") {
                reasonText = `The market structure shows higher highs and higher lows forming, indicating an uptrend. The RSI is showing bullish momentum with higher lows. The MACD is above its signal line, confirming the bullish bias. The price is above the 20 EMA, which is acting as dynamic support.

ENTRY POINT: Consider buying at the current price or on a pullback to the 20 EMA.
STOP LOSS: Place your stop loss below the most recent swing low.
TAKE PROFIT 1: First target at 1:1 risk-reward ratio (distance from entry to stop loss).
TAKE PROFIT 2: Second target at the next major resistance level (marked by a previous swing high).
TAKE PROFIT 3: Final target at the projected extension of the current move (using Fibonacci extensions).`;
            } else if (direction === "bearish") {
                reasonText = `The market structure shows lower highs and lower lows forming, indicating a downtrend. The RSI is showing bearish momentum with lower highs. The MACD is below its signal line, confirming the bearish bias. The price is below the 20 EMA, which is acting as dynamic resistance.

ENTRY POINT: Consider selling at the current price or on a bounce to the 20 EMA.
STOP LOSS: Place your stop loss above the most recent swing high.
TAKE PROFIT 1: First target at 1:1 risk-reward ratio (distance from entry to stop loss).
TAKE PROFIT 2: Second target at the next major support level (marked by a previous swing low).
TAKE PROFIT 3: Final target at the projected extension of the current move (using Fibonacci extensions).`;
            } else {
                reasonText = `The market structure shows no clear direction with price moving sideways. The RSI is moving horizontally around the 50 level. The MACD is oscillating around the zero line. The price is moving around the 20 EMA without a clear trend.

ENTRY POINT: Wait for a clear breakout above the recent swing high (for a long trade) or below the recent swing low (for a short trade).
STOP LOSS: For a long trade, place your stop loss below the recent swing low. For a short trade, place your stop loss above the recent swing high.
TAKE PROFIT: Target the next major support/resistance level based on previous price action.

Note: In ranging markets, it's often best to wait for a clear breakout before entering a position.`;
            }
        }
        
        // Update only the prediction for the specific timeframe
        setPredictions(prev => ({
            ...prev,
            [currentTimeframe]: {
                text: predictionText,
                reason: reasonText
            }
        }));
    };

    return (
        <div className="crypto-page">
            <Header />
            <Navbar />
            <h1 className="crypto-title-c">The Crypto Markets</h1>

            <div className="content-container">
                {/* Display TradingView Chart */}
                <div className="crypto-chart-container">
                    <CryptoChart symbol={symbol} indicatorType={indicatorType} timeframe={timeframe} />
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
                    <div className="dropdown">
                        <label htmlFor="timeframe-select">Timeframe:</label>
                        <select
                            id="timeframe-select"
                            value={timeframe}
                            onChange={handleTimeframeChange}
                        >
                            {timeframes.map((tf) => (
                                <option key={tf.value} value={tf.value}>
                                    {tf.label}
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
                <div className="predictions-container">
                    {/* 15 Minutes Predictions */}
                    <div className="timeframe-prediction-section">
                        <h3 className="timeframe-heading">15 Minutes Predictions</h3>
                        <div className="indicator-buttons">
                            <button
                                className={`apply-button ${activeButton === "ICT-15" ? "active" : ""}`}
                                onClick={() => handleIndicatorClick("ICT", "15")}
                            >
                                Apply ICT
                            </button>
                            <button
                                className={`apply-button ${activeButton === "SMC-15" ? "active" : ""}`}
                                onClick={() => handleIndicatorClick("SMC", "15")}
                            >
                                Apply SMC
                            </button>
                        </div>
                        
                        {/* Prediction Display Section */}
                        {predictions["15"] && (
                            <div className="prediction-display">
                                <div className="prediction-text">
                                    <h3>Market Analysis</h3>
                                    <p>{predictions["15"].text}</p>
                                </div>
                                <div className="prediction-reason">
                                    <h3>Trading Strategy</h3>
                                    <div className="analysis-section">
                                        <div className="section-title">Market Conditions</div>
                                        <p>{predictions["15"].reason.split('ENTRY POINT:')[0]}</p>
                                    </div>
                                    
                                    <div className="analysis-section">
                                        <div className="entry-point">
                                            <div className="section-title">Entry Point</div>
                                            <p>{predictions["15"].reason.split('ENTRY POINT:')[1].split('STOP LOSS:')[0]}</p>
                                        </div>
                                        
                                        <div className="stop-loss">
                                            <div className="section-title">Stop Loss</div>
                                            <p>{predictions["15"].reason.split('STOP LOSS:')[1].split('TAKE PROFIT')[0]}</p>
                                        </div>
                                        
                                        <div className="take-profit">
                                            <div className="section-title">Take Profit</div>
                                            <p>{predictions["15"].reason.split('TAKE PROFIT')[1].split('Note:')[0]}</p>
                                        </div>
                                        
                                        {predictions["15"].reason.includes('Note:') && (
                                            <div className="market-note">
                                                <p>{predictions["15"].reason.split('Note:')[1]}</p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                    
                    {/* 1 Hour Predictions */}
                    <div className="timeframe-prediction-section">
                        <h3 className="timeframe-heading">1 Hour Predictions</h3>
                        <div className="indicator-buttons">
                            <button
                                className={`apply-button ${activeButton === "ICT-60" ? "active" : ""}`}
                                onClick={() => handleIndicatorClick("ICT", "60")}
                            >
                                Apply ICT
                            </button>
                            <button
                                className={`apply-button ${activeButton === "SMC-60" ? "active" : ""}`}
                                onClick={() => handleIndicatorClick("SMC", "60")}
                            >
                                Apply SMC
                            </button>
                        </div>
                        
                        {/* Prediction Display Section */}
                        {predictions["60"] && (
                            <div className="prediction-display">
                                <div className="prediction-text">
                                    <h3>Market Analysis</h3>
                                    <p>{predictions["60"].text}</p>
                                </div>
                                <div className="prediction-reason">
                                    <h3>Trading Strategy</h3>
                                    <div className="analysis-section">
                                        <div className="section-title">Market Conditions</div>
                                        <p>{predictions["60"].reason.split('ENTRY POINT:')[0]}</p>
                                    </div>
                                    
                                    <div className="analysis-section">
                                        <div className="entry-point">
                                            <div className="section-title">Entry Point</div>
                                            <p>{predictions["60"].reason.split('ENTRY POINT:')[1].split('STOP LOSS:')[0]}</p>
                                        </div>
                                        
                                        <div className="stop-loss">
                                            <div className="section-title">Stop Loss</div>
                                            <p>{predictions["60"].reason.split('STOP LOSS:')[1].split('TAKE PROFIT')[0]}</p>
                                        </div>
                                        
                                        <div className="take-profit">
                                            <div className="section-title">Take Profit</div>
                                            <p>{predictions["60"].reason.split('TAKE PROFIT')[1].split('Note:')[0]}</p>
                                        </div>
                                        
                                        {predictions["60"].reason.includes('Note:') && (
                                            <div className="market-note">
                                                <p>{predictions["60"].reason.split('Note:')[1]}</p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                    
                    {/* Daily Predictions */}
                    <div className="timeframe-prediction-section">
                        <h3 className="timeframe-heading">Daily Predictions</h3>
                        <div className="indicator-buttons">
                            <button
                                className={`apply-button ${activeButton === "ICT-D" ? "active" : ""}`}
                                onClick={() => handleIndicatorClick("ICT", "D")}
                            >
                                Apply ICT
                            </button>
                            <button
                                className={`apply-button ${activeButton === "SMC-D" ? "active" : ""}`}
                                onClick={() => handleIndicatorClick("SMC", "D")}
                            >
                                Apply SMC
                            </button>
                        </div>
                        
                        {/* Prediction Display Section */}
                        {predictions["D"] && (
                            <div className="prediction-display">
                                <div className="prediction-text">
                                    <h3>Market Analysis</h3>
                                    <p>{predictions["D"].text}</p>
                                </div>
                                <div className="prediction-reason">
                                    <h3>Trading Strategy</h3>
                                    <div className="analysis-section">
                                        <div className="section-title">Market Conditions</div>
                                        <p>{predictions["D"].reason.split('ENTRY POINT:')[0]}</p>
                                    </div>
                                    
                                    <div className="analysis-section">
                                        <div className="entry-point">
                                            <div className="section-title">Entry Point</div>
                                            <p>{predictions["D"].reason.split('ENTRY POINT:')[1].split('STOP LOSS:')[0]}</p>
                                        </div>
                                        
                                        <div className="stop-loss">
                                            <div className="section-title">Stop Loss</div>
                                            <p>{predictions["D"].reason.split('STOP LOSS:')[1].split('TAKE PROFIT')[0]}</p>
                                        </div>
                                        
                                        <div className="take-profit">
                                            <div className="section-title">Take Profit</div>
                                            <p>{predictions["D"].reason.split('TAKE PROFIT')[1].split('Note:')[0]}</p>
                                        </div>
                                        
                                        {predictions["D"].reason.includes('Note:') && (
                                            <div className="market-note">
                                                <p>{predictions["D"].reason.split('Note:')[1]}</p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                    
                    {/* Weekly Predictions */}
                    <div className="timeframe-prediction-section">
                        <h3 className="timeframe-heading">Weekly Predictions</h3>
                        <div className="indicator-buttons">
                            <button
                                className={`apply-button ${activeButton === "ICT-W" ? "active" : ""}`}
                                onClick={() => handleIndicatorClick("ICT", "W")}
                            >
                                Apply ICT
                            </button>
                            <button
                                className={`apply-button ${activeButton === "SMC-W" ? "active" : ""}`}
                                onClick={() => handleIndicatorClick("SMC", "W")}
                            >
                                Apply SMC
                            </button>
                        </div>
                        
                        {/* Prediction Display Section */}
                        {predictions["W"] && (
                            <div className="prediction-display">
                                <div className="prediction-text">
                                    <h3>Market Analysis</h3>
                                    <p>{predictions["W"].text}</p>
                                </div>
                                <div className="prediction-reason">
                                    <h3>Trading Strategy</h3>
                                    <div className="analysis-section">
                                        <div className="section-title">Market Conditions</div>
                                        <p>{predictions["W"].reason.split('ENTRY POINT:')[0]}</p>
                                    </div>
                                    
                                    <div className="analysis-section">
                                        <div className="entry-point">
                                            <div className="section-title">Entry Point</div>
                                            <p>{predictions["W"].reason.split('ENTRY POINT:')[1].split('STOP LOSS:')[0]}</p>
                                        </div>
                                        
                                        <div className="stop-loss">
                                            <div className="section-title">Stop Loss</div>
                                            <p>{predictions["W"].reason.split('STOP LOSS:')[1].split('TAKE PROFIT')[0]}</p>
                                        </div>
                                        
                                        <div className="take-profit">
                                            <div className="section-title">Take Profit</div>
                                            <p>{predictions["W"].reason.split('TAKE PROFIT')[1].split('Note:')[0]}</p>
                                        </div>
                                        
                                        {predictions["W"].reason.includes('Note:') && (
                                            <div className="market-note">
                                                <p>{predictions["W"].reason.split('Note:')[1]}</p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <hr className="section-divider" />
            <Footer />
        </div>
    );
};

export default CryptoPage;
