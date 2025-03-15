import React from "react";

const CryptoChart = ({ symbol }) => {
    return (
        <div className="crypto-chart-container">
            <iframe
                src={`https://www.tradingview.com/embed-widget/advanced-chart/?symbol=${symbol}&theme=dark`}
                width="90%"
                height="500px"
                frameBorder="0"
                allowTransparency="true"
                scrolling="no"
            ></iframe>
        </div>
    );
};

export default CryptoChart;
