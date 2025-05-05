// Learning controller - handles all learning-related operations
import UserModel from "../Models/User.js";
import LearningProgress from '../Models/LearningProgress.js';
import LearningContent from '../Models/LearningContent.js';

// Get chapters completed by the user
export const getCompletedChapters = async (req, res) => {
    try {
        const user = await UserModel.findById(req.user._id).select("completedChapters");
        if (!user) {
            return res.status(404).json({ 
                message: "User not found", 
                success: false 
            });
        }
        res.status(200).json({ 
            success: true, 
            completedChapters: user.completedChapters 
        });
    } catch (error) {
        res.status(500).json({ 
            message: "Something went wrong", 
            success: false 
        });
    }
};

// Mark a chapter as completed
export const updateCompletedChapters = async (req, res) => {
    try {
        const { chapterId } = req.body;
        const user = await UserModel.findById(req.user._id);

        if (!user) {
            return res.status(404).json({ 
                message: "User not found", 
                success: false 
            });
        }

        // Add chapter to completed list if not already there
        if (!user.completedChapters.includes(chapterId)) {
            user.completedChapters.push(chapterId);
            await user.save();
        }

        res.status(200).json({ 
            success: true, 
            completedChapters: user.completedChapters 
        });
    } catch (error) {
        res.status(500).json({ 
            message: "Something went wrong", 
            success: false 
        });
    }
};

// Get user's learning progress
export const getProgress = async (req, res) => {
    try {
        if (!req.user || !req.user._id) {
            return res.status(401).json({ 
                success: false, 
                message: 'Please log in to view progress' 
            });
        }

        let progress = await LearningProgress.findOne({ userId: req.user._id });
        if (!progress) {
            // Create new progress if none exists
            progress = await LearningProgress.create({
                userId: req.user._id,
                completedChapters: [],
                lastAccessedChapter: 1
            });
        }
        res.json({ success: true, progress });
    } catch (error) {
        console.error('Failed to get progress:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Could not fetch progress' 
        });
    }
};

// Update user's learning progress
export const updateProgress = async (req, res) => {
    try {
        if (!req.user || !req.user._id) {
            return res.status(401).json({ 
                success: false, 
                message: 'Please log in to update progress' 
            });
        }

        const { completedChapters, lastAccessedChapter } = req.body;
        let progress = await LearningProgress.findOne({ userId: req.user._id });
        
        if (!progress) {
            // Create new progress if none exists
            progress = await LearningProgress.create({
                userId: req.user._id,
                completedChapters,
                lastAccessedChapter
            });
        } else {
            // Update existing progress
            progress.completedChapters = completedChapters;
            progress.lastAccessedChapter = lastAccessedChapter;
            await progress.save();
        }
        
        res.json({ success: true, progress });
    } catch (error) {
        console.error('Failed to update progress:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Could not update progress' 
        });
    }
};

// Get all learning content
export const getAllContent = async (req, res) => {
    try {
        const content = await LearningContent.find().sort({ chapter: 1, order: 1 });
        res.json({ success: true, data: content });
    } catch (error) {
        console.error('Failed to get content:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Could not fetch content' 
        });
    }
};

// Get specific learning content
export const getContentById = async (req, res) => {
    try {
        const content = await LearningContent.findById(req.params.id);
        if (!content) {
            return res.status(404).json({ 
                success: false, 
                message: 'Content not found' 
            });
        }
        res.json({ success: true, data: content });
    } catch (error) {
        console.error('Failed to get content:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Could not fetch content' 
        });
    }
};

// Create new learning content
export const createContent = async (req, res) => {
    try {
        const newContent = new LearningContent(req.body);
        await newContent.save();
        res.status(201).json({ success: true, data: newContent });
    } catch (error) {
        console.error('Failed to create content:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Could not create content' 
        });
    }
};

// Update existing learning content
export const updateContent = async (req, res) => {
    try {
        const content = await LearningContent.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!content) {
            return res.status(404).json({ 
                success: false, 
                message: 'Content not found' 
            });
        }
        res.json({ success: true, data: content });
    } catch (error) {
        console.error('Failed to update content:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Could not update content' 
        });
    }
};

