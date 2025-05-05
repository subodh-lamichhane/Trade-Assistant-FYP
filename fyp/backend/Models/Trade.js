// Trade model - stores trading journal entries
import mongoose from 'mongoose';

const { Schema, model } = mongoose;

// Define trade data structure
const TradeSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'users', 
        required: true
    },
    tradeType: {
        type: String,
        enum: ['Buy', 'Sell'],
        required: true
    },
    asset: {
        type: String,
        required: true
    },
    entryPrice: {
        type: Number,
        required: true
    },
    exitPrice: {
        type: Number,
        required: true
    },
    positionSize: {
        type: Number,
        required: true
    },
    leverage: {
        type: Number,
        default: 1
    },
    profitLoss: {
        type: Number,
        required: true
    },
    preTradeAnalysis: {
        type: String,
        required: true
    },
    postTradeReflection: {
        type: String,
        required: true
    },
    screenshot: {
        type: String, 
        required: false
    },
    tradeDate: {
        type: Date,
        default: Date.now
    }
});

// Create and export the trade model
export default model('Trade', TradeSchema);
