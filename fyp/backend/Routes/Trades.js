// routes/Trades.js
const express = require('express');
const router = express.Router();
const pool = require('../db');

// POST request to add a trade
router.post('/add', (req, res) => {
    const { asset, date, strategy, profitLoss } = req.body;
    
    // SQL query to insert trade data into the database
    const query = 'INSERT INTO trades (asset, date, strategy, profit_loss) VALUES (?, ?, ?, ?)';
    
    pool.execute(query, [asset, date, strategy, profitLoss], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Error adding trade' });
        }
        res.status(201).json({ message: 'Trade added successfully' });
    });
});

module.exports = router;
