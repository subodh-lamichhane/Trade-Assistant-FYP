const express = require("express")
const { protect } = require("../Middlewares/Auth")
const { getTrades, getTradeById, createTrade, updateTrade, deleteTrade } = require("../Controllers/TradeController")
const { upload } = require("../Middlewares/FileUpload")

const router = express.Router()

// @desc    Get all trades
// @route   GET /api/trades
// @access  Private
router.get("/", protect, getTrades)

// @desc    Create a trade
// @route   POST /api/trades
// @access  Private
router.post("/", protect, upload.single("screenshot"), createTrade)

// @desc    Get a single trade
// @route   GET /api/trades/:id
// @access  Private
router.get("/:id", protect, getTradeById)

// @desc    Update a trade
// @route   PUT /api/trades/:id
// @access  Private
router.put("/:id", protect, upload.single("screenshot"), updateTrade)

// @desc    Delete a trade
// @route   DELETE /api/trades/:id
// @access  Private
router.delete("/:id", protect, deleteTrade)

module.exports = router

