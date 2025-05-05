import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './JournalPage.css';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/footer';
import Header from '../../components/header/header';

const JournalPage = () => {
    const [trades, setTrades] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedTrade, setSelectedTrade] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchTrades = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    navigate('/login');
                    return;
                }

                const response = await fetch('http://localhost:8081/trades/user-trades', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                const result = await response.json();
                if (result.success) {
                    setTrades(result.trades);
                } else {
                    setError(result.message);
                }
            } catch (error) {
                setError('Failed to fetch trades.');
            } finally {
                setLoading(false);
            }
        };

        fetchTrades();
    }, [navigate]);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return isNaN(date.getTime()) ? 'Invalid Date' : date.toLocaleDateString();
    };

    const handleViewTrade = (trade) => {
        setSelectedTrade(trade);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedTrade(null);
    };

    const handleDeleteTrade = async (tradeId) => {
        if (!window.confirm('Are you sure you want to delete this trade?')) {
            return;
        }

        setIsDeleting(true);
        try {
            const response = await fetch(`http://localhost:8081/trades/delete/${tradeId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });

            const result = await response.json();
            if (result.success) {
                // Remove the trade from the local state
                setTrades(trades.filter(trade => trade._id !== tradeId));
            } else {
                alert(result.message);
            }
        } catch (error) {
            console.error('Error deleting trade:', error);
            alert('Error deleting trade');
        } finally {
            setIsDeleting(false);
        }
    };

    return (
        <div className="journal-page">
            <Header />
            <Navbar />

            <section className="journal-container">
                <div className="journal-header">
                    <h2 className="journal-title">Trading Journal</h2>
                    <p className="journal-subtitle">Track, Analyze, and Improve Your Trading Performance</p>
                </div>

                <div className="journal-stats">
                    <div className="stat-card">
                        <h3>Total Trades</h3>
                        <p>{trades.length}</p>
                    </div>
                    <div className="stat-card">
                        <h3>Profitable Trades</h3>
                        <p>{trades.filter(trade => trade.profitLoss > 0).length}</p>
                    </div>
                    <div className="stat-card">
                        <h3>Win Rate</h3>
                        <p>{trades.length > 0 ? ((trades.filter(trade => trade.profitLoss > 0).length / trades.length) * 100).toFixed(1) : 0}%</p>
                    </div>
                </div>

                <div className="journal-table-container">
                    <div className="table-header">
                        <h3>Trade History</h3>
                        <button className="add-trade-button" onClick={() => navigate('/tradeadd')}>
                            <span>+</span> Add New Trade
                        </button>
                    </div>

                    {loading ? (
                        <div className="loading-spinner">Loading...</div>
                    ) : error ? (
                        <div className="error-message">{error}</div>
                    ) : trades.length === 0 ? (
                        <div className="empty-state">
                            <p>No trades recorded yet</p>
                            <button className="add-trade-button" onClick={() => navigate('/tradeadd')}>Record Your First Trade</button>
                        </div>
                    ) : (
                        <div className="table-responsive">
                            <table className="journal-table">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Date</th>
                                        <th>Asset</th>
                                        <th>Entry</th>
                                        <th>Exit</th>
                                        <th>P/L</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {trades.map((trade, index) => (
                                        <tr key={trade._id}>
                                            <td>{index + 1}</td>
                                            <td>{formatDate(trade.tradeDate)}</td>
                                            <td>{trade.asset}</td>
                                            <td>${trade.entryPrice}</td>
                                            <td>${trade.exitPrice}</td>
                                            <td className={trade.profitLoss >= 0 ? "profit" : "loss"}>
                                                ${Math.abs(trade.profitLoss).toFixed(2)}
                                                <span className={trade.profitLoss >= 0 ? "profit-indicator" : "loss-indicator"}>
                                                    {trade.profitLoss >= 0 ? '↑' : '↓'}
                                                </span>
                                            </td>
                                            <td>
                                                <div className="action-buttons">
                                                    <button 
                                                        className="view-button"
                                                        onClick={() => handleViewTrade(trade)}
                                                    >
                                                        View Details
                                                    </button>
                                                    <button 
                                                        className="delete-button"
                                                        onClick={() => handleDeleteTrade(trade._id)}
                                                        disabled={isDeleting}
                                                    >
                                                        {isDeleting ? 'Deleting...' : 'Delete'}
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </section>

            {isModalOpen && selectedTrade && (
                <div className="trade-modal-overlay" onClick={closeModal}>
                    <div className="trade-modal" onClick={e => e.stopPropagation()}>
                        <button className="modal-close" onClick={closeModal}>&times;</button>
                        <h2>Trade Details</h2>
                        <div className="trade-details">
                            <div className="detail-row">
                                <span>Date:</span>
                                <span>{formatDate(selectedTrade.tradeDate)}</span>
                            </div>
                            <div className="detail-row">
                                <span>Asset:</span>
                                <span>{selectedTrade.asset}</span>
                            </div>
                            <div className="detail-row">
                                <span>Type:</span>
                                <span>{selectedTrade.tradeType || 'N/A'}</span>
                            </div>
                            <div className="detail-row">
                                <span>Entry Price:</span>
                                <span>${selectedTrade.entryPrice}</span>
                            </div>
                            <div className="detail-row">
                                <span>Exit Price:</span>
                                <span>${selectedTrade.exitPrice}</span>
                            </div>
                            <div className="detail-row">
                                <span>Position Size:</span>
                                <span>{selectedTrade.positionSize}</span>
                            </div>
                            <div className="detail-row">
                                <span>Profit/Loss:</span>
                                <span className={selectedTrade.profitLoss >= 0 ? "profit" : "loss"}>
                                    ${Math.abs(selectedTrade.profitLoss).toFixed(2)}
                                    {selectedTrade.profitLoss >= 0 ? ' Profit' : ' Loss'}
                                </span>
                            </div>
                            <div className="detail-section">
                                <h3>Pre-Trade Analysis</h3>
                                <p>{selectedTrade.preTradeAnalysis || 'No analysis provided'}</p>
                            </div>
                            <div className="detail-section">
                                <h3>Post-Trade Reflection</h3>
                                <p>{selectedTrade.postTradeReflection || 'No reflection provided'}</p>
                            </div>
                            {selectedTrade.screenshot && (
                                <div className="trade-screenshot">
                                    <h3>Trade Screenshot</h3>
                                    <img 
                                        src={`http://localhost:8081/${selectedTrade.screenshot}`} 
                                        alt="Trade Screenshot" 
                                        onError={(e) => {
                                            console.error('Error loading image');
                                            e.target.style.display = 'none';
                                        }}
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}

            <Footer />
        </div>
    );
};

export default JournalPage;

