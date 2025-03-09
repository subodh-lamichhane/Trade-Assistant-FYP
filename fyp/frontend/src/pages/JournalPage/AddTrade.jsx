// AddTrade.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddTrade = () => {
    const [asset, setAsset] = useState('');
    const [date, setDate] = useState('');
    const [strategy, setStrategy] = useState('');
    const [profitLoss, setProfitLoss] = useState('');
    
    const navigate = useNavigate();

    const handleAddTrade = async (e) => {
        e.preventDefault();
        
        const tradeData = {
            asset,
            date,
            strategy,
            profitLoss: parseFloat(profitLoss),
        };

        try {
            const response = await fetch('/api/trades/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(tradeData),
            });

            if (response.ok) {
                alert('Trade added successfully!');
                navigate('/journal');
            } else {
                alert('Error adding trade!');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Error adding trade!');
        }
    };

    return (
        <div>
            <h2>Add New Trade</h2>
            <form onSubmit={handleAddTrade}>
                <label>
                    Asset:
                    <input
                        type="text"
                        value={asset}
                        onChange={(e) => setAsset(e.target.value)}
                    />
                </label>
                <label>
                    Date:
                    <input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                    />
                </label>
                <label>
                    Strategy:
                    <input
                        type="text"
                        value={strategy}
                        onChange={(e) => setStrategy(e.target.value)}
                    />
                </label>
                <label>
                    Profit/Loss:
                    <input
                        type="number"
                        value={profitLoss}
                        onChange={(e) => setProfitLoss(e.target.value)}
                    />
                </label>
                <button type="submit">Add Trade</button>
            </form>
        </div>
    );
};

export default AddTrade;
