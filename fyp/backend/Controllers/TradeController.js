const Trade = require("../Models/Trade")

// @desc    Get all trades for a user
// @route   GET /api/trades
// @access  Private
const getTrades = async (req, res) => {
  try {
    const trades = await Trade.find({ user: req.user._id }).sort({ date: -1 })
    res.json(trades)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Server error" })
  }
}

// @desc    Get a single trade
// @route   GET /api/trades/:id
// @access  Private
const getTradeById = async (req, res) => {
  try {
    const trade = await Trade.findById(req.params.id)

    if (!trade) {
      return res.status(404).json({ message: "Trade not found" })
    }

    // Check if the trade belongs to the logged-in user
    if (trade.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "Not authorized to access this trade" })
    }

    res.json(trade)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Server error" })
  }
}

// @desc    Create a new trade
// @route   POST /api/trades
// @access  Private
const createTrade = async (req, res) => {
  try {
    const {
      asset,
      date,
      strategy,
      positionSize,
      entryPrice,
      exitPrice,
      profitLoss,
      preTradeAnalysis,
      postTradeReflection,
    } = req.body

    // Handle file upload if implemented
    let screenshotUrl = ""
    if (req.file) {
      screenshotUrl = req.file.path
    }

    const trade = await Trade.create({
      user: req.user._id,
      asset,
      date,
      strategy,
      positionSize,
      entryPrice,
      exitPrice,
      profitLoss,
      preTradeAnalysis,
      postTradeReflection,
      screenshotUrl,
    })

    res.status(201).json(trade)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Server error" })
  }
}

// @desc    Update a trade
// @route   PUT /api/trades/:id
// @access  Private
const updateTrade = async (req, res) => {
  try {
    const trade = await Trade.findById(req.params.id)

    if (!trade) {
      return res.status(404).json({ message: "Trade not found" })
    }

    // Check if the trade belongs to the logged-in user
    if (trade.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "Not authorized to update this trade" })
    }

    // Update the trade
    const updatedTrade = await Trade.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })

    res.json(updatedTrade)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Server error" })
  }
}

// @desc    Delete a trade
// @route   DELETE /api/trades/:id
// @access  Private
const deleteTrade = async (req, res) => {
  try {
    const trade = await Trade.findById(req.params.id)

    if (!trade) {
      return res.status(404).json({ message: "Trade not found" })
    }

    // Check if the trade belongs to the logged-in user
    if (trade.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "Not authorized to delete this trade" })
    }

    await Trade.findByIdAndDelete(req.params.id)

    res.json({ message: "Trade removed" })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Server error" })
  }
}

module.exports = {
  getTrades,
  getTradeById,
  createTrade,
  updateTrade,
  deleteTrade,
}

