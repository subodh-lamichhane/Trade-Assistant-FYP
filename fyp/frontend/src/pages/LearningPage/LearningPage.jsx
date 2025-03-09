import React, { useState } from 'react';
import './LearningPage.css';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/footer';
import Header from '../../components/header/header';
import { Link } from 'react-router-dom';

const chapters = [
    { 
        id: 1, 
        title: 'Market Fundamentals', 
        content: `
        Understanding market fundamentals is essential for any trader, whether you're new to the world of trading or an experienced professional. It forms the foundation of every decision you make in the market.

        **Supply and Demand:** The core principle of all financial markets is supply and demand. The price of an asset is determined by the balance between how much people are willing to buy and sell. If demand for a product is high and supply is low, prices will rise. Conversely, if supply exceeds demand, prices will fall.

        **Liquidity and Volatility:** Liquidity refers to how easily an asset can be bought or sold without impacting its price. High liquidity typically means low volatility, making it easier to trade without significant price swings. In contrast, low liquidity can lead to large price movements, increasing volatility.

        **Economic Indicators:** Economic data such as Gross Domestic Product (GDP), inflation rates, and interest rates play a significant role in shaping market conditions. A strong GDP generally signals a healthy economy, while high inflation can lead to reduced purchasing power and market instability. Understanding these indicators allows traders to make informed predictions about market movements and trends.
        `,
        image: require('../../assets/images/LearnToTrade/chapter1.jpg') 
    },
    { 
        id: 2, 
        title: 'Technical Analysis', 
        content: `
        Technical analysis involves studying past market data, primarily price and volume, to forecast future price movements. It is one of the most widely used methods of analysis by traders, as it helps to identify trends and patterns that may indicate future opportunities.

        **Chart Patterns:** Recognizing chart patterns is one of the core skills in technical analysis. For example:

        - *Head and Shoulders:* A pattern that signals a reversal of a trend. It consists of a peak (head) between two smaller peaks (shoulders). A breakdown below the neckline is a bearish signal.
        - *Triangles:* These can be ascending, descending, or symmetrical and typically indicate a consolidation phase. Traders watch for breakouts as a signal to enter a trade.
        - *Flags and Pennants:* These are continuation patterns. A flag appears as a small rectangle against the prevailing trend, while a pennant looks like a small symmetrical triangle.

        **Key Indicators:**
        - *Moving Averages (MA):* The average price of an asset over a set period of time. The most common are the 50-day and 200-day moving averages. Crossovers of these moving averages often signal potential buy or sell opportunities.
        - *RSI (Relative Strength Index):* A momentum oscillator that measures the speed and change of price movements. RSI values range from 0 to 100, with values over 70 typically indicating that an asset is overbought, and values below 30 suggesting that it is oversold.
        - *MACD (Moving Average Convergence Divergence):* A trend-following momentum indicator that shows the relationship between two moving averages. MACD crossovers are used to signal potential buy or sell opportunities.
        - *Bollinger Bands:* These bands are plotted two standard deviations above and below a moving average. Price moving outside these bands can indicate overbought or oversold conditions.

        **Candlestick Patterns:** Understanding candlestick patterns is essential in technical analysis. Each candlestick provides insights into the market's sentiment, whether bullish or bearish. Patterns like the *Doji*, *Engulfing*, and *Hammer* can help you gauge market psychology and predict potential price movements.
        `,
        image: require('../../assets/images/LearnToTrade/chapter2.jpg') 
    },
    { 
        id: 3, 
        title: 'Risk Management', 
        content: `
        Effective risk management is the key to preserving your capital and ensuring long-term success in trading. Without proper risk management, even the most knowledgeable traders can lose their entire account.

        **Risk Per Trade:** The most important rule in risk management is to never risk more than 1-2% of your total trading capital on a single trade. By limiting your risk per trade, you ensure that a few bad trades won't wipe out your account. This allows you to stay in the market longer and recover from losses.

        **Stop Loss & Take Profit:** A *Stop Loss* is an order placed to sell a security when it reaches a certain price, limiting your loss in a trade. Similarly, a *Take Profit* order automatically closes your position when the asset reaches a target price, locking in profits. Setting both of these orders is essential to controlling risk and ensuring that you don't let emotions dictate your decisions.

        **Risk-Reward Ratio (RRR):** This ratio is a measure of how much risk you're willing to take on a trade relative to the potential reward. For example, if you're risking $50 on a trade and your potential reward is $150, your risk-reward ratio is 1:3. A higher RRR means you're risking less for a potentially larger return.

        **Position Sizing:** Position sizing refers to determining the amount of capital to risk on each trade. To calculate your position size, you'll need to know your risk per trade, the distance between your entry price and stop loss, and the amount of capital in your account. Proper position sizing ensures that you stay within your risk tolerance.
        `,
        image: require('../../assets/images/LearnToTrade/chapter3.jpg') 
    },
    { 
        id: 4, 
        title: 'Trading Psychology', 
        content: `
        Trading psychology is one of the most overlooked aspects of trading. Understanding how emotions like fear, greed, and overconfidence affect decision-making is crucial for success in trading.

        **Emotional Control:** Traders often make impulsive decisions driven by emotions, such as buying in fear of missing out or selling out of panic during a market downturn. These decisions are usually detrimental. Developing emotional control helps you to stick to your strategy and avoid knee-jerk reactions.

        **Discipline & Patience:** A disciplined trader follows a well-defined trading plan and avoids deviating from it due to emotional impulses. Patience is also key, as some trades take longer to materialize, and it's essential not to chase quick profits or exit positions too soon.

        **Market Psychology:** Market psychology refers to the collective emotions of all participants in the market. Understanding market psychology helps traders recognize trends and patterns that reflect the collective sentiment of buyers and sellers. Sentiment analysis tools can also be used to gauge overall market mood.
        `,
        image: require('../../assets/images/LearnToTrade/chapter4.jpg') 
    },
    { 
        id: 5, 
        title: 'Advanced Strategies', 
        content: `
        Once you've mastered the basics of trading, you can explore more advanced strategies to refine your skills and improve your profitability.

        **Algorithmic Trading:** Algorithmic trading involves using computer algorithms to execute trades based on predefined criteria. This strategy allows for faster execution and can help eliminate human errors. Algorithms can be programmed to react to specific market conditions or execute trades based on technical indicators.

        **AI-Based Strategies:** Artificial Intelligence (AI) is transforming the trading landscape. AI-based strategies can analyze large datasets and detect patterns that may not be visible to the human eye. Machine learning models can predict price movements based on historical data, giving traders a potential edge in the market.

        **High-Frequency Trading (HFT):** High-frequency trading involves executing a large number of orders in fractions of a second. This strategy relies on advanced technology and algorithms to capitalize on small price movements. HFT is typically used by institutional traders due to the high costs and sophisticated infrastructure required.

        **Multiple Time Frame Analysis:** Multiple time frame analysis involves studying price action on different time frames to gain a broader perspective on the market. For example, a trader might analyze a long-term trend on a daily chart while using a shorter time frame, like the 15-minute chart, to pinpoint entry and exit points. This technique helps traders filter out noise and make more informed decisions.
        `,
        image: require('../../assets/images/LearnToTrade/chapter5.jpg') 
    }
];

