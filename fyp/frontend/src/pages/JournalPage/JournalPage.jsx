import React, { useEffect, useState } from 'react';
import './JournalPage.css';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/footer';
import Header from '../../components/header/header'; 
import { useNavigate } from 'react-router-dom';

const JournalPage = () => {
    const [trades, setTrades] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchTrades = async () => {
            const response = await fetch('/api/trades');
            const data = await response.json();
            setTrades(data);
        };

        fetchTrades();
    }, []);

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
                    
                    <table className="journal-table">
                        <thead>
                            <tr>
                                <th>S.N.</th>
                                <th>Traded Asset</th>
                                <th>Date</th>
                                <th>Strategy</th>
                                <th>Profit/Loss</th>
                            </tr>
                        </thead>
                        <tbody>
                            {trades.map((trade, index) => (
                                <tr key={trade.id}>
                                    <td>{index + 1}</td>
                                    <td>{trade.asset}</td>
                                    <td>{trade.date}</td>
                                    <td>{trade.strategy}</td>
                                    <td className={trade.profit_loss >= 0 ? "profit" : "loss"}>${trade.profit_loss}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default JournalPage;
