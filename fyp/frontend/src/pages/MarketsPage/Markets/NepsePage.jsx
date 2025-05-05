import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../../components/Navbar/Navbar";
import Footer from "../../../components/Footer/footer";
import Header from "../../../components/header/header";
import NepseChart from "../../../components/Charts/NepseChart";
import "./NepsePage.css";

const NepsePage = () => {
    const [symbol, setSymbol] = useState("NEPSE"); // Default NEPSE market
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

    const nepseIndices = [
        { label: "NEPSE Index", value: "NEPSE" },
        { label: "Sensitive Index", value: "SENSITIVE" },
        { label: "Float Index", value: "FLOAT" },
        { label: "Banking Index", value: "BANKING" },
        { label: "Hotels & Tourism", value: "HOTELS" },
        { label: "Hydropower Index", value: "HYDRO" },
        { label: "Development Bank Index", value: "DEVBANK" },
        { label: "Finance Index", value: "FINANCE" },
        { label: "Insurance Index", value: "INSURANCE" },
        { label: "Manufacturing Index", value: "MANUFACTURING" },
        { label: "Microfinance Index", value: "MICROFINANCE" },
        { label: "Trading Index", value: "TRADING" }
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
        const newTimeframe = e.target.value;
        setTimeframe(newTimeframe);
        
        // If there's an active indicator, update its prediction
        if (indicatorType) {
            generatePrediction(indicatorType, symbol, newTimeframe);
        }
    };

    // Handle symbol selection
    const handleSymbolChange = (e) => {
        const newSymbol = e.target.value;
        setSymbol(newSymbol);
        
        // If there's an active indicator, update its prediction
        if (indicatorType) {
            generatePrediction(indicatorType, newSymbol, timeframe);
        }
    };

    // Generate prediction based on indicator type, symbol, and timeframe
    const generatePrediction = (type, currentSymbol, currentTimeframe) => {
        // Fetch the latest data to analyze
        fetch(`http://localhost:8081/api/nepse/index/${currentSymbol.toLowerCase()}?timeframe=${currentTimeframe}`)
            .then(response => response.json())
            .then(data => {
                if (!data || !Array.isArray(data) || data.length < 20) {
                    setPredictions(prev => ({
                        ...prev,
                        [currentTimeframe]: {
                            text: "Insufficient data for analysis",
                            reason: "Please try a different timeframe or symbol."
                        }
                    }));
                    return;
                }

                // Get the last 20 candles for analysis
                const recentData = data.slice(-20);
                const latestCandle = recentData[recentData.length - 1];
                const previousCandle = recentData[recentData.length - 2];

                // Calculate basic market data
                const latestPrice = parseFloat(latestCandle.close);
                const previousPrice = parseFloat(previousCandle.close);
                const priceChange = latestPrice - previousPrice;
                const priceChangePercent = (priceChange / previousPrice) * 100;

                // Format timeframe for display
                let timeframeDisplay = "";
                switch(currentTimeframe) {
                    case "W": timeframeDisplay = "weekly"; break;
                    case "D": timeframeDisplay = "daily"; break;
                    case "60": timeframeDisplay = "1-hour"; break;
                    case "15": timeframeDisplay = "15-minute"; break;
                    default: timeframeDisplay = "daily";
                }

                let predictionText = "";
                let reasonText = "";

                if (type === "ICT") {
                    // Calculate Bollinger Bands
                    const period = 20;
                    const stdDevMultiplier = 2;
                    
                    // Calculate SMA (Middle Band)
                    const sma = recentData.reduce((acc, curr) => acc + parseFloat(curr.close), 0) / period;
                    
                    // Calculate Standard Deviation
                    const squaredDiffs = recentData.map(candle => 
                        Math.pow(parseFloat(candle.close) - sma, 2)
                    );
                    const avgSquaredDiff = squaredDiffs.reduce((acc, curr) => acc + curr, 0) / period;
                    const stdDev = Math.sqrt(avgSquaredDiff);
                    
                    // Calculate Bands
                    const upperBand = sma + (stdDev * stdDevMultiplier);
                    const lowerBand = sma - (stdDev * stdDevMultiplier);

                    // Analyze market structure using Bollinger Bands
                    const bandWidth = ((upperBand - lowerBand) / sma) * 100; // Bollinger Band Width as percentage
                    const pricePosition = ((latestPrice - lowerBand) / (upperBand - lowerBand)) * 100; // Price position within bands

                    // Identify market condition
                    let marketCondition;
                    if (bandWidth > 5) { // High volatility
                        if (pricePosition > 80) {
                            marketCondition = "overbought";
                        } else if (pricePosition < 20) {
                            marketCondition = "oversold";
                        } else {
                            marketCondition = "volatile";
                        }
                    } else { // Low volatility
                        if (pricePosition > 95) {
                            marketCondition = "extremely_overbought";
                        } else if (pricePosition < 5) {
                            marketCondition = "extremely_oversold";
                        } else {
                            marketCondition = "ranging";
                        }
                    }

                    // Generate prediction based on market condition
                    switch(marketCondition) {
                        case "overbought":
                            predictionText = `Based on ICT analysis, ${currentSymbol} is showing overbought conditions with high volatility on the ${timeframeDisplay} timeframe.`;
                            reasonText = `The price is testing the upper Bollinger Band with increased volatility (Band Width: ${bandWidth.toFixed(2)}%). The price has increased by ${priceChangePercent.toFixed(2)}% in the last period.

ENTRY POINT: Look for bearish reversal patterns near the upper band for potential short entries.
STOP LOSS: Place stops above recent swing high or 1% above the upper band.
TAKE PROFIT 1: Target the middle band (${sma.toFixed(2)}).
TAKE PROFIT 2: Target the lower band (${lowerBand.toFixed(2)}).
TAKE PROFIT 3: Target previous support levels below the lower band.`;
                            break;

                        case "oversold":
                            predictionText = `Based on ICT analysis, ${currentSymbol} is showing oversold conditions with high volatility on the ${timeframeDisplay} timeframe.`;
                            reasonText = `The price is testing the lower Bollinger Band with increased volatility (Band Width: ${bandWidth.toFixed(2)}%). The price has decreased by ${Math.abs(priceChangePercent).toFixed(2)}% in the last period.

ENTRY POINT: Look for bullish reversal patterns near the lower band for potential long entries.
STOP LOSS: Place stops below recent swing low or 1% below the lower band.
TAKE PROFIT 1: Target the middle band (${sma.toFixed(2)}).
TAKE PROFIT 2: Target the upper band (${upperBand.toFixed(2)}).
TAKE PROFIT 3: Target previous resistance levels above the upper band.`;
                            break;

                        case "volatile":
                            predictionText = `Based on ICT analysis, ${currentSymbol} is showing high volatility with neutral positioning on the ${timeframeDisplay} timeframe.`;
                            reasonText = `The market is experiencing high volatility (Band Width: ${bandWidth.toFixed(2)}%) with price in the middle of the bands. The price has changed by ${priceChangePercent.toFixed(2)}% in the last period.

ENTRY POINT: Wait for price to test either band before entering positions.
STOP LOSS: For longs, below the lower band. For shorts, above the upper band.
TAKE PROFIT: Use scaled targets at key support/resistance levels.

Note: High volatility suggests using wider stops and taking partial profits early.`;
                            break;

                        case "extremely_overbought":
                            predictionText = `Based on ICT analysis, ${currentSymbol} is showing extreme overbought conditions with low volatility on the ${timeframeDisplay} timeframe.`;
                            reasonText = `The price is significantly above the upper Bollinger Band with compressed volatility (Band Width: ${bandWidth.toFixed(2)}%). The price has increased by ${priceChangePercent.toFixed(2)}% in the last period.

ENTRY POINT: High-probability short setup forming. Wait for a bearish reversal candle.
STOP LOSS: Tight stop above the recent high.
TAKE PROFIT 1: Target the upper band (${upperBand.toFixed(2)}).
TAKE PROFIT 2: Target the middle band (${sma.toFixed(2)}).
TAKE PROFIT 3: Target the lower band (${lowerBand.toFixed(2)}).

Note: Low volatility often precedes strong moves. Prepare for potential volatility expansion.`;
                            break;

                        case "extremely_oversold":
                            predictionText = `Based on ICT analysis, ${currentSymbol} is showing extreme oversold conditions with low volatility on the ${timeframeDisplay} timeframe.`;
                            reasonText = `The price is significantly below the lower Bollinger Band with compressed volatility (Band Width: ${bandWidth.toFixed(2)}%). The price has decreased by ${Math.abs(priceChangePercent).toFixed(2)}% in the last period.

ENTRY POINT: High-probability long setup forming. Wait for a bullish reversal candle.
STOP LOSS: Tight stop below the recent low.
TAKE PROFIT 1: Target the lower band (${lowerBand.toFixed(2)}).
TAKE PROFIT 2: Target the middle band (${sma.toFixed(2)}).
TAKE PROFIT 3: Target the upper band (${upperBand.toFixed(2)}).

Note: Low volatility often precedes strong moves. Prepare for potential volatility expansion.`;
                            break;

                        case "ranging":
                            predictionText = `Based on ICT analysis, ${currentSymbol} is showing ranging conditions with low volatility on the ${timeframeDisplay} timeframe.`;
                            reasonText = `The market is in a low volatility state (Band Width: ${bandWidth.toFixed(2)}%) with price contained within the bands. The price has changed by ${priceChangePercent.toFixed(2)}% in the last period.

ENTRY POINT: Trade reversals at band touches with confirmation.
STOP LOSS: Beyond the opposite band.
TAKE PROFIT: Target the middle band for quick trades.

Note: Expect a volatility expansion soon. Watch for band squeeze setups.`;
                            break;
                    }

                } else if (type === "SMC") {
                    // Calculate 20 SMA
                    const sma20 = recentData.reduce((acc, curr) => acc + parseFloat(curr.close), 0) / 20;
                    
                    // Calculate price momentum
                    const momentum = recentData.slice(-5).reduce((acc, curr, idx, arr) => {
                        if (idx === 0) return 0;
                        return acc + (parseFloat(curr.close) - parseFloat(arr[idx-1].close));
                    }, 0);

                    // Analyze candlestick patterns
                    const latestCandleSize = Math.abs(parseFloat(latestCandle.close) - parseFloat(latestCandle.open));
                    const latestCandleBullish = parseFloat(latestCandle.close) > parseFloat(latestCandle.open);
                    const previousCandleBullish = parseFloat(previousCandle.close) > parseFloat(previousCandle.open);

                    // Determine market structure
                    const aboveSMA = latestPrice > sma20;
                    const strongMomentum = Math.abs(momentum) > latestPrice * 0.02; // 2% threshold
                    const largeCandle = latestCandleSize > (latestPrice * 0.01); // 1% threshold

                    let marketStructure;
                    if (aboveSMA && strongMomentum && momentum > 0) {
                        marketStructure = "strong_uptrend";
                    } else if (!aboveSMA && strongMomentum && momentum < 0) {
                        marketStructure = "strong_downtrend";
                    } else if (aboveSMA && !strongMomentum) {
                        marketStructure = "weak_uptrend";
                    } else if (!aboveSMA && !strongMomentum) {
                        marketStructure = "weak_downtrend";
                    }

                    // Generate prediction based on market structure
                    switch(marketStructure) {
                        case "strong_uptrend":
                            predictionText = `Based on SMC analysis, ${currentSymbol} is showing a strong uptrend on the ${timeframeDisplay} timeframe.`;
                            reasonText = `Price is above the 20 SMA (${sma20.toFixed(2)}) with strong bullish momentum. ${latestCandleBullish ? 'The latest candle is bullish' : 'Despite the latest bearish candle'}, overall momentum remains positive.

ENTRY POINT: Look for pullbacks to the 20 SMA for long entries.
STOP LOSS: Below the most recent significant swing low.
TAKE PROFIT 1: Project the recent swing move (1:1 risk-reward).
TAKE PROFIT 2: Next psychological resistance level.
TAKE PROFIT 3: Previous market structure high.`;
                            break;

                        case "strong_downtrend":
                            predictionText = `Based on SMC analysis, ${currentSymbol} is showing a strong downtrend on the ${timeframeDisplay} timeframe.`;
                            reasonText = `Price is below the 20 SMA (${sma20.toFixed(2)}) with strong bearish momentum. ${!latestCandleBullish ? 'The latest candle is bearish' : 'Despite the latest bullish candle'}, overall momentum remains negative.

ENTRY POINT: Look for rallies to the 20 SMA for short entries.
STOP LOSS: Above the most recent significant swing high.
TAKE PROFIT 1: Project the recent swing move (1:1 risk-reward).
TAKE PROFIT 2: Next psychological support level.
TAKE PROFIT 3: Previous market structure low.`;
                            break;

                        case "weak_uptrend":
                            predictionText = `Based on SMC analysis, ${currentSymbol} is showing a weak uptrend on the ${timeframeDisplay} timeframe.`;
                            reasonText = `Price is above the 20 SMA (${sma20.toFixed(2)}) but momentum is weakening. The market may be transitioning to a ranging phase.

ENTRY POINT: Wait for momentum confirmation before entering longs.
STOP LOSS: Tight stops below minor swing lows.
TAKE PROFIT: Use scaled exits at previous resistance levels.

Note: Reduced position size recommended due to weak trend conditions.`;
                            break;

                        case "weak_downtrend":
                            predictionText = `Based on SMC analysis, ${currentSymbol} is showing a weak downtrend on the ${timeframeDisplay} timeframe.`;
                            reasonText = `Price is below the 20 SMA (${sma20.toFixed(2)}) but momentum is weakening. The market may be transitioning to a ranging phase.

ENTRY POINT: Wait for momentum confirmation before entering shorts.
STOP LOSS: Tight stops above minor swing highs.
TAKE PROFIT: Use scaled exits at previous support levels.

Note: Reduced position size recommended due to weak trend conditions.`;
                            break;
                    }
                }

                // Update predictions
                setPredictions(prev => ({
                    ...prev,
                    [currentTimeframe]: {
                        text: predictionText,
                        reason: reasonText
                    }
                }));
            })
            .catch(error => {
                console.error('Error generating prediction:', error);
                setPredictions(prev => ({
                    ...prev,
                    [currentTimeframe]: {
                        text: "Error generating prediction",
                        reason: "Please try again later."
                    }
                }));
            });
    };

    return (
        <div className="nepse-page">
            <Header />
            <Navbar />
            <h1 className="nepse-title-n">The NEPSE Markets</h1>

            <div className="content-container">
                {/* Display NEPSE Chart */}
                <div className="nepse-chart-container">
                    <NepseChart symbol={symbol} indicatorType={indicatorType} timeframe={timeframe} />
                </div>

                {/* Vertical Section Break */}
                <div className="vertical-divider-n"></div>

                {/* Dropdowns and Watchlist */}
                <div className="dropdown-section">
                    <h2 className="watchlist-heading">Watchlist</h2>
                    <hr className="horizontal-divider" />
                    <div className="dropdown">
                        <label htmlFor="nepse-dropdown">NEPSE Indices:</label>
                        <select
                            id="nepse-dropdown"
                            value={symbol}
                            onChange={handleSymbolChange}
                        >
                            {nepseIndices.map((index) => (
                                <option key={index.value} value={index.value}>
                                    {index.label}
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
                            onClick={() => navigate("/cryptopage")}
                        >
                            View Crypto Charts
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

export default NepsePage;