// Delete learning content
export const deleteContent = async (req, res) => {
    try {
        const content = await LearningContent.findByIdAndDelete(req.params.id);
        if (!content) {
            return res.status(404).json({ 
                success: false, 
                message: 'Content not found' 
            });
        }
        res.json({ success: true, data: {} });
    } catch (error) {
        console.error('Failed to delete content:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Could not delete content' 
        });
    }
};

// Initialize learning content with default chapters
export const populateLearningContent = async (req, res) => {
    try {
        const existingContent = await LearningContent.findOne();
        if (existingContent) {
            return res.status(400).json({ 
                success: false, 
                message: 'Learning content already exists. Use update endpoints to modify content.' 
            });
        }

        // Define the structure of all 12 chapters
        const chapters = [
            {
                title: "Introduction to Forex Trading",
                content: "Forex trading or foreign exchange trading is the process of buying one currency while simultaneously selling another. The forex market is the largest and most liquid financial market in the world as it has a daily trading volume that exceeds $6 trillion.\n\nIn this chapter, you'll learn the basics of forex trading, from how the market works, key terminology, and the factors that influence currency prices.",
                chapter: "1",
                order: 1,
                type: "text"
            },
            {
                title: "Understanding Currency Pairs",
                content: "Currency pairs are the foundation of forex trading. Each pair consists of two currencies, with the first currency (base currency) being bought or sold in exchange for the second currency (quote currency).\n\nMajor pairs include EUR/USD, GBP/USD, USD/JPY, and USD/CHF. These pairs have the highest trading volume and typically the tightest spreads.\n\nUnderstanding how to read currency pair quotes and calculate pip values is essential for successful trading.",
                chapter: "2",
                order: 2,
                type: "text"
            },
            {
                title: "Market Analysis: Fundamental vs Technical",
                content: "Forex traders use two main types of analysis to make trading decisions: fundamental analysis and technical analysis.\n\nFundamental analysis focuses on economic indicators, central bank policies, and geopolitical events that can affect currency values.\n\nTechnical analysis involves studying price charts and using various indicators to identify patterns and predict future price movements.\n\nSuccessful traders often combine both approaches to make informed decisions.",
                chapter: "3",
                order: 3,
                type: "text"
            },
            {
                title: "Technical Analysis: Chart Patterns",
                content: "Chart patterns are formations that appear on price charts and can signal potential market movements. Common patterns include:\n\n- Head and Shoulders: A reversal pattern indicating a potential trend change from bullish to bearish\n- Double Tops/Bottoms: Reversal patterns that form after an uptrend or downtrend\n- Triangles: Continuation patterns that can be ascending, descending, or symmetrical\n- Flags and Pennants: Short-term continuation patterns\n\nUnderstanding these patterns can help traders identify potential entry and exit points.",
                chapter: "4",
                order: 4,
                type: "text"
            },
            {
                title: "Technical Indicators",
                content: "Technical indicators are mathematical calculations based on price, volume, or open interest that help traders identify trends and potential trading opportunities.\n\nPopular indicators include:\n\n- Moving Averages (SMA, EMA): Help identify trends and potential support/resistance levels\n- Relative Strength Index (RSI): Measures the speed and change of price movements to identify overbought or oversold conditions\n- MACD (Moving Average Convergence Divergence): Helps identify trend direction and momentum\n- Bollinger Bands: Show volatility and potential overbought/oversold conditions\n\nUnderstanding how to use these indicators effectively is crucial for technical analysis.",
                chapter: "5",
                order: 5,
                type: "text"
            },
            {
                title: "Risk Management",
                content: "Risk management is perhaps the most important aspect of successful forex trading. It involves strategies to protect your trading capital and minimize losses.\n\nKey risk management principles include:\n\n- Position Sizing: Determining the appropriate amount to risk on each trade\n- Stop Loss Orders: Setting predetermined exit points to limit potential losses\n- Risk-Reward Ratio: Ensuring potential profits outweigh potential losses\n- Diversification: Not putting all your capital into a single trade or currency pair\n\nImplementing proper risk management strategies can help you survive in the forex market long enough to become profitable.",
                chapter: "6",
                order: 6,
                type: "text"
            },
            {
                title: "Trading Psychology",
                content: "Trading psychology refers to the emotional and mental state that influences trading decisions. It's often said that trading is 80% psychology and 20% strategy.\n\nCommon psychological challenges include:\n\n- Fear: Being afraid to take trades or cutting winning trades too early\n- Greed: Taking excessive risks or holding losing trades too long\n- Revenge Trading: Trying to recover losses by taking impulsive trades\n- Confirmation Bias: Only seeing information that confirms your existing beliefs\n\nDeveloping emotional discipline and a trading plan can help overcome these challenges.",
                chapter: "7",
                order: 7,
                type: "text"
            },
            {
                title: "Developing a Trading Strategy",
                content: "A trading strategy is a set of rules and guidelines that determine when to enter and exit trades. A good strategy should be:\n\n- Clearly defined: With specific entry and exit rules\n- Tested: Backtested on historical data and forward tested in a demo account\n- Consistent: Applied consistently across all trades\n- Adaptable: Able to adjust to changing market conditions\n\nYour strategy should align with your trading goals, risk tolerance, and time commitment. Remember that no strategy works all the time, but a well-developed strategy can be profitable over the long term.",
                chapter: "8",
                order: 8,
                type: "text"
            },
            {
                title: "Trading Platforms and Tools",
                content: "A trading platform is the software that connects you to the forex market. Popular platforms include MetaTrader 4/5, cTrader, and proprietary platforms offered by brokers.\n\nKey features to look for in a trading platform include:\n\n- User-friendly interface\n- Advanced charting capabilities\n- Multiple order types\n- Automated trading options\n- Mobile accessibility\n\nIn addition to a good platform, traders often use additional tools such as economic calendars, news feeds, and specialized indicators to enhance their trading decisions.",
                chapter: "9",
                order: 9,
                type: "text"
            },
            {
                title: "Advanced Trading Concepts",
                content: "As you progress in your trading journey, you'll encounter more advanced concepts such as:\n\n- Leverage and Margin: Understanding how borrowed funds can amplify both profits and losses\n- Swap Rates: The cost or benefit of holding positions overnight\n- Correlation: How different currency pairs move in relation to each other\n- Market Microstructure: The mechanics of how orders are matched and executed\n\nUnderstanding these concepts can help you make more informed trading decisions and manage risk more effectively.",
                chapter: "10",
                order: 10,
                type: "text"
            },
            {
                title: "Trading Styles and Timeframes",
                content: "Different traders prefer different trading styles and timeframes based on their personality, schedule, and risk tolerance.\n\nCommon trading styles include:\n\n- Scalping: Taking multiple small profits throughout the day\n- Day Trading: Opening and closing positions within the same day\n- Swing Trading: Holding positions for several days to weeks\n- Position Trading: Holding positions for weeks to months\n\nEach style has its advantages and disadvantages, and it's important to choose one that aligns with your goals and lifestyle.",
                chapter: "11",
                order: 11,
                type: "text"
            },
            {
                title: "Building a Trading Career",
                content: "Building a successful trading career requires dedication, continuous learning, and a long-term perspective. Key steps include:\n\n- Education: Continuously learning about markets, strategies, and psychology\n- Practice: Using demo accounts to test strategies without risking real money\n- Small Starts: Beginning with small position sizes to minimize risk while learning\n- Record Keeping: Maintaining a trading journal to track performance and identify areas for improvement\n- Networking: Connecting with other traders to share experiences and learn from their successes and failures\n\nRemember that becoming a consistently profitable trader takes time and patience. Focus on the process rather than short-term results.",
                chapter: "12",
                order: 12,
                type: "text"
            }
        ];

        await LearningContent.insertMany(chapters);
        res.status(201).json({ 
            success: true, 
            message: 'Learning content initialized successfully' 
        });
    } catch (error) {
        console.error('Failed to initialize content:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Could not initialize learning content' 
        });
    }
};
