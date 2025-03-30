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
    const navigate = useNavigate();

    useEffect(() => {
        const fetchTrades = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    navigate('/login'); // Redirect to login if not authenticated
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
        return isNaN(date.getTime()) ? 'Invalid Date' : date.toLocaleDateString(); // Format as MM/DD/YYYY or based on locale
    };

    return (
        <div className="journal-page">
            <Header />
            <Navbar />

            <section className="journal-container">
                <h2 className="journal-title">My Trading Journal</h2>
                <p className="journal-subtitle">"Reflect, Learn, Repeat"</p>

                <div className="journal-table-container">
                    <div className="table-header">
                        <h3>My Trades</h3>
                        <button className="add-trade-button" onClick={() => navigate('/tradeadd')}>+ Add Trade</button>
                    </div>

                    {loading ? (
                        <p className="loading-text">Loading trades...</p>
                    ) : error ? (
                        <p className="error-text">{error}</p>
                    ) : trades.length === 0 ? (
                        <p className="no-trades-text">No trades recorded yet. Start by adding a trade!</p>
                    ) : (
                        <table className="journal-table">
                            <thead>
                                <tr>
                                    <th>S.N.</th>
                                    <th>Date</th>
                                    <th>Traded Asset</th>
                                    <th>Entry Price</th>
                                    <th>Exit Price</th>
                                    <th>Profit/Loss</th>
                                </tr>
                            </thead>
                            <tbody>
                                {trades.map((trade, index) => (
                                    <tr key={trade._id}>
                                        <td>{index + 1}</td>
                                        <td>{formatDate(trade.tradeDate)}</td>
                                        <td>{trade.asset}</td>
                                        <td>{trade.entryPrice}</td>
                                        <td>{trade.exitPrice}</td>
                                        <td className={trade.profitLoss >= 0 ? "profit" : "loss"}>
                                            ${trade.profitLoss.toFixed(2)}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default JournalPage;
