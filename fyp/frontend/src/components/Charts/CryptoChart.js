import React, { useState, useEffect } from "react";
import Chart from "react-apexcharts";
import axios from "axios";
import "./CryptoChart.css";

const CryptoChart = ({ symbol }) => {
    const [chartData, setChartData] = useState({ categories: [], prices: [] });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/crypto/${symbol}`);
                const data = response.data.history;
                const categories = data.map((entry) => entry.Date);
                const prices = data.map((entry) => entry.Close);
                setChartData({ categories, prices });
            } catch (error) {
                console.error("Error fetching crypto data:", error);
            }
        };
        
        fetchData();
    }, [symbol]);

    const options = {
        chart: { type: "line" },
        xaxis: { categories: chartData.categories },
    };
    const series = [{ name: symbol, data: chartData.prices }];

    return (
        <div className="crypto-chart">
            <h2>{symbol} Price Chart</h2>
            <Chart options={options} series={series} type="line" height={350} />
        </div>
    );
};

export default CryptoChart;
