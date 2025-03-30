import Trade from '../Models/Trade.js';

export const addTrade = async (req, res) => {
  try {
    console.log('Incoming request body:', req.body); // Log the request body
    console.log('Incoming file:', req.file); // Log the uploaded file (if any)
    console.log('Authenticated user ID:', req.user?._id); // Log the user ID from JWT

    const {
      tradeType,
      asset,
      entryPrice,
      exitPrice,
      positionSize,
      profitLoss,
      preTradeAnalysis,
      postTradeReflection,
      tradeDate,
    } = req.body;

    const userId = req.user?._id; // Retrieved from JWT

    // Validate required fields
    if (!tradeType || !asset || !entryPrice || !exitPrice || !positionSize || !profitLoss || !preTradeAnalysis || !postTradeReflection || !tradeDate) {
      return res.status(400).json({ success: false, message: 'All fields are required' });
    }

    const newTrade = new Trade({
      userId,
      tradeType,
      asset,
      entryPrice,
      exitPrice,
      positionSize,
      profitLoss,
      preTradeAnalysis,
      postTradeReflection,
      screenshot: req.file ? req.file.path : null,
      tradeDate,
    });

    await newTrade.save();
    res.status(201).json({ success: true, message: 'Trade added successfully', trade: newTrade });
  } catch (error) {
    console.error('Error adding trade:', error); // Log the error for debugging
    res.status(500).json({ success: false, message: 'Error adding trade', error });
  }
};

export const getTrades = async (req, res) => {
  try {
    const userId = req.user._id; // Retrieved from JWT
    const trades = await Trade.find({ userId }).sort({ tradeDate: -1 });
    res.status(200).json({ success: true, trades });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching trades', error });
  }
};
