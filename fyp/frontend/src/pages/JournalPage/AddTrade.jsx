import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AddTrade.css';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/footer';
import Header from '../../components/header/header'; 

const AddTrade = () => {
    const [trade, setTrade] = useState({
        tradeType: 'Buy',
        asset: '',
        entryPrice: '',
        exitPrice: '',
        positionSize: '',
        profitLoss: '',
        preTradeAnalysis: '',
        postTradeReflection: '',
        tradeDate: '',
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const formData = new FormData();
        Object.keys(trade).forEach(key => {
            formData.append(key, trade[key]);
        });
    
        try {
            const response = await fetch('http://localhost:8081/trades/add', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: formData
            });
    
            const result = await response.json();
            console.log('Response from server:', result); // Log the server response for debugging
            if (result.success) {
                alert('Trade added successfully');
                navigate('/journal');
            } else {
                alert(result.message);
            }
        } catch (error) {
            console.error('Error adding trade:', error); // Log the error for debugging
            alert('Error adding trade');
        }
    };
    
    return (
        <div className="trade-form-page">
            <Header />
            <Navbar />

            <div className="trade-form-container">
                <h2>Add New Trade</h2>

                <form onSubmit={handleSubmit}>
                    <div className="form-group-a">
                        <label>Trade Type:</label>
                        <select name="tradeType" value={trade.tradeType} onChange={handleChange} required>
                            <option value="Buy">Buy</option>
                            <option value="Sell">Sell</option>
                        </select>
                    </div>

                    <div className="form-group-a">
                        <label>Traded Asset:</label>
                        <input type="text" name="asset" value={trade.asset} onChange={handleChange} required />
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
                        <label>Position Size:</label>
                        <input type="number" name="positionSize" value={trade.positionSize} onChange={handleChange} required />
                    </div>

                    <div className="form-group-a">
                        <label>Total Profit/Loss:</label>
                        <input 
                            type="number" 
                            step="0.01" 
                            name="profitLoss" 
                            value={trade.profitLoss} 
                            onChange={handleChange} 
                            required 
                        />
                    </div>

                    <div className="form-group-a">
                        <label>Pre-Trade Analysis:</label>
                        <textarea 
                            name="preTradeAnalysis" 
                            value={trade.preTradeAnalysis} 
                            onChange={handleChange} 
                            required 
                        ></textarea>
                    </div>

                    <div className="form-group-a">
                        <label>Post-Trade Reflection:</label>
                        <textarea 
                            name="postTradeReflection" 
                            value={trade.postTradeReflection} 
                            onChange={handleChange} 
                            required 
                        ></textarea>
                    </div>

                    <div className="form-group-a">
                        <label>Upload Screenshot:</label>
                        <input 
                            type="file" 
                            name="screenshot" 
                            accept="image/*" 
                            onChange={handleFileUpload} 
                        />
                    </div>

                    <div className="form-group-a">
                        <label>Trade Date:</label>
                        <input 
                            type="date" 
                            name="tradeDate" 
                            value={trade.tradeDate} 
                            onChange={handleChange} 
                            required 
                        />
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
