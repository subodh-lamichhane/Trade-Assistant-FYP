// Trade controller - handles trade journal operations
import Trade from '../Models/Trade.js';

// Add a new trade to the journal
export const addTrade = async (req, res) => {
  try {
    const {
      tradeType,
      asset,
      entryPrice,
      exitPrice,
      positionSize,
      leverage,
      profitLoss,
      preTradeAnalysis,
      postTradeReflection,
      tradeDate,
    } = req.body;

    const userId = req.user?._id;

    // Check if all required fields are present
    if (!tradeType || !asset || !entryPrice || !exitPrice || !positionSize || !profitLoss || !preTradeAnalysis || !postTradeReflection || !tradeDate) {
      return res.status(400).json({ 
        success: false, 
        message: 'Please fill in all required fields' 
      });
    }

    // Create new trade entry
    const newTrade = new Trade({
      userId,
      tradeType,
      asset,
      entryPrice,
      exitPrice,
      positionSize,
      leverage: leverage || 1,
      profitLoss,
      preTradeAnalysis,
      postTradeReflection,
      screenshot: req.file ? req.file.path : null,
      tradeDate,
    });

    await newTrade.save();
    res.status(201).json({ 
      success: true, 
      message: 'Trade added to journal', 
      trade: newTrade 
    });
  } catch (error) {
    console.error('Failed to add trade:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Could not add trade', 
      error 
    });
  }
};

// Get all trades for a user
export const getTrades = async (req, res) => {
  try {
    const userId = req.user._id;
    const trades = await Trade.find({ userId }).sort({ tradeDate: -1 });
    res.status(200).json({ success: true, trades });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: 'Could not fetch trades', 
      error 
    });
  }
};

// Delete a trade from the journal
export const deleteTrade = async (req, res) => {
  try {
    const { tradeId } = req.params;
    const userId = req.user._id;

    // Make sure the trade belongs to the user
    const trade = await Trade.findOne({ _id: tradeId, userId });
    
    if (!trade) {
      return res.status(404).json({ 
        success: false, 
        message: 'Trade not found or you do not have permission to delete it' 
      });
    }

    await Trade.findByIdAndDelete(tradeId);
    res.status(200).json({ 
      success: true, 
      message: 'Trade removed from journal' 
    });
  } catch (error) {
    console.error('Failed to delete trade:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Could not delete trade', 
      error 
    });
  }
};
