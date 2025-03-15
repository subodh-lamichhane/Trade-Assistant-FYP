const mongoose = require("mongoose")

const tradeSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  asset: {
    type: String,
    required: [true, "Please provide the traded asset"],
  },
  date: {
    type: Date,
    required: [true, "Please provide the trade date"],
  },
  strategy: {
    type: String,
    required: [true, "Please provide the trading strategy"],
  },
  positionSize: {
    type: Number,
    required: [true, "Please provide the position size"],
  },
  entryPrice: {
    type: Number,
    required: [true, "Please provide the entry price"],
  },
  exitPrice: {
    type: Number,
    required: [true, "Please provide the exit price"],
  },
  profitLoss: {
    type: Number,
    required: [true, "Please provide the profit/loss amount"],
  },
  preTradeAnalysis: {
    type: String,
  },
  postTradeReflection: {
    type: String,
  },
  screenshotUrl: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

// Check if the model exists before creating it
const Trade = mongoose.models.Trade || mongoose.model("Trade", tradeSchema)

module.exports = Trade

