import React, { useState, useEffect } from 'react';
import Navbar from '../../../components/Navbar/Navbar';
import Footer from '../../../components/Footer/footer';
import Header from '../../../components/header/header';

const NepsePage = () => {
    const [symbol, setSymbol] = useState('NABIL');
    const [stockData, setStockData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchStockData = async () => {
            try {
                const response = await fetch(`http://localhost:8081/nepse/${symbol}`);
                const data = await response.json();
                if (data.error) {
                    throw new Error(data.error + (data.details ? `: ${data.details}` : ''));
                }
                setStockData(data);
                setError(null); // Clear any previous errors
            } catch (err) {
                setError(err.message);
                setStockData(null);
            }
        };

        fetchStockData();
    }, [symbol]);

    return (
        <div className="markets-page">
            <Header />
            <Navbar />
            <h1>The Nepali Charts</h1>
            <hr className="section-divider" />
            <div>
                <select onChange={(e) => setSymbol(e.target.value)}>
                    <option value="NABIL">NABIL</option>
                    <option value="NRIC">NRIC</option>
                    <option value="SBI">SBI</option>
                </select>
            </div>
            {error ? (
                <p className="error-text">Error: {error}</p>
            ) : stockData ? (
                <div className="stock-info">
                    <h2>{stockData.name}</h2>
                    <p>Price: {stockData.price}</p>
                    <p>High: {stockData.high}</p>
                    <p>Low: {stockData.low}</p>
                </div>
            ) : (
                <p>Loading...</p>
            )}
            <Footer />
        </div>
    );
};

export default NepsePage;
