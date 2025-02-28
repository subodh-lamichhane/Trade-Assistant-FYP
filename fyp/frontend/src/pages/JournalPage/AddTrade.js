import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AddTrade.css';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/footer';
import Header from '../../components/header/header'; 

const AddTrade = ({ addTrade }) => {
    const [trade, setTrade] = useState({
        asset: '',
        date: '',
        strategy: '',
        positionSize: '',
        entryPrice: '',
        exitPrice: '',
        profitLoss: '',
        preTradeAnalysis: '',
        postTradeReflection: '',
        screenshot: null
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTrade({ ...trade, [name]: value });
    };

    const handleFileUpload = (e) => {
        setTrade({ ...trade, screenshot: e.target.files[0] });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        addTrade(trade);
        navigate('/journal');  // Redirect back to the journal page
    };

    return (
        <div className="trade-form-page">
            <Header />
            <Navbar />

            <div className="trade-form-container">
                <h2>Add New Trade</h2>

                <form onSubmit={handleSubmit}>
                    <div className="form-group-a">
                        <label>Traded Asset:</label>
                        <input type="text" name="asset" value={trade.asset} onChange={handleChange} required />
                    </div>

                    <div className="form-group-a">
                        <label>Date:</label>
                        <input type="date" name="date" value={trade.date} onChange={handleChange} required />
                    </div>

                    <div className="form-group-a">
                        <label>Strategy:</label>
                        <input type="text" name="strategy" value={trade.strategy} onChange={handleChange} required />
                    </div>

                    <div className="form-group-a">
                        <label>Position Size:</label>
                        <input type="number" name="positionSize" value={trade.positionSize} onChange={handleChange} required />
                    </div>

                    <div className="form-group-a">
                        <label>Entry Price:</label>
                        <input type="number" step="0.01" name="entryPrice" value={trade.entryPrice} onChange={handleChange} required />
                    </div>

                    <div className="form-group-a">
                        <label>Exit Price:</label>
                        <input type="number" step="0.01" name="exitPrice" value={trade.exitPrice} onChange={handleChange} required />
                    </div>

                    <div className="form-group-a">
                        <label>Total Profit/Loss:</label>
                        <input type="number" step="0.01" name="profitLoss" value={trade.profitLoss} onChange={handleChange} required />
                    </div>

                    <div className="form-group-a">
                        <label>Screenshot:</label>
                        <input type="file" accept="image/*" onChange={handleFileUpload} />
                    </div>

                    <div className="form-group-a">
                        <label>Pre-Trade Analysis/Thoughts:</label>
                        <textarea name="preTradeAnalysis" value={trade.preTradeAnalysis} onChange={handleChange}></textarea>
                    </div>

                    <div className="form-group-a">
                        <label>Post-Trade Reflection:</label>
                        <textarea name="postTradeReflection" value={trade.postTradeReflection} onChange={handleChange}></textarea>
                    </div>

                    <div className="form-buttons">
                        <button type="submit" className="save-button">Save Trade</button>
                        <button type="button" className="cancel-button" onClick={() => navigate('/journal')}>Cancel</button>
                    </div>
                </form>
            </div>

            <Footer />
        </div>
    );
};

export default AddTrade;
