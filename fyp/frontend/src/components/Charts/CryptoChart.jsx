import React from "react";

const CryptoChart = ({ symbol, indicatorType }) => {
    // Function to get the appropriate TradingView URL based on indicator type
    const getChartURL = () => {
        let baseURL = `https://www.tradingview.com/embed-widget/advanced-chart/?symbol=${symbol}&theme=dark`;

        if (indicatorType === "ICT") {
            baseURL += "&studies=Fair%20Value%20Gaps,Order%20Blocks,Liquidity%20Zones"; // ICT indicators
        } else if (indicatorType === "SMC") {
            baseURL += "&studies=SMC%20by%20LuxAlgo"; // SMC by LuxAlgo indicator
        }

        return baseURL;
    };

    return (
        <div className="crypto-chart-container">
            <iframe
                src={getChartURL()}
                title={`Crypto Chart - ${symbol}`} // Unique title for accessibility
                width="100%"
                height="600px"
                frameBorder="0"
                allowTransparency="true"
                scrolling="no"
            ></iframe>
        </div>
    );
};

export default CryptoChart;
