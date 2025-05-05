import React, { useEffect, useRef } from "react";

const ForexChart = ({ symbol, indicatorType, timeframe = "D" }) => {
    const chartContainerRef = useRef(null);
    
    useEffect(() => {
        // Create a new TradingView widget when symbol or indicatorType changes
        const script = document.createElement("script");
        script.src = "https://s3.tradingview.com/tv.js";
        script.async = true;
        script.onload = () => {
            if (window.TradingView) {
                // Format the timeframe for TradingView
                let formattedTimeframe = timeframe;
                
                // TradingView uses different format for timeframes
                if (timeframe === "W") {
                    formattedTimeframe = "1W"; // Weekly
                } else if (timeframe === "D") {
                    formattedTimeframe = "1D"; // Daily
                } else if (timeframe === "15") {
                    formattedTimeframe = "15"; // 15 minutes
                }
                
                console.log(`Setting chart timeframe to: ${formattedTimeframe}`);
                
                new window.TradingView.widget({
                    container_id: chartContainerRef.current.id,
                    symbol: symbol,
                    interval: formattedTimeframe,
                    timezone: "exchange",
                    theme: "dark",
                    style: "1",
                    locale: "en",
                    toolbar_bg: "#f1f3f6",
                    enable_publishing: false,
                    allow_symbol_change: true,
                    save_image: false,
                    studies: getStudies(indicatorType),
                    height: 600,
                    width: "100%",
                    // Add these options to help with CORS issues
                    hide_side_toolbar: false,
                    hide_legend: false,
                    // Use a different approach for loading resources
                    loading_screen: { backgroundColor: "#131722" },
                    // Disable some features that might cause CORS issues
                    disabled_features: ["header_symbol_search", "header_settings", "header_compare", "header_undo_redo", "header_screenshot", "header_fullscreen_button"],
                    // Enable features that are useful
                    enabled_features: ["study_templates", "use_localstorage_for_settings"],
                });
            }
        };
        
        // Clean up previous script
        const existingScript = document.querySelector(`script[src="${script.src}"]`);
        if (existingScript) {
            existingScript.remove();
        }
        
        // Add the new script
        document.head.appendChild(script);
        
        return () => {
            // Clean up on unmount
            if (script.parentNode) {
                script.parentNode.removeChild(script);
            }
        };
    }, [symbol, indicatorType, timeframe]);
    
    // Function to get the appropriate studies based on indicator type
    const getStudies = (type) => {
        if (type === "ICT") {
            return [
                // ICT-specific indicators
                "RSI@tv-basicstudies",
                "MACD@tv-basicstudies",
                "BB@tv-basicstudies",
                "EMA@tv-basicstudies",
                "PivotPointsHighLow@tv-basicstudies",
                "IchimokuCloud@tv-basicstudies",
                "VWAP@tv-basicstudies",
                "AwesomeOscillator@tv-basicstudies",
                "ADX@tv-basicstudies",
                "WilliamsR@tv-basicstudies",
                "ATR@tv-basicstudies"
            ];
        } else if (type === "SMC") {
            return [
                // SMC-specific indicators
                "StochasticRSI@tv-basicstudies",
                "Supertrend@tv-basicstudies",
                "ChaikinMoneyFlow@tv-basicstudies",
                "OBV@tv-basicstudies",
                "ParabolicSAR@tv-basicstudies",
                "FibonacciRetracement@tv-basicstudies",
                "FibonacciFan@tv-basicstudies",
                "FibonacciTimeZones@tv-basicstudies",
                "PivotPointsStandard@tv-basicstudies",
                "VolumeProfile@tv-basicstudies",
                "MarketStructure@tv-basicstudies"
            ];
        }
        return [];
    };

    return (
        <div className="forex-chart-container">
            <div 
                id={`forex-chart-${symbol.replace(/[^a-zA-Z0-9]/g, '')}`} 
                ref={chartContainerRef}
                style={{ height: "600px", width: "100%" }}
            ></div>
        </div>
    );
};

export default ForexChart;
