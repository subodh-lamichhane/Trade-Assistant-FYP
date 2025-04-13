import React, { useState, useEffect, useRef } from 'react';
import './LearningPage.css';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/footer';
import Header from '../../components/header/header';
import { Link } from 'react-router-dom';
import axios from 'axios'; // Import axios for API calls

const chapters = [
    { 
        id: 1, 
        title: 'Introduction to Trading', 
        content: `
        Trading is the act of buying and selling financial instruments in different markets to profit from price changes. It differs from investing in its short-term nature and higher focus on timing and strategy.

        Types of Markets:
        - Forex (Foreign Exchange): The largest market, trading currencies in pairs (e.g., EUR/USD).
        - Stocks: Represent ownership in a company. Traded on stock exchanges.
        - Cryptocurrencies: Digital assets (e.g., Bitcoin, Ethereum) traded on crypto exchanges.
        - Commodities: Physical goods like gold, oil, and agricultural products.
        - Indices: Group of assets traded as a single unit (e.g., S&P 500).

        Market Participants:
        - Retail Traders: Individuals using online brokers.
        - Institutional Traders: Banks, hedge funds, asset managers.
        - Market Makers: Entities providing liquidity.
        - Brokers: Intermediaries that execute trades for clients.

        Why People Trade:
        - Speculation: Making money from price movements.
        - Hedging: Reducing risk exposure.
        - Portfolio Diversification: Balancing asset risk.

        Risks Involved:
        - Market Risk: Prices can move against you.
        - Leverage Risk: Amplifies both gains and losses.
        - Psychological Risk: Emotional trading can cause losses.
        `,
        image: require('../../assets/images/LearnToTrade/chapter1.jpg') // Add relevant picture
    },
    { 
        id: 2, 
        title: 'Understanding Forex, Stocks, and Crypto', 
        content: `
        Forex Market (Foreign Exchange):
        The Forex market is the most liquid financial market in the world, with a daily trading volume exceeding $7 trillion. It operates 24 hours a day, five days a week.

        How Forex Trading Works:
        - Currencies are traded in pairs, where one currency is exchanged for another (e.g., EUR/USD).
        - The first currency is the base currency, and the second is the quote currency.
        - Example: If EUR/USD is 1.1000, it means 1 Euro = 1.10 US Dollars.

        Types of Currency Pairs:
        - Major Pairs: Always include USD and are the most traded (e.g., EUR/USD, GBP/USD, USD/JPY).
        - Minor Pairs: Pairs that do not include USD but involve major currencies (e.g., EUR/GBP, AUD/JPY).
        - Exotic Pairs: Include one major and one emerging market currency (e.g., USD/TRY, EUR/THB).

        Pips and Lots:
        - Pip (Percentage in Point): Smallest price move (0.0001 for most pairs).
        - Lot Size:
          - Standard: 100,000 units
          - Mini: 10,000 units
          - Micro: 1,000 units

        Spread and Leverage:
        - Spread: Difference between bid and ask price. This is a broker’s fee.
        - Leverage: Allows trading larger volumes with smaller capital (e.g., 1:100 leverage).

        Stock Market:
        The stock market enables investors and traders to buy and sell shares of publicly listed companies.

        How Stock Trading Works:
        - When you buy a stock, you buy ownership in a company.
        - Share prices fluctuate based on company performance, economic conditions, and investor sentiment.

        Stock Exchanges:
        - NYSE (New York Stock Exchange): Largest in market capitalization.
        - NASDAQ: Known for tech-heavy listings.
        - Others include London Stock Exchange, Tokyo Stock Exchange, etc.

        Types of Stocks:
        - Blue-Chip Stocks: Stable companies with strong financials (e.g., Apple, Microsoft).
        - Growth Stocks: Companies expected to grow at an above-average rate.
        - Value Stocks: Priced below intrinsic value.
        - Penny Stocks: Low-priced and high-risk.

        Dividends and Earnings:
        - Some companies pay dividends, which are a share of profits.
        - Earnings Reports drive stock prices and provide insight into company performance.

        Cryptocurrency Market:
        Cryptocurrencies are digital assets that operate independently of central banks. They're decentralized and built on blockchain technology.

        How Crypto Trading Works:
        - Trading Pairs: BTC/USDT, ETH/BTC, etc.
        - Centralized Exchanges (CEX): Binance, Coinbase.
        - Decentralized Exchanges (DEX): Uniswap, PancakeSwap.

        Key Concepts:
        - Blockchain: Public ledger of transactions.
        - Wallets: Store crypto (hot wallets = online, cold wallets = offline).
        - Private Keys: Used to access your wallet; must be kept secure.

        Types of Cryptocurrencies:
        - Bitcoin (BTC): First and most valuable.
        - Altcoins: All other coins (e.g., Ethereum, Cardano, Solana).
        - Stablecoins: Pegged to a fiat currency (e.g., USDT, USDC).
        - Meme Coins: Shiba Inu, Dogecoin — driven by community hype.

        Risks and Volatility:
        - Crypto is extremely volatile. Prices can swing 10–50% in a day.
        - Subject to regulation and technological shifts.

        Market Hours:
        - Forex: 24/5 (Monday to Friday).
        - Stocks: 9:30 AM – 4:00 PM EST (US).
        - Crypto: 24/7 trading.

        Forex Sessions:
        - Sydney: 10 PM – 7 AM GMT
        - Tokyo: 12 AM – 9 AM GMT
        - London: 8 AM – 5 PM GMT
        - New York: 1 PM – 10 PM GMT
        `,
        image: require('../../assets/images/LearnToTrade/chapter2.jpg') // Add relevant picture
    },
    { 
        id: 3, 
        title: 'Trading Tools and Platforms', 
        content: `
        The right tools and platforms can be the difference between success and struggle in trading. This chapter covers how to choose a broker, essential platforms, charting tools, order types, news feeds, mobile trading apps, and other indispensable trading resources.

        Choosing the Right Broker:
        Your broker acts as the gateway between you and the market. The wrong choice can lead to high fees, slow executions, or even security risks.

        Key Broker Evaluation Criteria:
        - Regulation & Licensing:
          - Ensure your broker is regulated by a credible body (e.g., FCA, ASIC, CySEC, SEC).
          - Regulated brokers must comply with financial standards and client protection laws.
        - Trading Fees:
          - Spreads: The difference between the bid and ask price. Tight spreads reduce costs.
          - Commissions: Charged per trade, often on stock or crypto brokers.
          - Swap/Overnight Fees: Fees for holding trades overnight in Forex.
        - Account Types:
          - Standard, ECN, Islamic Accounts—each with unique fee structures and spreads.
          - Demo accounts allow practicing without real money.
        - Customer Service:
          - Access to support via live chat, email, or phone—especially important during volatile times.
        - Available Instruments:
          - Make sure the broker offers all the markets you wish to trade (Forex, Stocks, Crypto, Commodities).

        Popular Trading Platforms:
        A trading platform is the software you use to view the markets, analyze prices, place orders, and manage trades.

        - MetaTrader 4 (MT4) and MetaTrader 5 (MT5):
          - MT4: Forex-focused, highly stable, vast library of custom indicators and Expert Advisors (EAs).
          - MT5: Supports more asset classes, improved order management, economic calendar integration.
          - Features:
            - Real-time quotes
            - Multiple timeframes
            - Indicator and strategy support
            - Mobile app versions
        - TradingView:
          - Best for chart analysis, community strategies, and scripting with Pine Script.
          - Excellent for Crypto, Stocks, Forex charts.
          - Can connect to brokers for live trading.
        - Web-Based Broker Platforms:
          - Many brokers provide their own platforms with embedded tools and news feeds.
          - Examples: eToro, IG, OANDA, Interactive Brokers.

        Essential Order Types:
        Understanding how to place and manage orders is crucial to your execution and risk control.

        Common Order Types:
        - Market Order:
          - Buys/sells immediately at current price.
          - Use when immediate entry or exit is needed.
        - Limit Order:
          - Executes only at your target price or better.
          - Great for entering pullbacks or minimizing slippage.
        - Stop Order (Stop Market):
          - Triggers a market order when price hits your specified level.
          - Used to catch breakouts or protect against losses.
        - Stop-Loss & Take-Profit:
          - Automatically close your trade at a pre-defined loss or gain.
          - Key for disciplined risk management.
        - Trailing Stop:
          - Moves with the market, locking in profits while allowing the trade to run.

        Economic Calendars:
        Markets react to economic news. An economic calendar helps you anticipate high-impact events.

        What to Watch For:
        - Central Bank Announcements (e.g., Fed, ECB)
        - Non-Farm Payrolls (NFP)
        - CPI and Inflation Reports
        - Interest Rate Decisions
        - GDP Reports

        Charting Tools & Indicators:
        Charting is a trader’s map. Good tools help spot trends, reversals, entries, and exits.

        Key Chart Types:
        - Candlestick: Most common—shows open, high, low, close.
        - Line Chart: Connects closing prices—good for simplicity.
        - Bar Chart: Similar to candles but harder to read quickly.

        Must-Know Tools:
        - Drawing Tools: Trendlines, channels, Fibonacci, rectangles.
        - Technical Indicators: RSI, MACD, Bollinger Bands, Moving Averages.
        - Volume Tools: OBV, Volume Profile, VWAP.

        Mobile Trading Apps:
        Modern traders often monitor markets on the go. Mobile apps should mirror the functionality of desktop platforms.

        Popular apps:
        - MT4/MT5 Mobile
        - TradingView App
        - Binance App (Crypto)
        - Interactive Brokers App
        - Thinkorswim by TD Ameritrade

        News & Sentiment Analysis Tools:
        Sentiment can drive short-term price action. Keeping up with headlines helps contextualize moves.

        Top Sources:
        - Bloomberg
        - Reuters
        - CNBC
        - Twitter (FinTwit traders & analysts)
        - Reddit (r/WallStreetBets, r/CryptoCurrency)

        Automation and Scripting Tools:
        As traders grow, automation becomes a powerful advantage.

        - Expert Advisors (EAs): Auto-execute trades based on coded rules (MT4/MT5).
        - Trading Bots: Widely used in Crypto (e.g., 3Commas, Pionex).
        - Custom Scripts: On TradingView (Pine Script) or Python-based bots.
        `,
        image: require('../../assets/images/LearnToTrade/chapter3.jpg') // Add relevant picture
    },
    { 
        id: 4, 
        title: 'Core Trading Concepts', 
        content: `
        Trading isn’t just about clicking buy and sell — it’s about understanding how price behaves, why it behaves that way, and how to anticipate its next move. This chapter introduces core market structures, candlestick theory, leverage, and the psychology that separates successful traders from emotional ones.

        Market Structure: The Language of Price:
        Understanding how the market moves is the first step to knowing where to enter and exit.

        Uptrend:
        - Higher Highs (HH) and Higher Lows (HL)
        - Indicates bullish market sentiment.
        - Strategy: Buy the dips (pullbacks).

        Downtrend:
        - Lower Lows (LL) and Lower Highs (LH)
        - Indicates bearish market sentiment.
        - Strategy: Sell the rallies.

        Ranging Market (Consolidation):
        - Price bounces between support and resistance.
        - Strategy: Buy low, sell high — or wait for breakout.

        Support and Resistance (S&R):
        These are horizontal levels where price tends to bounce or break.
        - Support: A level where price often stops falling and reverses upward.
        - Resistance: A level where price often stops rising and reverses downward.

        Tips:
        - The more times a level is tested, the stronger it becomes.
        - Support can become resistance (and vice versa) after a breakout.

        Trends, Pullbacks, and Breakouts:
        - Trend: A sustained directional move (up or down).
        - Pullback: A temporary reversal against the trend — a chance to enter at better prices.
        - Breakout: When price moves beyond a consolidation zone or a key S&R level.

        Breakout Confirmation:
        - Retest of the broken level
        - High volume
        - Candlestick confirmation (engulfing, strong close, etc.)

        Candlestick Basics:
        Candlesticks display the open, high, low, and close (OHLC) of price within a specific timeframe.

        Anatomy of a Candle:
        - Body: Distance between open and close.
        - Wick/Shadow: High and low.
        - Bullish Candle: Close > Open (typically green or white).
        - Bearish Candle: Close < Open (typically red or black).

        Timeframes:
        - A 1H candle shows 1 hour’s price action.
        - A Daily candle shows the entire day’s movement.

        Key Candlestick Patterns:
        Bullish Patterns:
        - Hammer: Reversal after a downtrend. Long wick, small body at top.
        - Bullish Engulfing: Big bullish candle covers the previous small bearish one.
        - Morning Star: 3-candle reversal pattern.

        Bearish Patterns:
        - Shooting Star: Reversal after an uptrend. Long upper wick, small body at bottom.
        - Bearish Engulfing: Big bearish candle engulfs a smaller bullish one.
        - Evening Star: 3-candle reversal from bullish to bearish.

        Leverage and Margin:
        Leverage allows you to control a large position with a small amount of capital — but it increases both profit and risk.
        - 1:100 Leverage: Every $1 you trade controls $100 in the market.
        - Margin: The amount you must keep in your account to maintain a leveraged position.

        Margin Call:
        - If your trade goes against you and your balance drops below a certain threshold, the broker may close your trade or request more funds.

        Risk Tip:
        - Use leverage responsibly — it’s better to grow slowly than to blow up quickly.

        Risk Management Essentials:
        Even great strategies fail without risk control.

        Tools:
        - Stop-Loss (SL): Predefined level to exit a losing trade.
        - Take-Profit (TP): Predefined level to lock in profit.
        - Risk-to-Reward Ratio (RRR): Risk 1 to make 2+ is ideal.

        Golden Rules:
        - Never risk more than 1-2% of your account on a single trade.
        - Always use SL/TP — never “hope and hold.”

        Psychology of Trading:
        This is the invisible factor that separates professionals from amateurs.

        Emotional Traps:
        - Revenge Trading: Overtrading to recover losses.
        - Fear of Missing Out (FOMO): Entering late, chasing price.
        - Fear of Losing: Not taking valid setups.

        Winning Mindset:
        - Detach emotionally from trades.
        - Think in probabilities — not certainties.
        - Accept losses as part of the business.

        Keep a Trading Journal:
        - Track every trade: entry, exit, reasoning, emotion.
        - Review weekly to refine your system.

        Quick Reference Checklist Before Taking a Trade:
        - Is the market trending or ranging?
        - Have I identified support and resistance?
        - Is there a candlestick pattern or price action signal?
        - Do I have my stop-loss and take-profit planned?
        - Am I risking no more than 2% of my account?
        - Am I emotionally neutral?
        `,
        image: require('../../assets/images/LearnToTrade/chapter4.jpg') // Add relevant picture
    },
    { 
        id: 5, 
        title: 'Introduction to Charting and Smart Money Concepts (SMC)', 
        content: `
        Welcome to the next level of your trading education. Now that you understand how markets move and how to read basic candlesticks, it’s time to uncover the hidden forces that drive price. Many retail traders focus only on indicators and patterns. But to gain a true edge, you must learn to see how Smart Money — the institutions, banks, and big players — manipulates and moves the market.

        Understanding Charts: More Than Just Candles:
        Charts are the trader’s battlefield. While candlesticks tell the story of price in each time period, the entire chart gives you the bigger picture — market context, structure, and opportunity.

        - Candlestick charts remain the gold standard because they show the full scope of price behavior.
        - Learning to use multiple timeframes is key. For example:
          - Identify a trend on the 1-hour chart.
          - Find entry confirmations on the 15-minute chart.
          - Manage risk using the 5-minute chart.

        Another vital tool in charting is the trendline, which helps define direction and possible breakout points. Trendlines, however, can be subjective. This is where SMC principles start to reshape your thinking: instead of guessing where price might go, you’ll learn to understand where price must go — because of how the markets are structured to fill orders.

        What is Smart Money?
        Smart Money refers to the large financial institutions — banks, hedge funds, market makers — that possess deep liquidity and superior data. These entities don’t simply buy and sell impulsively. They engineer liquidity through manipulation, drawing retail traders into traps in order to execute their own massive positions without slippage.

        - Retail traders often lose because they chase breakouts, buy highs, or place obvious stop-losses.
        - By studying SMC, you learn how to follow the footprints of institutional players rather than fighting against them.

        The Concept of Liquidity:
        Liquidity is the fuel of the markets. Smart Money needs it to enter and exit trades efficiently. But where does liquidity come from? Stop-losses.

        - Stop-losses below support or above resistance create liquidity pools — ideal places for Smart Money to enter trades.
        - Price often spikes below support (a stop hunt), grabs liquidity, and reverses in the original direction.

        Market Structure Revisited: The SMC Way:
        In SMC, market structure goes deeper than just HHs and LLs. We focus on:
        - Break of Structure (BOS): When price breaks a significant swing high or low — confirms a shift in trend.
        - Change of Character (CHOCH): The first sign that a trend might be reversing. CHOCH usually precedes BOS.
        - Internal Structure: Micro-movements within the larger structure. Crucial for precise entries.

        Example:
        - If the market is making lower lows (bearish), but then breaks a recent lower high, that’s a CHOCH — a hint that bulls may be taking control.
        - If a BOS follows in the opposite direction, we now look for a long (buy) setup.

        Order Blocks (OBs): Where Institutions Trade:
        Order Blocks are one of the most powerful tools in SMC. An Order Block is the last opposite candle before a strong move. It marks where institutions entered large positions.

        Types of Order Blocks:
        - Bullish Order Block (Buy OB): The last bearish candle before a sharp bullish move.
        - Bearish Order Block (Sell OB): The last bullish candle before a sharp bearish move.

        Valid OBs:
        - A clear market structure break after the OB.
        - Imbalance (a price gap).
        - Confluence with other levels (Fibonacci, S&R, psychological levels).

        Imbalance (Fair Value Gaps):
        Imbalance, also known as Fair Value Gaps (FVGs), occurs when price moves too quickly in one direction, leaving a price void. Smart Money tends to revisit these gaps to rebalance the market.

        - Imbalances occur between three candles:
          - Candle 1: Normal size.
          - Candle 2: Strong impulsive move.
          - Candle 3: Doesn’t fill the full range of Candle 1.

        Building a Basic SMC Setup:
        Here’s how all these concepts start working together:
        - Determine Market Structure: Trend, CHOCH, BOS.
        - Identify Liquidity Pools: Above highs, below lows.
        - Wait for Manipulation: Price grabs liquidity.
        - Find the Order Block + Imbalance Zone.
        - Enter on Confirmation: Rejection, candle pattern, or internal BOS.
        - Set SL Below OB, TP at next structure level.

        This is the foundation of precision trading. It’s not about reacting — it’s about predicting why price will move based on institutional behavior.
        `,
        image: require('../../assets/images/LearnToTrade/chapter5.jpg') // Add relevant picture
    },
    { 
        id: 6, 
        title: 'ICT Concepts & Time-Based Trading', 
        content: `
        In the previous chapter, we explored the foundational ideas behind Smart Money Concepts — how the market is structured by institutional players, and how you can follow their footprints. Now, we’ll go deeper and uncover the teachings of ICT (Inner Circle Trader), one of the most influential figures in the trading education space.

        ICT builds on Smart Money principles but places significant focus on timing, daily cycles, and precision entries. Understanding ICT concepts will help you move beyond structure alone and teach you how to trade with sniper-like accuracy.

        What is ICT?
        Michael J. Huddleston, known online as ICT, teaches institutional trading strategies that revolve around liquidity, time of day, market makers, and the concept of the daily dealing range. His teachings are structured around how price is delivered each day in a controlled, repeatable way.

        ICT believes that the market is not random — it is governed by algorithms that deliver price to areas of liquidity with high precision. Traders who learn to anticipate these movements based on time and structure can trade with high reward and low risk.

        The Importance of Time in Trading:
        One of ICT’s most powerful teachings is time-based trading. Instead of blindly trading 24/7, ICT focuses on Kill Zones — specific times during the trading day when institutional activity is at its highest.

        Here are the main kill zones:
        - London Kill Zone (2 AM – 5 AM EST): Best time to catch the London session move.
        - New York Kill Zone (7 AM – 10 AM EST): Overlaps with London; creates high volatility.
        - New York Lunch (11 AM – 1 PM EST): Typically a consolidation period.
        - PM Session / Reversal Time (1 PM – 3 PM EST): Great for reversals and late-day entries.

        Trading outside these windows can be risky due to lower volume and less institutional participation.

        The Daily Dealing Range:
        The market tends to move within a daily high and low range, and institutions often seek to engineer liquidity on both sides of this range. The process usually looks like this:
        - Price takes out the previous day’s low or high (liquidity grab).
        - Market creates a reversal and targets the opposite side of the range.
        - Smart Money enters within this manipulation and rides the real move.

        ICT teaches that false breaks of previous highs/lows are key manipulation signals — these are your clues that a setup is forming.

        For example: If price makes a sharp move below the previous day’s low during the London session, then reverses during the New York Kill Zone, this is a classic ICT long setup.

        Market Structure Shift & Entries:
        ICT entries are based on a combination of market structure shift and time confirmation.

        Here’s a basic ICT entry model:
        - Identify Liquidity Sweep: Price takes out a key high or low (engineered move).
        - Wait for Market Structure Shift (MSS): Price breaks structure in the opposite direction.
        - Fair Value Gap (FVG) Entry: Enter when price returns to fill the imbalance created during the impulsive MSS.

        SL goes just beyond the liquidity sweep, and TP is set at the next high-probability liquidity pool or structure level.

        This method combines:
        - Direction (based on time and liquidity)
        - Entry logic (MSS + FVG)
        - Risk control (tight SL behind manipulation)

        Daily Bias & Narrative Building:
        Before you even look for entries, ICT emphasizes the need to build a daily bias. This means forming a narrative around where the market is likely to go, based on:
        - Higher time frame structure
        - Previous day high/low
        - Liquidity pools
        - News events
        - Time of day

        You should never just trade what you see on the 5-minute chart. Always ask yourself: What is the story behind today’s price action? Are institutions likely to drive price up or down? Where is the liquidity?

        Having a directional bias gives you context, and context makes your entries far more accurate.

        Dealing Ranges, Judas Swings & Power of Three:
        ICT often talks about the Power of Three, which breaks down price delivery into three key phases within a session:
        - Accumulation (Consolidation): Price moves sideways to gather orders.
        - Manipulation (Judas Swing): False move in one direction to trap traders.
        - Distribution (True Move): Price moves in the intended direction.

        This happens on all timeframes, but is most powerful when it aligns with kill zones and liquidity grabs.

        The Judas Swing is particularly important. It’s the fake move that tricks retail traders. If you recognize this manipulation, you can enter just as Smart Money does — on the reversal that follows.

        Building an ICT Setup:
        Here’s how to approach an ICT trade step by step:
        - Identify Kill Zone – Focus on London or New York.
        - Mark Previous Day’s High & Low – Key liquidity targets.
        - Wait for a Liquidity Sweep – Trap traders.
        - Watch for MSS – Structure shift in the opposite direction.
        - Entry on FVG – Price returns to imbalance zone.
        - SL Behind Sweep, TP at Liquidity – Tight risk and high R:R.

        This framework may sound complex, but with practice, it becomes second nature. You’ll begin to see patterns you never noticed before — engineered moves designed to trick the majority.
        `,
        image: require('../../assets/images/LearnToTrade/chapter5.jpg') // Add relevant picture
    },
    { 
        id: 7, 
        title: 'Precision Entries and Execution Models', 
        content: `
        Now that you understand how the market is structured, how liquidity is hunted, and how Smart Money leaves its footprints, it’s time to dive into one of the most important aspects of trading: entries.

        A trader may have the right idea, the correct direction, and even the best setup — but if the entry is mistimed or placed in a poor location, the trade often ends in a loss. In this chapter, we’re going to break down how to refine your entries using structure, time, and confirmation, so that you're executing like a professional — not gambling like a retail trader.

        🎯 The Art of Precision:
        Precision in trading means entering only when the market confirms your idea with clear signs. It's not just about catching a move — it’s about knowing when and where to enter with minimal risk and maximum reward.

        You want your entries to occur:
        - After liquidity has been swept
        - After a market structure shift (MSS)
        - Into a Fair Value Gap (FVG) or Order Block (OB)
        - During a key time window like the London or New York Kill Zone

        The goal is to align structure, time, and confirmation — and only then act.

        🔄 Market Structure Shift (MSS):
        A Market Structure Shift signals that Smart Money has changed direction. You’ll often see price take out a high or low (liquidity sweep), and then break the most recent structural point in the opposite direction. This break confirms the new intent.

        For instance, if price makes a series of lower lows and lower highs (a downtrend), then sweeps a previous low, but suddenly breaks above the last lower high — that’s a bullish structure shift.

        This is one of the clearest ways to confirm a reversal. But always remember: no liquidity grab = no valid MSS.

        📉 Fair Value Gaps (FVG):
        A Fair Value Gap is a price imbalance left behind after an aggressive move. It's often created by institutions executing massive orders that push price quickly in one direction, leaving behind a gap between candles that never gets filled properly.

        This gap represents an inefficiency. Institutions often come back to these zones later to “rebalance” price — and that’s your entry point.

        After a confirmed MSS, wait for price to pull back into the FVG and look to enter in the direction of the break.

        FVGs are clean, simple, and extremely effective.

        🧱 Order Blocks (OB):
        Order Blocks are the last candles before a major institutional move. They’re powerful zones of interest, but not all OBs are equal.

        Valid Order Blocks should:
        - Form after a liquidity sweep
        - Be followed by a strong, impulsive move
        - Lead to a break of structure

        You don’t want to enter blindly on any OB. Instead, refine your entry — for example, by targeting the 50% level of the candle, or combining the OB with a Fair Value Gap for extra confluence.

        🧭 Putting It All Together: The Entry Sequence:
        Here’s a simple flow to follow for a textbook entry:
        - Mark Liquidity Zones – Use previous day highs/lows or clear swing points.
        - Wait for a Sweep – Watch for a sharp move that clears stops.
        - Confirm the MSS – A break of structure after the sweep.
        - Identify FVG or OB – Use the impulsive move to mark your zone.
        - Refine the Entry – Set a limit order at the zone or wait for a reaction.
        - Manage Risk – Place your stop behind the sweep; never inside the zone.
        - Target Liquidity – Use clean highs/lows, opposing OBs, or session levels.

        This approach keeps you mechanical and disciplined. You’re not reacting emotionally — you’re waiting for the market to show you exactly what it wants to do, and only then stepping in.

        📈 Types of Entries: Conservative vs. Aggressive:
        There are two primary ways to enter the market using this model:
        - Aggressive Entry: Set a limit order at the FVG or OB and wait for the price to fill it. This gives the best reward-to-risk but comes with the risk of missing the trade if price doesn't return.
        - Conservative Entry: Wait for price to return to the zone, then look for a smaller internal MSS or confirmation candle before entering. This offers more assurance, but your entry may not be as tight.

        There’s no one-size-fits-all. Some traders prefer tighter entries for higher R:R, while others prefer more confirmation to build confidence. The key is to stay consistent with whichever method you choose.

        🔐 Stop Loss and Target Placement:
        For precision entries, your stop loss should always be placed behind the liquidity sweep. Don’t put it inside the FVG or OB — that’s where the Smart Money often comes to fill before making the move.

        Targets, on the other hand, should be logical liquidity points:
        - Equal highs/lows
        - Previous session highs/lows
        - Opposing OBs or unfilled FVGs
        - Institutional levels (e.g., daily open, weekly high)

        Never target random price levels. Let the market guide you.

        🧠 Multi-Timeframe Execution:
        One of the most powerful tactics is to use multiple timeframes for confirmation and execution.

        Here’s how:
        - Use the 4H or 1H chart to identify the narrative and key OB/FVG zones.
        - Use the 5M or 1M chart to wait for the MSS and refined entry.

        This way, your trade follows Smart Money logic on the higher timeframe, but enters with sniper precision on the lower timeframe.

        This alignment gives you both context and precision.

        📚 Real-World Example: NY Session Long:
        Imagine it’s the New York Kill Zone:
        - Price sweeps the London session low (liquidity taken).
        - A bullish MSS occurs on the 5M chart.
        - An FVG appears after the break.
        - Price returns to that FVG during the NY session.
        - You enter long with SL below the London low.
        - Your target is the previous day’s high.

        This trade hits every condition — sweep, structure shift, FVG, timing — all in harmony.
        `,
        image: require('../../assets/images/LearnToTrade/chapter5.jpg') // Add relevant picture
    },
    { 
        id: 8, 
        title: 'Reading the Market in Real Time', 
        content: `
        Execution models and smart money concepts give us a powerful foundation — but true mastery comes from being able to adapt to the market as it’s moving. In this chapter, we explore how to read live price action, refine your narrative as the session unfolds, and spot opportunities the moment they appear — not just in hindsight.

        This is where theory meets practice. Let’s bridge that gap.

        🧠 The Market is a Story:
        Every candle is a sentence. Every session is a paragraph. Every week, a chapter. And the full price chart? That’s the entire story.

        To read the market in real time, you must train your eyes to understand this ongoing story.

        Ask yourself:
        - Who is in control? (Buyers or sellers)
        - Where is liquidity being built?
        - Has a major level been swept?
        - Are we trending or ranging?
        - Has structure shifted?

        The answers will constantly evolve — so your bias must be dynamic, not fixed. You're not here to predict; you're here to respond with structure-based logic.

        🔄 Real-Time Structure Monitoring:
        In live conditions, market structure may shift quickly. The key is to react, not anticipate. Here's how to spot changes in real time:
        - Trend Continuation: Price pulls back to a FVG/OB and resumes its trend.
        - Trend Reversal: A key low/high is swept, then price breaks previous structure in the opposite direction.
        - Ranging Market: Equal highs and lows are building; no strong push in either direction.

        When structure shifts, you update your bias and get ready for potential entries.

        🕐 Kill Zones and Timing Windows:
        One of the most important tools in live reading is understanding time-based behavior. Markets tend to behave differently at different times of the day.

        - London Kill Zone (2 AM – 5 AM EST): Often provides the initial daily move and liquidity sweep.
        - New York Kill Zone (8 AM – 11 AM EST): Common for reversals or continuations.
        - Lunch Time (12 PM – 1:30 PM EST): Often flat or choppy. Avoid.
        - New York Close (3 PM – 4 PM EST): Final push of the day; sometimes volatility spike.

        Align your strategy with these rhythms. For example:
        - During London: Look for the sweep of Asia highs/lows and a structural shift.
        - During New York: Watch for the sweep of London liquidity and a continuation or reversal.

        👁️ Live Price Action Behaviors to Watch:
        In real time, price will "talk" to you. Here are some key behaviors to recognize instantly:
        - Fast, Aggressive Moves into Liquidity: Traps traders, often reverses.
        - Slow Grind to a Level: Builds up stops, often leads to explosive breakout.
        - Wicks with No Follow-Through: Signs of rejection.
        - Multiple Rejections at One Level: Liquidity building — likely to be swept.
        - One Candle Momentum Shifts: Watch for engulfing candles or displacement.

        These subtle signs separate pros from beginners. Train your eyes to spot them without hesitation.

        📉 Example: Real-Time Breakdown (Scenario-Based):
        Let’s walk through a common real-time situation:
        - You begin watching during London Kill Zone.
        - Price slowly grinds downward, builds a triple bottom (equal lows).
        - You mark the lows as sell-side liquidity.
        - At 4 AM EST, price spikes down, takes the lows with a big wick — then instantly rebounds.
        - A 5M candle breaks above the last lower high (MSS).
        - An FVG forms on the return — price pulls back into it during NY session.
        - You enter long at the FVG.
        - Your stop is under the wick that swept the liquidity.
        - Your target is the previous day’s high.

        This entire setup formed from real-time reaction — not prediction. You followed structure, liquidity, timing, and confluence.
        `,
        image: require('../../assets/images/LearnToTrade/chapter5.jpg') // Add relevant picture
    },
    { 
        id: 9, 
        title: 'Advanced Trade Management – Mastering the Art of the Exit', 
        content: `
        Once you're in a trade, the real game begins. Many traders obsess over entries but forget that your exit determines your profit — not your entry.

        Smart trade management isn't about reacting emotionally to price. It's about having a plan before you click buy or sell, and adapting it with logic as the trade plays out.

        🎯 Why Trade Management Matters:
        Let’s say two traders take the exact same entry:
        - Trader A gets scared, closes early for a small win.
        - Trader B holds too long, turns a profit into a loss.
        - Trader C takes partial profits at smart levels, moves stop to break-even, and exits clean.

        Same entry. Three completely different results. This is the power of trade management — it separates lucky trades from consistent performance.

        🧩 Components of Trade Management:
        Initial Stop Loss Placement:
        Always place your stop where your idea is invalidated — not just randomly below/above a candle.

        Common placements:
        - Below/above liquidity sweep
        - Below/above order blocks or FVGs
        - Below/above previous market structure points (e.g., BOS)

        Take Profit Zones:
        Choose your TP levels based on:
        - Liquidity pools (equal highs/lows)
        - Fair value gaps
        - Imbalanced zones
        - Previous highs/lows
        - External structure or HTF POIs

        The best POIs have multiple confluences — for example, an OB inside an FVG at a session open. Once marked, these levels become your targets for entries or exits.

        Risk-to-Reward Ratio (R:R):
        - Never enter a trade with less than 1:2 R:R.
        - Ideally aim for setups with 3R or higher.
        - Better management = higher R:R with lower stress.

        🔪 Scaling In and Scaling Out:
        Scaling In:
        Adding more positions after your entry — only if the setup strengthens.

        Use scaling only when:
        - Price forms new confirmations (e.g., internal BOS or FVG respected)
        - Risk is still managed across the entire position

        Scaling Out (Partial Profit-Taking):
        Taking part of your position off the table at logical points.

        Examples:
        - Close 50% at 1R, 25% at 2R, and let 25% run
        - Close 70% at a major liquidity zone, trail the rest

        This locks in profits and protects your emotional capital.

        🛡️ Stop Loss Management: The Right Way:
        1. Move to Break-Even (B/E):
        Once the trade hits 1R or clears a structural level, move your stop to entry.
        - Reduces risk, but can sometimes kick you out of winning trades if done too early.

        2. Trailing Stop:
        Trail your stop below/above swing points, FVGs, or BOS as price moves in your favor.
        - Use this in trending markets, not choppy ones.

        3. Dynamic SL Adjustment:
        If the market shifts, don’t hesitate to tighten or widen your stop — if it aligns with structure.
        - Never adjust based on emotion.

        ⏱️ Time-Based Management:
        Sometimes, trades don’t go anywhere. That’s a problem too.

        If your setup hasn’t played out within your session (e.g., London or NY), consider closing.

        Time is a form of risk. The longer you sit in a trade that isn’t working, the more likely it is to turn.

        🧠 Advanced Exit Tactics:
        The Liquidity Tag Exit:
        If price approaches a known liquidity pool (e.g., equal highs), consider exiting fully — especially if:
        - Speed increases
        - You see a sharp rejection
        - Volume spikes

        The Shift Exit:
        If structure shifts against your position on the lower timeframe (e.g., bullish → bearish), close the trade.
        - No ego. Exit clean, reassess later.

        The "Kill It" Rule:
        Set a hard rule: “If I see X, I’m out.”
        - e.g., Close below OB, break of minor structure, breach of a 1H level.

        This reduces hesitation in fast-moving conditions.

        📓 Real-World Scenario: Managing a NY Session Trade:
        - Entry: You enter long at a 5M FVG during the NY Kill Zone after a liquidity sweep.
        - SL: You place your stop just under the low of the sweep (tight, clean invalidation).
        - TP1: Set at internal liquidity (1.5R).
        - TP2: Set at external swing high (3R).
        - Plan: Once TP1 is hit, you move SL to break-even and let the rest ride.
        - Outcome: Price hits TP2, you close the rest after a wick rejection.

        Result: Emotionless execution. Solid profits. High-quality journaling data.
        `,
        image: require('../../assets/images/LearnToTrade/chapter5.jpg') // Add relevant picture
    },
    { 
        id: 10, 
        title: 'Sniper Entries – The Science of Precision Entry Timing', 
        content: `
        Entry is everything. A well-timed entry gives you a tighter stop loss, higher risk-to-reward, and more confidence. When you enter late or emotionally, you either overextend yourself or get wicked out. This chapter breaks down how the best traders wait, strike, and only take trades with edge.

        🎯 What Makes a Sniper Entry?
        A sniper entry is not just a random candle tap or FOMO trigger — it's an entry built on confluence, structure, timing, and understanding of liquidity.

        Your sniper entry checklist should always include:
        - Higher Timeframe Bias
        - Liquidity Event (Sweep / Break)
        - Valid Internal Structure Shift (BOS/CHoCH)
        - Refined Entry Zone (FVG / OB / EQH-EQL)
        - Killzone Timing (e.g., NY or London)
        - Confirmation (Price reacts cleanly to POI)

        🧭 Session-Based Entry Timing:
        Different sessions offer different trading conditions. Entries should be aligned with when the market is most liquid and volatile.

        📍 Killzones:
        - London Killzone: 7 AM – 10 AM GMT
        - New York Killzone: 7 AM – 10 AM EST
        - Asia Session (less aggressive): 11 PM – 3 AM GMT

        During Killzones, market makers are active, and liquidity grabs and reversals are common. These are your golden zones to hunt entries.

        Tip: Don’t enter during the first 5–15 mins of a session open — wait for the trap or sweep.

        🔍 Liquidity Sweeps as Entry Triggers:
        Smart entries often come after liquidity has been taken. Market makers seek to hunt stop-losses before true direction.

        Example:
        - Market is bullish.
        - Price dips below an old low (equal lows or previous daily low).
        - Then, structure shifts back up — this is your confirmation.

        "Don’t buy support. Buy the stop hunt below support."
        — Sniper mindset

        🧱 Refined Entry Zones: FVGs and OBs:
        Once liquidity is swept, price often pulls back into a refined Point of Interest (POI) such as:
        - Fair Value Gap (FVG): An imbalance left by a fast price move
        - Order Block (OB): Last bullish/bearish candle before a strong move

        These zones give tight and effective entries when paired with structure.

        Entry Tip:
        - Wait for a clean reaction in the POI zone (e.g., rejection wick or BOS on lower timeframe).
        - Set limit entry inside the POI + stop below its low/high.

        📐 Timeframe Confluence: Top-Down Precision:
        Your entry should align across multiple timeframes:
        - HTF (1H/4H): Determines bias (bullish/bearish)
        - MTF (15M/5M): Identifies key zones (OB, FVG, liquidity)
        - LTF (1M/3M): Provides sniper execution (CHoCH, BOS, wick reaction)

        Example Flow:
        - 1H is bullish, price forming higher lows.
        - 15M sweeps liquidity + forms FVG.
        - 1M breaks structure → enter on pullback.

        🧠 Entry Confidence Models (ICT-Based):
        Some ICT-inspired entry setups:
        1. Breaker Block Entry:
           - Price breaks structure
           - Comes back to breaker block (a broken OB)
           - Rejection → enter

        2. Judas Swing + Reversal:
           - Session starts with a fake move (Judas)
           - Price reverses, BOS confirms real direction
           - Enter on pullback

        3. Liquidity Sweep + FVG Tap:
           - Stop hunt below key low
           - BOS on 1M
           - Enter on retrace to FVG

        Each model is a tool — master them and apply based on context.

        ⏳ The Importance of Patience:
        Most traders lose money not because their analysis is wrong — but because they enter too early or too late.
        - Let the trap form.
        - Let the liquidity get swept.
        - Let structure confirm.
        - Then pull the trigger.

        You’re not a sniper if you shoot randomly.

        📓 Real Trade Example:
        Bias: Bullish on 1H. Price approaching previous daily low.

        Plan:
        - Wait for sweep of daily low during NY session
        - Look for 1M BOS post-sweep
        - Enter on retrace to FVG inside 5M OB
        - TP: Return to premium range + break of 4H swing high
        - SL: Just below 1M BOS candle

        Result: Entry within 2 pip precision. 1:6 R:R. Clean and controlled.
        `,
        image: require('../../assets/images/LearnToTrade/chapter5.jpg') // Add relevant picture
    },
    { 
        id: 11, 
        title: 'Reading the Market in Real Time', 
        content: `
        By now, you understand structure, timing, liquidity, and sniper entries. But theory alone isn’t enough. The real challenge — and real power — lies in being able to read the market as it’s happening, without needing hindsight. In this chapter, we’ll focus on how to stay calm, analyze price action as it unfolds, and identify opportunities in real time — the same way professionals do.

        👁️ The Market Speaks — You Must Listen:
        Every candle that prints is a sentence. Every session is a paragraph. Every week is a full story. As traders, we must learn to read this language of price. Real-time reading is about understanding what price is trying to do, while it’s doing it — not after.

        This means asking questions on the fly:
        - Where is the liquidity sitting?
        - Who is currently trapped — buyers or sellers?
        - Is price reaching for something?
        - Is momentum strong or slowing down?

        If you learn to treat the market like a living, breathing organism, you’ll start to feel the rhythm — and eventually anticipate its next move.

        🔁 Price Action Is Dynamic, Not Static:
        One of the biggest mistakes traders make is treating price like it moves in fixed patterns. But real-time trading is fluid. You may plan for a bullish setup, but the market may sweep your zone and collapse. This doesn’t mean your analysis was wrong — it means the story evolved, and you must evolve with it.

        Rather than being rigid, stay adaptive. Watch how price reacts at key zones. Does it respect the level with clear rejections, or does it blow right through with momentum? These are clues you can only see if you’re focused in the moment.

        🕰️ Candle-by-Candle Reading:
        Most traders only analyze candles after they’ve closed. But professional traders learn to read candles as they’re forming. Why? Because the live behavior of price tells you what’s about to happen.

        Pay attention to:
        - How fast a candle moves.
        - Whether wicks are forming or being filled.
        - If volume is entering the market (visible on some platforms).
        - How price reacts when it touches a known POI (Order Block, FVG, Liquidity).

        For example, if a 5-minute candle quickly prints with a large body and no wick at the top, it suggests strong intent. If that happens at a key support level, it may signal continuation. On the other hand, a long wick into resistance with a weak close may suggest rejection.

        This is real-time reading — candle psychology.

        📍 Using Session Timing to Frame Price:
        Knowing the time of day is just as important as knowing the price. Market sessions dictate how price moves.
        - During Asian session, price consolidates and ranges. Fake moves often appear.
        - London session introduces volatility and breakouts.
        - New York session typically gives reversals, continuations, or massive stop hunts.

        In real time, always know what session you’re in. For example, if you see a breakout at the London open, expect a retracement or reversal during NY. This knowledge frames your expectations and helps you avoid reacting emotionally to price spikes.

        🧨 Live Liquidity Sweeps and BOS:
        One of the most powerful real-time signals is a liquidity sweep followed by a Break of Structure (BOS).

        Let’s say you see price forming equal highs. You expect those highs to get taken (liquidity). As the New York session begins, price aggressively spikes above those highs — sweeping them. Then, price sharply reverses and breaks below a recent low — a BOS.

        This live event tells you:
        - Liquidity has been taken.
        - Direction has shifted.
        - There’s likely an entry forming on the retracement.

        You didn’t need hindsight. You saw the sweep, waited for the BOS, and are now ready to enter on a retrace into a POI. That’s live trading done right.

        📐 Watching Reactions at POIs in Real Time:
        When price approaches a Point of Interest (OB, FVG, previous high/low), it’s time to go into watch mode.

        This doesn’t mean you enter as soon as it touches the zone. It means you:
        - Watch how the first candle reacts.
        - Wait for rejection wicks or engulfing candles.
        - See if internal structure breaks on a lower timeframe.

        A strong POI reaction is sharp, fast, and convincing. A weak POI reaction is hesitant, filled with noise, or even ignored completely. You’ll only be able to spot the difference by training your eyes to observe, not assume.

        🛠️ Tools for Real-Time Practice:
        You don’t need to risk real money to train this skill. Here's how to sharpen your real-time reading:
        - Use TradingView Replay Mode.
        - Play forward candle-by-candle.
        - Mark liquidity, POIs, and structure as you go.
        - Trade small or demo during live sessions.
        - Focus on reading, not profits.
        - Practice making predictions and journaling them.

        Narrate what’s happening:
        - Say out loud: “Liquidity above. Price swept. BOS just printed. Waiting for retrace.”
        - This reinforces live decision-making habits.

        Record your screen:
        - Later, review your real-time reactions to price.
        - Where were you impatient? Where did you guess?

        🧠 The Psychological Edge:
        Live trading is a performance. Your edge isn’t just in your analysis — it’s in your mindset under pressure. Real-time conditions bring noise, temptation, and doubt.

        To remain calm:
        - Stick to your model.
        - Only trade what you’ve planned.
        - Accept that missing a trade is better than forcing a bad one.
        - Breathe. Wait. Let the market come to you.

        When you trust your training and avoid impulsive decisions, you’ll notice your confidence improve — not because of wins, but because of discipline.
        `,
        image: require('../../assets/images/LearnToTrade/chapter5.jpg') // Add relevant picture
    },
    { 
        id: 12, 
        title: 'The Professional Trader’s Execution Model', 
        content: `
        By now, you’ve learned the fundamentals of the markets, built a solid understanding of technical tools and smart money concepts, and explored strategies used by intermediate and advanced traders. But all of this knowledge remains theoretical — unless you can execute with precision.

        Execution is the final skill that separates amateurs from professionals. In this chapter, you will learn how to approach the markets like a professional trader: how to form a bias, define clear zones of interest, refine your entries, manage your risk, and — most importantly — execute consistently.

        🔍 Step 1: High Timeframe Narrative — The Macro Story:
        Professional traders always begin by understanding the bigger picture. They don’t chase price on the 1-minute chart. They start by identifying market context using high timeframes like the 1-hour, 4-hour, or daily.

        At this level, your job is to build a bias — are you bullish, bearish, or neutral?

        Look for:
        - Break of Structure (BOS) or Market Structure Shifts (MSS)
        - Supply and Demand Zones
        - Fair Value Gaps (FVGs)
        - Order Blocks (OBs)
        - Areas of liquidity (equal highs/lows)

        Once you've determined your bias — for example, bullish on the 4H — you can drop down to refine your trade setup.

        📍 Step 2: Define Your Points of Interest (POIs):
        After identifying your bias, the next step is to mark your Points of Interest (POIs) — these are zones where price is most likely to react.

        POIs may include:
        - Institutional Order Blocks
        - FVGs left by displacement
        - Areas around previous highs/lows (liquidity)
        - Session opens (e.g., New York Open)
        - Psychological price levels (e.g., round numbers)

        The best POIs have multiple confluences — for example, an OB inside an FVG at a session open. Once marked, these levels become your targets for entries or exits.

        ⏬ Step 3: Drop Down to Lower Timeframes for Refinement:
        With your bias and POIs in place, now it’s time to go sniper mode. Drop down to the 5-minute, 3-minute, or even 1-minute chart to refine your entry.

        You're looking for signs of confirmation that price is reacting at your POI:
        - Liquidity Sweep: Price takes out previous highs/lows (stop hunts)
        - Break of Internal Structure (BOS): Price reverses direction and breaks previous minor highs/lows
        - Rejection Candles: Engulfing candles, long wicks, momentum shift
        - Micro Fair Value Gaps or OBs: On very small timeframes

        Once these confirmations appear, it’s your cue to prepare for entry.

        🎯 Step 4: Entry & Execution:
        Now that you’ve seen confirmation, it’s time to execute. Entry can be approached in a few ways:
        - Limit Order at POI: Placing a pending order at a refined OB/FVG zone.
        - Break-and-Retest: Entering after price breaks internal structure and retests a refined zone.
        - Aggressive Entry: On the candle close of the confirmation (e.g., bullish engulfing after a BOS).

        Each entry has pros and cons. Limit entries give better RR but lower win rate. Break-and-retest entries have higher confirmation but worse RR.

        What matters most is that your entry follows a consistent, repeatable process — not emotion or impulse.

        Set your stop-loss below/above the structural low/high that invalidates the setup. Set your take-profit at logical points:
        - Previous highs/lows
        - Imbalances
        - Session range extremes
        - Measured move targets

        💼 Step 5: Risk Management & Position Sizing:
        No execution model is complete without risk control. Risk is the only thing you can control in trading — not profits.

        Follow these core principles:
        - Risk only 1–2% per trade (or less).
        - Use position size calculators to align risk with stop size.
        - Never revenge trade or overleverage to “make it back.”
        - Use partial TPs to secure profits and let runners go.

        Consistent risk management is what keeps you in the game long enough to win.

        📊 Step 6: Journaling and Feedback Loops:
        Every trade you take should be logged. Not just the outcome, but:
        - What was the bias?
        - What POI did you use?
        - Was there LTF confirmation?
        - Did you follow your model?
        - What could you have done better?

        This feedback loop will help you isolate what works and eliminate what doesn’t. Over time, this is how edge is created.

        🎯 Professional Execution Model Recap:
        - Build Bias — HTF market structure and direction.
        - Mark POIs — OBs, FVGs, liquidity levels.
        - LTF Refinement — Wait for confirmation on 1–5 min charts.
        - Entry — Enter based on confirmation; SL and TP defined.
        - Risk Management — Protect capital with tight control.
        - Journal — Log the trade, learn from it, and improve.

        🧠 Final Words: From Student to Trader:
        This book has taken you from the basics of trading to the deepest execution strategies used by professionals. But the journey doesn’t end here — in fact, it begins now.

        The market will test your patience, your discipline, and your emotional control. But with this execution model in your hands, you’re no longer trading blindly — you’re operating with purpose and clarity.

        The only way to become a trader is to trade — with consistency, reflection, and focus. Go back through each chapter, practice each tool, build your plan, and trust your edge.

        You don’t need to be perfect — you just need to be consistent.

        Congratulations, trader. Your journey has just begun.
        `,
        image: require('../../assets/images/LearnToTrade/chapter5.jpg') // Add relevant picture
    },
];

