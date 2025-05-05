// NEPSE routes - handles stock market data
import express from 'express';
import axios from 'axios';
import https from 'https';

const router = express.Router();

// Get stock market data for a symbol
router.get('/index/:symbol', async (req, res) => {
    try {
        const { symbol } = req.params;
        const { timeframe } = req.query;
        const formattedSymbol = symbol.toLowerCase();
        
        // Generate test data for development
        const mockData = generateMockData(timeframe);
        return res.json(mockData);
        
    } catch (error) {
        console.error('Failed to get market data:', error);
        res.status(500).json({ error: 'Could not fetch market data' });
    }
});

// Generate test data for development
function generateMockData(timeframe = 'D') {
    const data = [];
    const endDate = new Date();
    let startDate;
    let value = 2000; // Starting price

    // Set time range based on timeframe
    switch(timeframe) {
        case 'W':
            startDate = new Date(endDate.getTime() - (365 * 24 * 60 * 60 * 1000)); // 1 year
            break;
        case 'D':
            startDate = new Date(endDate.getTime() - (180 * 24 * 60 * 60 * 1000)); // 6 months
            break;
        case '60':
            startDate = new Date(endDate.getTime() - (30 * 24 * 60 * 60 * 1000)); // 30 days
            break;
        case '15':
            startDate = new Date(endDate.getTime() - (7 * 24 * 60 * 60 * 1000)); // 7 days
            break;
        default:
            startDate = new Date(endDate.getTime() - (180 * 24 * 60 * 60 * 1000)); // 6 months
    }

    let currentDate = new Date(startDate);

    while (currentDate <= endDate) {
        // Skip weekends for daily and weekly data
        if ((timeframe === 'D' || timeframe === 'W') && (currentDate.getDay() === 0 || currentDate.getDay() === 6)) {
            currentDate.setDate(currentDate.getDate() + 1);
            continue;
        }

        // Set price movement range based on timeframe
        let volatility;
        switch(timeframe) {
            case 'W':
                volatility = 100; // Weekly changes
                break;
            case 'D':
                volatility = 50; // Daily changes
                break;
            case '60':
                volatility = 20; // Hourly changes
                break;
            case '15':
                volatility = 10; // 15-minute changes
                break;
            default:
                volatility = 50;
        }

        // Create price data
        const open = value;
        const high = open + (Math.random() * volatility);
        const low = open - (Math.random() * volatility);
        const close = low + (Math.random() * (high - low));
        
        // Update price for next point
        value = close;

        // Keep price above minimum
        value = Math.max(1000, value);

        // Format date based on timeframe
        let dateStr;
        switch(timeframe) {
            case 'W':
            case 'D':
                dateStr = currentDate.toISOString().split('T')[0];
                break;
            case '60':
                dateStr = currentDate.toISOString().split('T')[0] + ' ' + 
                         String(currentDate.getHours()).padStart(2, '0') + ':00';
                break;
            case '15':
                const minutes = currentDate.getMinutes();
                const roundedMinutes = Math.floor(minutes / 15) * 15;
                dateStr = currentDate.toISOString().split('T')[0] + ' ' + 
                         String(currentDate.getHours()).padStart(2, '0') + ':' + 
                         String(roundedMinutes).padStart(2, '0');
                break;
            default:
                dateStr = currentDate.toISOString().split('T')[0];
        }

        data.push({
            date: dateStr,
            open: open.toFixed(2),
            high: high.toFixed(2),
            low: low.toFixed(2),
            close: close.toFixed(2)
        });

        // Move to next time point
        switch(timeframe) {
            case 'W':
                currentDate.setDate(currentDate.getDate() + 7);
                break;
            case 'D':
                currentDate.setDate(currentDate.getDate() + 1);
                break;
            case '60':
                currentDate.setHours(currentDate.getHours() + 1);
                break;
            case '15':
                currentDate.setMinutes(currentDate.getMinutes() + 15);
                break;
            default:
                currentDate.setDate(currentDate.getDate() + 1);
        }
    }

    // Sort by date
    return data.sort((a, b) => new Date(a.date) - new Date(b.date));
}

export default router; 