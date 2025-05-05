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
        leverage: '1',
        profitLoss: '',
        preTradeAnalysis: '',
        postTradeReflection: '',
        tradeDate: '',
        screenshot: null
    });
    const [previewUrl, setPreviewUrl] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        
        // Create a new trade object with the updated value
        const updatedTrade = { ...trade, [name]: value };
        
        // Calculate profit/loss whenever entry rate, exit rate, position size, leverage, or trade type changes
        if (name === 'entryPrice' || name === 'exitPrice' || name === 'positionSize' || name === 'leverage' || name === 'tradeType') {
            // Get the current values, using the updated value for the field that just changed
            const entry = name === 'entryPrice' ? parseFloat(value) : parseFloat(trade.entryPrice) || 0;
            const exit = name === 'exitPrice' ? parseFloat(value) : parseFloat(trade.exitPrice) || 0;
            const size = name === 'positionSize' ? parseFloat(value) : parseFloat(trade.positionSize) || 0;
            const leverage = name === 'leverage' ? parseFloat(value) : parseFloat(trade.leverage) || 1;
            const type = name === 'tradeType' ? value : trade.tradeType;
            
            // Only calculate if we have all required values
            if (entry && exit && size) {
                // Calculate pips difference (1 pip = 0.0001 for most forex pairs)
                const pipsDiff = type === 'Buy' 
                    ? (exit - entry) * 10000 // Convert to pips (multiply by 10000 to get pips)
                    : (entry - exit) * 10000;
                
                // Calculate profit/loss in USD
                // Standard lot = 100,000 units, so 0.01 lot = 1,000 units
                // 1 pip = $0.10 for 0.01 lot (1,000 units)
                // Therefore, for 0.2 lots, 1 pip = $2.00
                const pipValue = size * 10; // $10 per pip for 1.0 lot, so $2 per pip for 0.2 lot
                
                // Apply leverage to the profit/loss
                const pl = pipsDiff * pipValue * leverage;
                
                updatedTrade.profitLoss = pl.toFixed(2);
            }
        }
        
        // Update the state with all changes at once
        setTrade(updatedTrade);
    };

    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            setTrade({ ...trade, screenshot: file });
            const fileReader = new FileReader();
            fileReader.onload = () => {
                setPreviewUrl(fileReader.result);
            };
            fileReader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        
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
            if (result.success) {
                navigate('/journal');
            } else {
                alert(result.message);
            }
        } catch (error) {
            console.error('Error adding trade:', error);
            alert('Error adding trade');
        } finally {
            setIsSubmitting(false);
        }
    };
    
    return (
        <div className="trade-form-page">
            <Header />
            <Navbar />

            <div className="trade-form-container">
                <div className="form-header">
                    <h2>Record New Trade</h2>
                    <p>Document your trading journey with detailed analysis</p>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="form-grid">
                        <div className="form-section">
                            <h3>Trade Details</h3>
                            <div className="form-group-a">
                                <label>Trade Type</label>
                                <select 
                                    name="tradeType" 
                                    value={trade.tradeType} 
                                    onChange={handleChange} 
                                    required
                                >
                                    <option value="Buy">Buy (Long)</option>
                                    <option value="Sell">Sell (Short)</option>
                                </select>
                            </div>

                            <div className="form-group-a">
                                <label>Asset/Symbol</label>
                                <input 
                                    type="text" 
                                    name="asset" 
                                    placeholder="e.g., BTC/USD, AAPL"
                                    value={trade.asset} 
                                    onChange={handleChange} 
                                    required 
                                />
                            </div>

                            <div className="form-row">
                                <div className="form-group-a">
                                    <label>Entry Rate</label>
                                    <div className="input-with-unit">
                                        <input 
                                            type="number" 
                                            step="0.0001" 
                                            name="entryPrice" 
                                            value={trade.entryPrice} 
                                            onChange={handleChange} 
                                            placeholder="e.g., 1.2234"
                                            required 
                                        />
                                        <span className="unit">Rate</span>
                                    </div>
                                </div>

                                <div className="form-group-a">
                                    <label>Exit Rate</label>
                                    <div className="input-with-unit">
                                        <input 
                                            type="number" 
                                            step="0.0001" 
                                            name="exitPrice" 
                                            value={trade.exitPrice} 
                                            onChange={handleChange} 
                                            placeholder="e.g., 1.2345"
                                            required 
                                        />
                                        <span className="unit">Rate</span>
                                    </div>
                                </div>
                            </div>

                            <div className="form-row">
                                <div className="form-group-a">
                                    <label>Position Size (Lots)</label>
                                    <div className="input-with-unit">
                                        <input 
                                            type="number" 
                                            step="0.01" 
                                            name="positionSize" 
                                            value={trade.positionSize} 
                                            onChange={handleChange} 
                                            placeholder="e.g., 0.2"
                                            required 
                                        />
                                        <span className="unit">LOTS</span>
                                    </div>
                                    <small className="form-help-text">0.01 lot = 1,000 units</small>
                                </div>

                                <div className="form-group-a">
                                    <label>Leverage</label>
                                    <div className="input-with-unit">
                                        <input 
                                            type="number" 
                                            step="0.01" 
                                            min="0.01" 
                                            name="leverage" 
                                            value={trade.leverage} 
                                            onChange={handleChange} 
                                            placeholder="e.g., 0.1"
                                        />
                                        <span className="unit">x</span>
                                    </div>
                                    <small className="form-help-text">1:100 = 0.01</small>
                                </div>
                            </div>

                            <div className="form-group-a">
                                <label>Profit/Loss (USD)</label>
                                <div className="input-with-unit">
                                    <input
                                        type="number"
                                        step="0.01"
                                        name="profitLoss"
                                        value={trade.profitLoss}
                                        readOnly
                                        className={
                                            parseFloat(trade.profitLoss) > 0 ? 'profit-input' : 
                                            parseFloat(trade.profitLoss) < 0 ? 'loss-input' : ''
                                        }
                                    />
                                    <span className="unit">USD</span>
                                </div>
                            </div>

                            <div className="form-group-a">
                                <label>Trade Date</label>
                                <input 
                                    type="date" 
                                    name="tradeDate" 
                                    value={trade.tradeDate} 
                                    onChange={handleChange} 
                                    required 
                                />
                            </div>
                        </div>

                        <div className="form-section">
                            <h3>Analysis & Documentation</h3>
                            <div className="form-group-a">
                                <label>Pre-Trade Analysis</label>
                                <textarea 
                                    name="preTradeAnalysis" 
                                    placeholder="What was your strategy and reason for entering this trade?"
                                    value={trade.preTradeAnalysis} 
                                    onChange={handleChange} 
                                    required 
                                ></textarea>
                            </div>

                            <div className="form-group-a">
                                <label>Post-Trade Reflection</label>
                                <textarea 
                                    name="postTradeReflection" 
                                    placeholder="What did you learn from this trade? What could be improved?"
                                    value={trade.postTradeReflection} 
                                    onChange={handleChange} 
                                    required 
                                ></textarea>
                            </div>

                            <div className="form-group-a screenshot-upload">
                                <label>Trade Screenshot</label>
                                <div className="upload-area">
                                    <input 
                                        type="file" 
                                        name="screenshot" 
                                        accept="image/*" 
                                        onChange={handleFileUpload} 
                                        id="screenshot-input"
                                    />
                                    <label htmlFor="screenshot-input" className="upload-button">
                                        Choose File
                                    </label>
                                    {previewUrl && (
                                        <div className="image-preview">
                                            <img src={previewUrl} alt="Trade Screenshot Preview" />
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="form-buttons">
                        <button type="button" className="cancel-button" onClick={() => navigate('/journal')}>
                            Cancel
                        </button>
                        <button type="submit" className="save-button" disabled={isSubmitting}>
                            {isSubmitting ? 'Saving...' : 'Save Trade'}
                        </button>
                    </div>
                </form>
            </div>

            <Footer />
        </div>
    );
};

export default AddTrade;