const LearningPage = () => {
    const [currentChapter, setCurrentChapter] = useState(0); // Start with 0 for the landing page
    const [completedChapters, setCompletedChapters] = useState([]); // Track completed chapters from the database
    const [scrollProgress, setScrollProgress] = useState(0); // Track scroll progress
    const chapterContentRef = useRef(null); // Reference to the chapter content

    useEffect(() => {
        // Fetch user's completed chapters on component mount
        const fetchProgress = async () => {
            try {
                const { data } = await axios.get('/learning/progress', {
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
                });
                setCompletedChapters(data.completedChapters);
            } catch (error) {
                console.error('Failed to fetch progress:', error);
            }
        };

        fetchProgress();
    }, []);

    const updateProgress = async (chapterId) => {
        try {
            await axios.post(
                '/learning/progress',
                { chapterId },
                { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
            );
        } catch (error) {
            console.error('Failed to update progress:', error);
        }
    };

    const startLearning = () => {
        setCurrentChapter(1); // Move to Chapter 1
    };

    const nextChapter = () => {
        if (currentChapter < chapters.length) {
            if (!completedChapters.includes(currentChapter)) {
                setCompletedChapters((prev) => [...prev, currentChapter]); // Update local state
                updateProgress(currentChapter); // Update progress in the database
            }
            setCurrentChapter(currentChapter + 1);
        }
    };

    const prevChapter = () => {
        if (currentChapter > 1) {
            setCurrentChapter(currentChapter - 1);
        }
    };

    const goToChapterList = () => {
        setCurrentChapter(0); // Go back to the chapter list
    };

    const accessChapter = (chapterId) => {
        if (chapterId <= completedChapters.length + 1) {
            setCurrentChapter(chapterId); // Allow access to unlocked chapters
        }
    };

    const progressPercentage = Math.round((completedChapters.length / chapters.length) * 100);

    const handleScroll = () => {
        if (chapterContentRef.current) {
            const { scrollTop, scrollHeight, clientHeight } = chapterContentRef.current;
            const totalScrollableHeight = scrollHeight - clientHeight;
            const progress = (scrollTop / totalScrollableHeight) * 100;
            setScrollProgress(Math.min(Math.max(progress, 0), 100)); // Clamp between 0 and 100
        }
    };

    useEffect(() => {
        if (chapterContentRef.current) {
            chapterContentRef.current.addEventListener('scroll', handleScroll);
        }
        return () => {
            if (chapterContentRef.current) {
                chapterContentRef.current.removeEventListener('scroll', handleScroll);
            }
        };
    }, [currentChapter]);

    const renderQuizBox = (quizType, unlockAfterChapters) => {
        const isUnlocked = completedChapters.length >= unlockAfterChapters;
        return (
            <div className={`quiz-box ${isUnlocked ? '' : 'locked'}`}>
                <h3>{quizType} Quiz</h3>
                {isUnlocked ? (
                    <Link to={`/quiz/${quizType.toLowerCase()}`} className="quiz-btn">
                        Take {quizType} Quiz
                    </Link>
                ) : (
                    <p className="locked-text">Complete the first {unlockAfterChapters} chapters to unlock</p>
                )}
            </div>
        );
    };

    const renderChapterBlocks = () => {
        const blocks = [];
        for (let i = 0; i < chapters.length; i += 4) {
            blocks.push(
                <div key={i} className="chapter-block">
                    {chapters.slice(i, i + 4).map((chapter) => (
                        <div
                            key={chapter.id}
                            className={`chapter-card ${chapter.id > completedChapters.length + 1 ? 'locked' : ''}`}
                            onClick={() => {
                                if (chapter.id <= completedChapters.length + 1) {
                                    accessChapter(chapter.id); // Allow access only to unlocked chapters
                                }
                            }}
                        >
                            <img src={chapter.image} alt={chapter.title} className="chapter-card-image" />
                            <h3>{chapter.title}</h3>
                            <p>Chapter {chapter.id}</p>
                            {chapter.id > completedChapters.length + 1 && <p className="locked-text">Locked</p>}
                        </div>
                    ))}
                    {i === 0 && renderQuizBox('Beginner', 4)}
                    {i === 4 && renderQuizBox('Intermediate', 8)}
                    {i === 8 && renderQuizBox('Experienced', 12)}
                </div>
            );
        }
        return blocks;
    };

    const renderChapterContent = () => {
        const currentChapterData = chapters[currentChapter - 1];
        return (
            <div className="chapter-page">
                <div className="scroll-tracker">
                    <div className="scroll-progress-bar" style={{ height: `${scrollProgress}%` }}></div>
                </div>
                <h1>Chapter {currentChapter}: {currentChapterData.title}</h1>
                <div className="chapter-content" ref={chapterContentRef}>
                    <img src={currentChapterData.image} alt={currentChapterData.title} className="chapter-image" />
                    <div className="chapter-text">
                        {currentChapterData.content.split('\n').map((line, index) => (
                            <p key={index}>{line.trim()}</p>
                        ))}
                    </div>
                </div>
                {/* Add quiz button below chapter content */}
                {currentChapter === 4 && (
                    <div className="quiz-section">
                        <Link to="/quiz/beginner" className="quiz-btn">Take Beginner Quiz</Link>
                    </div>
                )}
                {currentChapter === 8 && (
                    <div className="quiz-section">
                        <Link to="/quiz/intermediate" className="quiz-btn">Take Intermediate Quiz</Link>
                    </div>
                )}
                {currentChapter === 12 && (
                    <div className="quiz-section">
                        <Link to="/quiz/experienced" className="quiz-btn">Take Experienced Quiz</Link>
                    </div>
                )}
                <div className="chapter-navigation">
                    <button onClick={goToChapterList} className="back-to-list-btn">Back to Chapter List</button>
                    {currentChapter > 1 && (
                        <button onClick={prevChapter} className="prev-btn">Previous Chapter</button>
                    )}
                    {currentChapter < chapters.length ? (
                        <button onClick={nextChapter} className="next-btn">Next Chapter</button>
                    ) : (
                        <Link to="/learning" className="finish-btn">Finish Learning</Link>
                    )}
                </div>
            </div>
        );
    };

    return (
        <div className="learning-page">
            <Header />
            <Navbar />
            <div className="learning-container">
                {currentChapter === 0 ? (
                    <div className="landing-page">
                        <h1>Welcome to the Learning Journey</h1>
                        <p>Track your progress and master the art of trading with our comprehensive chapters.</p>
                        <div className="chapter-overview">
                            {renderChapterBlocks()}
                        </div>
                        <button onClick={startLearning} className="start-learning-btn">Start Learning</button>
                        <div className="progress-bar-container">
                            <div className="progress-bar" style={{ width: `${progressPercentage}%` }}></div>
                            <p>{progressPercentage}% Complete</p>
                        </div>
                    </div>
                ) : (
                    renderChapterContent()
                )}
            </div>
            <hr className="section-divider" />
            <Footer />
        </div>
    );
};

export default LearningPage;