const LearningPage = () => {
    const [currentChapter, setCurrentChapter] = useState(1);
    
    const nextChapter = () => {
        if (currentChapter < chapters.length) {
            setCurrentChapter(currentChapter + 1);
        }
    };

    const prevChapter = () => {
        if (currentChapter > 1) {
            setCurrentChapter(currentChapter - 1);
        }
    };

    return (
        <div className="learning-page">
            <Header />
            <Navbar />

            <div className="learning-container">
                <h1>Begin Your Trading Journey Today</h1>
                <h2>Chapter {currentChapter}: {chapters[currentChapter - 1].title}</h2>
                <p className="chapter-text">{chapters[currentChapter - 1].content}</p>
                
                <div className="chapter-content">
                    <img src={chapters[currentChapter - 1].image} alt={chapters[currentChapter - 1].title} className="chapter-image" />
                </div>

                <div className="chapter-navigation">
                    {currentChapter > 1 && (
                        <button onClick={prevChapter} className="prev-btn">Previous Chapter</button>
                    )}
                    {currentChapter < chapters.length ? (
                        <button onClick={nextChapter} className="next-btn">Next Chapter</button>
                    ) : (
                        <Link to="/home" className="finish-btn">Finish Learning</Link>
                    )}
                </div>
            </div>

            <hr className="section-divider" />
            
            <Footer />
        </div>
    );
};

export default LearningPage;
