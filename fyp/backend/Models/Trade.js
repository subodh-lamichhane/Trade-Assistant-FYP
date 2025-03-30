import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const TradeSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'users', // Ensure this matches the User model's collection name
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
        required: false // Make this optional if not always provided
    },
    tradeDate: {
        type: Date,
        default: Date.now
    }
});

export default model('Trade', TradeSchema);
