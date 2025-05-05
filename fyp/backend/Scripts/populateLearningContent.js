import mongoose from 'mongoose';
import dotenv from 'dotenv';
import LearningContent from '../Models/LearningContent.js';

dotenv.config();

const learningContent = [
    { 
        id: 1, 
        title: "Introduction to Forex Trading",
        content: `# Introduction to the Foreign Exchange Market

## What is Forex Trading?
The foreign exchange market (Forex or FX) is the largest financial market in the world, with a daily trading volume exceeding $6 trillion. This decentralized global market is where all the world's currencies are traded.

## Market Structure and Participants
The forex market operates 24 hours a day, five days a week, making it uniquely accessible to traders worldwide. Major participants include:

- Commercial and Investment Banks
- Central Banks
- Investment Funds and Asset Managers
- Multinational Corporations
- Retail Traders (Individual Investors)

## Basic Concepts

### Currency Pairs
Currencies are always traded in pairs. The first currency is called the base currency, while the second is the quote currency. For example, in EUR/USD:
- EUR is the base currency
- USD is the quote currency
- If EUR/USD = 1.2000, it means 1 EUR = 1.20 USD

### Pips and Lots
- A pip is the smallest price move in forex trading
- Standard lot = 100,000 units
- Mini lot = 10,000 units
- Micro lot = 1,000 units

## Market Hours
The forex market consists of four major trading sessions:
1. Sydney (21:00-06:00 GMT)
2. Tokyo (23:00-08:00 GMT)
3. London (08:00-17:00 GMT)
4. New York (13:00-22:00 GMT)

The most active trading periods occur when sessions overlap.

## Getting Started
To begin trading forex, you need:
1. A reliable broker
2. Trading platform
3. Basic market knowledge
4. Risk management strategy
5. Trading plan

Remember: Education and practice are crucial before trading with real money.`,
        chapter: "1",
        order: 1,
        type: "text",
        mediaUrl: "https://www.example.com/images/forex-introduction.jpg"
    },
    {
        id: 2,
        title: "Understanding Currency Pairs",
        content: `# Currency Pairs and Market Structure

## Major Currency Pairs
The most traded currency pairs in the forex market:

### EUR/USD (Euro/US Dollar)
- Known as "The King" of forex
- Highest trading volume
- Influenced by EU and US economic data
- Typically lowest spreads

### GBP/USD (British Pound/US Dollar)
- Known as "Cable"
- Highly liquid
- Sensitive to UK economic data
- More volatile than EUR/USD

### USD/JPY (US Dollar/Japanese Yen)
- Major safe-haven currency
- Influenced by interest rate differentials
- Popular for carry trades
- Strong correlation with US Treasury yields

### USD/CHF (US Dollar/Swiss Franc)
- Known as "Swissy"
- Another safe-haven currency
- Influenced by SNB policy
- Often moves inversely to EUR/USD

## Understanding Price Quotes

### Bid and Ask Prices
- Bid: Price at which you can sell
- Ask: Price at which you can buy
- Spread: Difference between bid and ask

Example:
EUR/USD
Bid: 1.2000 | Ask: 1.2002
Spread = 0.0002 (2 pips)

## Currency Strength
Factors affecting currency strength:
1. Interest Rates
2. Economic Indicators
3. Political Stability
4. Trade Balance
5. Market Sentiment

## Cross Rates and Exotic Pairs

### Cross Rates
- Currency pairs not involving USD
- Examples: EUR/GBP, GBP/JPY
- Often wider spreads than majors

### Exotic Pairs
- Involve emerging market currencies
- Higher spreads and volatility
- Examples: USD/TRY, EUR/ZAR

## Correlation Between Pairs
Understanding currency correlations helps in:
- Portfolio diversification
- Risk management
- Multiple position strategies`,
        chapter: "2",
        order: 2,
        type: "text",
        mediaUrl: "https://www.example.com/images/currency-pairs.jpg"
    },
    {
        id: 3,
        title: "Market Analysis: Fundamental vs Technical",
        content: `# Comprehensive Market Analysis

## Fundamental Analysis

### Economic Indicators
1. Gross Domestic Product (GDP)
   - Measures economic output
   - Released quarterly
   - Leading indicator of economic health

2. Employment Data
   - Non-Farm Payrolls (NFP)
   - Unemployment Rate
   - Average Hourly Earnings

3. Inflation Metrics
   - Consumer Price Index (CPI)
   - Producer Price Index (PPI)
   - Core inflation rates

### Central Bank Policy
- Interest rate decisions
- Monetary policy statements
- Forward guidance
- Quantitative easing/tightening

### Political and Economic Events
- Elections
- Trade agreements
- Geopolitical tensions
- Natural disasters

## Technical Analysis

### Price Action
1. Trend Analysis
   - Uptrends
   - Downtrends
   - Sideways markets
   - Trend lines and channels

2. Support and Resistance
   - Historical price levels
   - Psychological levels
   - Dynamic levels
   - Price action around levels

### Chart Patterns
1. Continuation Patterns
   - Flags
   - Pennants
   - Triangles
   - Rectangles

2. Reversal Patterns
   - Head and Shoulders
   - Double Tops/Bottoms
   - Triple Tops/Bottoms
   - Wedges

## Combining Both Approaches

### Multi-Timeframe Analysis
1. Long-term: Fundamental outlook
2. Medium-term: Trend direction
3. Short-term: Entry/exit points

### Creating a Complete Strategy
1. Use fundamentals for bias
2. Technical analysis for timing
3. Risk management for protection
4. Regular strategy review and adjustment`,
        chapter: "3",
        order: 3,
        type: "text",
        mediaUrl: "https://www.example.com/images/market-analysis.jpg"
    },
    {
        id: 4,
        title: "Technical Analysis: Chart Patterns",
        content: `# Advanced Chart Pattern Analysis

## Price Action Foundations

### Japanese Candlesticks
1. Basic Candlestick Components
   - Open and Close prices
   - High and Low prices
   - Body color significance
   - Wick interpretation

2. Single Candlestick Patterns
   - Doji
   - Hammer
   - Shooting Star
   - Marubozu

3. Multiple Candlestick Patterns
   - Engulfing patterns
   - Morning/Evening Star
   - Harami
   - Three White Soldiers/Black Crows

## Major Reversal Patterns

### Head and Shoulders
1. Components
   - Left shoulder
   - Head
   - Right shoulder
   - Neckline

2. Trading Guidelines
   - Volume confirmation
   - Neckline break
   - Price targets
   - Stop-loss placement

### Double Tops and Bottoms
1. Pattern Formation
   - Equal highs/lows
   - Volume characteristics
   - Time between peaks
   - Support/resistance levels

2. Trading Strategy
   - Confirmation levels
   - Entry points
   - Target calculation
   - Risk management

## Continuation Patterns

### Triangles
1. Ascending Triangles
   - Horizontal resistance
   - Rising support
   - Volume pattern
   - Breakout targets

2. Descending Triangles
   - Horizontal support
   - Falling resistance
   - Volume confirmation
   - Target calculation

3. Symmetrical Triangles
   - Converging trendlines
   - Volume characteristics
   - Breakout direction
   - Trading strategy

### Flags and Pennants
1. Pattern Characteristics
   - Flag pole
   - Consolidation area
   - Volume profile
   - Continuation probability

2. Trading Approach
   - Entry points
   - Stop placement
   - Target calculation
   - Risk:reward ratio

## Pattern Trading Psychology
1. Pattern reliability
2. False breakouts
3. Market context
4. Risk management
5. Position sizing`,
        chapter: "4",
        order: 4,
        type: "text",
        mediaUrl: "https://www.example.com/images/chart-patterns.jpg"
    },
    {
        id: 5,
        title: "Technical Indicators and Tools",
        content: `# Advanced Technical Analysis Tools

## Moving Averages

### Simple Moving Average (SMA)
1. Calculation Method
   - Equal weight to all prices
   - Period selection importance
   - Lag characteristics
   - Trading applications

2. Common SMA Periods
   - 20-day for short-term trends
   - 50-day for intermediate trends
   - 200-day for long-term trends
   - Multiple MA combinations

### Exponential Moving Average (EMA)
1. Advantages over SMA
   - More weight to recent prices
   - Faster response to price changes
   - Reduced lag
   - Popular periods

## Momentum Indicators

### Relative Strength Index (RSI)
1. Components
   - Calculation period
   - Overbought/oversold levels
   - Divergence signals
   - Trading strategies

2. Advanced RSI Techniques
   - Trend identification
   - Support/resistance levels
   - Failure swings
   - Hidden divergence

### MACD (Moving Average Convergence Divergence)
1. Components
   - MACD line
   - Signal line
   - Histogram
   - Zero line

2. Trading Signals
   - Crossovers
   - Divergence
   - Zero-line crosses
   - Histogram analysis

## Volatility Indicators

### Bollinger Bands
1. Components
   - Middle band (20-day SMA)
   - Upper band (+2 standard deviations)
   - Lower band (-2 standard deviations)
   - Band width

2. Trading Applications
   - Volatility measurement
   - Trend strength
   - Price targets
   - Squeeze signals

### Average True Range (ATR)
1. Calculation
   - True Range concept
   - Period selection
   - Volatility measurement
   - Position sizing tool

## Volume Analysis

### On-Balance Volume (OBV)
1. Calculation Method
   - Volume flow
   - Trend confirmation
   - Divergence signals
   - Trading strategies

### Volume Profile
1. Components
   - Point of Control
   - Value Area
   - Volume nodes
   - Profile patterns`,
        chapter: "5",
        order: 5,
        type: "text",
        mediaUrl: "https://www.example.com/images/technical-indicators.jpg"
    },
    {
        id: 6,
        title: "Risk Management and Position Sizing",
        content: `# Professional Risk Management

## Capital Preservation

### Risk per Trade
1. Percentage-Based Risk
   - 1-2% rule explanation
   - Account size considerations
   - Maximum drawdown limits
   - Recovery calculations

2. Fixed Dollar Risk
   - Pros and cons
   - Implementation methods
   - Position size calculation
   - Account growth adaptation

### Position Sizing Models

1. Fixed Percentage Risk
   - Calculation method
   - Advantages/disadvantages
   - Implementation examples
   - Position size calculator

2. Kelly Criterion
   - Formula explanation
   - Win rate importance
   - Risk:reward ratio
   - Practical application

## Stop Loss Strategies

### Technical Stop Losses
1. Support/Resistance Based
   - Key level identification
   - Buffer zones
   - Multiple timeframe analysis
   - Stop placement rules

2. Volatility Based
   - ATR method
   - Bollinger Bands
   - Standard deviation
   - Dynamic stops

### Time-Based Stops
1. Day Trading
   - Session limits
   - Time exits
   - Lunch hour rules
   - End of day management

2. Swing Trading
   - Maximum holding period
   - Time decay consideration
   - Weekend risk
   - News event timing

## Risk:Reward Management

### Setting Profit Targets
1. Technical Levels
   - Support/resistance
   - Fibonacci extensions
   - Chart patterns
   - Round numbers

2. Multiple Targets
   - Partial profit taking
   - Runner positions
   - Scale-out strategies
   - Target adjustment

### Position Management
1. Break-Even Stops
   - When to move stops
   - Psychological aspects
   - Trailing techniques
   - Re-entry strategies

2. Adding to Positions
   - Pyramid trading
   - Average up vs down
   - Position size limits
   - Risk recalculation`,
        chapter: "6",
        order: 6,
        type: "text",
        mediaUrl: "https://www.example.com/images/risk-management.jpg"
    },
    {
        id: 7,
        title: "Trading Psychology and Mindset",
        content: `# Mastering Trading Psychology

## Understanding Trading Psychology

### Emotional Control
1. Common Trading Emotions
   - Fear and greed
   - Hope and regret
   - Excitement and boredom
   - Revenge trading

2. Psychological Challenges
   - FOMO (Fear of Missing Out)
   - Analysis paralysis
   - Overconfidence
   - Decision fatigue

### Building Mental Strength
1. Meditation Techniques
   - Mindfulness practice
   - Focus exercises
   - Stress management
   - Emotional awareness

2. Physical Well-being
   - Exercise importance
   - Sleep quality
   - Nutrition
   - Work-life balance

## Developing a Trading Mindset

### Process Over Outcome
1. Focus Areas
   - Strategy execution
   - Risk management
   - Journal keeping
   - Performance review

2. Success Metrics
   - Win rate
   - Risk:reward ratio
   - Maximum drawdown
   - Sharpe ratio

### Discipline and Routine
1. Pre-Market Routine
   - Market review
   - News analysis
   - Strategy preparation
   - Mental preparation

2. Trading Session
   - Environment setup
   - Focus maintenance
   - Break scheduling
   - Performance monitoring

## Managing Trading Stress

### Stress Management
1. Identifying Triggers
   - Loss reactions
   - Winning streaks
   - Market conditions
   - External factors

2. Coping Strategies
   - Breathing exercises
   - Time-out periods
   - Support systems
   - Professional help

### Recovery Techniques
1. After Losses
   - Analysis without emotion
   - Learning opportunities
   - Strategy adjustment
   - Confidence rebuilding

2. Maintaining Balance
   - Regular breaks
   - Hobby importance
   - Social connections
   - Personal development`,
        chapter: "7",
        order: 7,
        type: "text",
        mediaUrl: "https://www.example.com/images/trading-psychology.jpg"
    },
    {
        id: 8,
        title: "Advanced Trading Strategies",
        content: `# Professional Trading Strategies

## Trend Following Strategies

### Moving Average Systems
1. Multiple MA Crossovers
   - Period selection
   - Entry/exit rules
   - Trend confirmation
   - False signal handling

2. MA Envelope Trading
   - Envelope calculation
   - Trading zones
   - Risk management
   - Position sizing

### Momentum Trading
1. RSI Strategy
   - Trend alignment
   - Entry conditions
   - Exit rules
   - Time frame correlation

2. MACD Systems
   - Signal line crosses
   - Zero line strategy
   - Divergence trading
   - Multiple time frame analysis

## Mean Reversion Strategies

### Bollinger Band Trading
1. Band Touch Strategy
   - Entry conditions
   - Stop placement
   - Profit targets
   - Risk management

2. Band Squeeze Trading
   - Volatility contraction
   - Breakout anticipation
   - Position sizing
   - Risk control

### RSI Mean Reversion
1. Oversold/Overbought
   - Level selection
   - Confirmation signals
   - Time frame importance
   - Exit strategies

2. Divergence Trading
   - Regular divergence
   - Hidden divergence
   - Multiple time frames
   - Risk:reward setup

## Breakout Trading Systems

### Price Action Breakouts
1. Support/Resistance
   - Level identification
   - Entry triggers
   - Stop placement
   - Target setting

2. Chart Pattern Breakouts
   - Pattern completion
   - Volume confirmation
   - False breakout handling
   - Position management

### Volatility Breakouts
1. ATR-Based Systems
   - Range calculation
   - Breakout levels
   - Position sizing
   - Risk management

2. Time-Based Breakouts
   - Session breakouts
   - Range breakouts
   - News breakouts
   - Follow-through analysis`,
        chapter: "8",
        order: 8,
        type: "text",
        mediaUrl: "https://www.example.com/images/trading-strategies.jpg"
    },
    {
        id: 9,
        title: "Market Analysis and Trading Tools",
        content: `# Professional Market Analysis

## Trading Platforms

### MetaTrader 4/5
1. Platform Features
   - Chart types and timeframes
   - Technical indicators
   - Expert Advisors (EAs)
   - Custom indicators
   - Backtesting capabilities

2. Advanced Functions
   - Multi-chart trading
   - One-click trading
   - Automated trading
   - Strategy tester
   - Custom scripts

### TradingView
1. Platform Overview
   - Social trading features
   - Advanced charting
   - Indicator library
   - Screener tools
   - Alert systems

2. Pro Features
   - Multiple charts
   - Server-side alerts
   - Extended market data
   - Custom indicators
   - Strategy testing

## Analysis Tools

### Economic Calendar
1. High-Impact Events
   - Interest rate decisions
   - GDP releases
   - Employment reports
   - Inflation data
   - Trade balance

2. Using the Calendar
   - Time zone management
   - Impact filtering
   - Event preparation
   - Trading around news

### Market Sentiment
1. Sentiment Indicators
   - COT reports
   - Put/Call ratio
   - Fear & Greed index
   - Retail positioning
   - Institutional flows

2. Social Sentiment
   - Social media analysis
   - News sentiment
   - Forum discussions
   - Expert opinions

## Risk Management Tools

### Position Size Calculator
1. Features
   - Risk percentage
   - Stop loss distance
   - Lot size calculation
   - Currency conversion
   - Multiple instruments

2. Advanced Calculations
   - Risk:reward ratios
   - Multiple positions
   - Portfolio risk
   - Margin requirements

### Trade Journal
1. Components
   - Entry/exit points
   - Position size
   - Risk parameters
   - Strategy used
   - Market conditions

2. Analysis Features
   - Performance metrics
   - Win rate calculation
   - Profit factor
   - Drawdown analysis
   - Strategy evaluation`,
        chapter: "9",
        order: 9,
        type: "text",
        mediaUrl: "https://www.example.com/images/trading-tools.jpg"
    },
    {
        id: 10,
        title: "Advanced Market Analysis",
        content: `# Professional Market Analysis Techniques

## Intermarket Analysis

### Currency Correlations
1. Major Pairs
   - EUR/USD vs GBP/USD
   - USD/JPY vs USD/CHF
   - AUD/USD vs NZD/USD
   - Cross-rate relationships

2. Commodity Correlations
   - Gold and USD
   - Oil and CAD
   - Copper and AUD
   - Agricultural commodities

### Global Markets
1. Stock Markets
   - S&P 500
   - DAX
   - Nikkei
   - Market correlations

2. Bond Markets
   - Treasury yields
   - Interest rate differentials
   - Yield curves
   - Market impact

## Advanced Technical Analysis

### Harmonic Patterns
1. Pattern Types
   - Gartley
   - Butterfly
   - Bat
   - Crab
   - Shark

2. Pattern Trading
   - Fibonacci ratios
   - Entry points
   - Stop placement
   - Target levels

### Elliott Wave Theory
1. Basic Principles
   - Five-wave impulse
   - Three-wave correction
   - Wave counting
   - Time analysis

2. Trading Applications
   - Wave identification
   - Entry strategies
   - Risk management
   - Target projection

## Market Microstructure

### Order Flow Analysis
1. Components
   - Time and sales
   - Level 2 data
   - Market depth
   - Volume analysis

2. Trading Applications
   - Price action
   - Volume profile
   - Order book analysis
   - Liquidity zones

### Market Making
1. Basic Concepts
   - Bid-ask spread
   - Market depth
   - Liquidity provision
   - Order types

2. Professional Tools
   - DOM trading
   - Heat maps
   - Flow analysis
   - Risk management`,
        chapter: "10",
        order: 10,
        type: "text",
        mediaUrl: "https://www.example.com/images/advanced-analysis.jpg"
    },
    {
        id: 11,
        title: "Professional Trading Systems",
        content: `# Building Professional Trading Systems

## System Development

### Strategy Components
1. Entry Rules
   - Signal generation
   - Entry conditions
   - Time filters
   - Market conditions

2. Exit Rules
   - Profit targets
   - Stop losses
   - Time-based exits
   - Multiple exits

### System Testing
1. Backtesting
   - Historical data
   - Parameter optimization
   - Walk-forward analysis
   - Out-of-sample testing

2. Forward Testing
   - Demo trading
   - Small live testing
   - Performance tracking
   - System refinement

## Automated Trading

### Expert Advisors (EAs)
1. Development
   - Programming basics
   - Strategy coding
   - Testing framework
   - Optimization tools

2. Implementation
   - Risk management
   - Position sizing
   - Error handling
   - Performance monitoring

### System Monitoring
1. Performance Metrics
   - Profit factor
   - Sharpe ratio
   - Maximum drawdown
   - Recovery factor

2. Risk Management
   - Position limits
   - Drawdown controls
   - Equity curve trading
   - Emergency stops

## Portfolio Management

### Asset Allocation
1. Currency Pairs
   - Major pairs
   - Minor pairs
   - Exotic pairs
   - Correlation management

2. Risk Distribution
   - Position sizing
   - Correlation matrix
   - Maximum exposure
   - Portfolio rebalancing

### Performance Analysis
1. Key Metrics
   - Return on investment
   - Risk-adjusted returns
   - Drawdown analysis
   - Win rate analysis

2. System Optimization
   - Parameter adjustment
   - Risk management
   - Trading rules
   - Performance improvement`,
        chapter: "11",
        order: 11,
        type: "text",
        mediaUrl: "https://www.example.com/images/trading-systems.jpg"
    },
    {
        id: 12,
        title: "Professional Trading Career",
        content: `# Building a Professional Trading Career

## Career Development

### Education Path
1. Initial Learning
   - Basic concepts
   - Technical analysis
   - Fundamental analysis
   - Risk management

2. Advanced Training
   - Professional certifications
   - Mentorship programs
   - Trading seminars
   - Continuous learning

### Career Options
1. Independent Trading
   - Prop trading
   - Retail trading
   - Fund management
   - Signal provision

2. Institutional Trading
   - Bank trading
   - Hedge funds
   - Asset management
   - Market making

## Business Structure

### Legal Setup
1. Business Entity
   - Company formation
   - Tax considerations
   - Legal requirements
   - Compliance issues

2. Operations
   - Office setup
   - Technology infrastructure
   - Data security
   - Business continuity

### Financial Management
1. Capital Structure
   - Initial capital
   - Risk capital
   - Operating expenses
   - Growth planning

2. Performance Tracking
   - Accounting systems
   - Performance reporting
   - Tax documentation
   - Audit preparation

## Professional Development

### Networking
1. Industry Connections
   - Trading groups
   - Professional associations
   - Online communities
   - Industry events

2. Knowledge Sharing
   - Mentoring others
   - Writing articles
   - Social media presence
   - Educational content

### Career Growth
1. Skill Development
   - New strategies
   - Market knowledge
   - Technology skills
   - Risk management

2. Business Expansion
   - Team building
   - Service offerings
   - Client acquisition
   - Brand development`,
        chapter: "12",
        order: 12,
        type: "text",
        mediaUrl: "https://www.example.com/images/trading-career.jpg"
    },
    {
        id: 13,
        title: "Fundamental Analysis",
        content: `Economic Indicators
        - GDP and economic growth
        - Employment data
        - Inflation metrics
        - Retail sales and consumer confidence
        - Manufacturing and services PMI

        Central Bank Policies
        - Interest rate decisions
        - Monetary policy statements
        - Quantitative easing/tapering
        - Forward guidance
        - Central bank communication

        Market Sentiment
        - Risk-on vs risk-off environments
        - Safe-haven currencies
        - Market correlations
        - Sentiment indicators
        - Contrarian trading

        Geopolitical Events
        - Elections and political uncertainty
        - Trade wars and tariffs
        - International conflicts
        - Regulatory changes
        - Natural disasters

        Intermarket Analysis
        - Currency correlations
        - Commodity relationships
        - Stock market impact
        - Bond yields and currencies
        - Cross-asset trading strategies`,
        order: 4
    },
    {
        id: 14,
        title: "Risk Management",
        content: `Position Sizing
        - Fixed lot size vs percentage risk
        - Risk per trade calculation
        - Account size considerations
        - Scaling in and out
        - Pyramiding positions

        Stop Loss Strategies
        - Fixed stop loss
        - Trailing stops
        - Time-based stops
        - Volatility-based stops
        - Multiple stop loss levels

        Risk-Reward Ratios
        - Calculating potential profit/loss
        - Setting realistic targets
        - Partial profit taking
        - Risk-reward optimization
        - Break-even strategies

        Portfolio Management
        - Diversification across pairs
        - Correlation analysis
        - Maximum drawdown limits
        - Daily/weekly loss limits
        - Position correlation

        Psychological Aspects
        - Emotional control
        - Trading journal
        - Review and analysis
        - Continuous improvement
        - Handling losses and wins`,
        order: 5
    },
    {
        id: 15,
        title: "Trading Psychology",
        content: `Emotional Control
        - Fear and greed
        - Overcoming trading anxiety
        - Building confidence
        - Managing expectations
        - Developing discipline

        Trading Mindset
        - Process vs outcome focus
        - Accepting losses
        - Patience and persistence
        - Adaptability to market conditions
        - Continuous learning

        Common Psychological Traps
        - Revenge trading
        - FOMO (Fear of Missing Out)
        - Confirmation bias
        - Overconfidence
        - Analysis paralysis

        Building a Trading Routine
        - Pre-market preparation
        - Trading session structure
        - Post-market review
        - Weekly/monthly analysis
        - Regular strategy evaluation

        Mental Preparation
        - Visualization techniques
        - Meditation and mindfulness
        - Physical health and trading
        - Work-life balance
        - Support systems`,
        order: 6
    },
    {
        id: 16,
        title: "Trading Strategies",
        content: `Trend Following
        - Moving average crossovers
        - Breakout trading
        - Pullback entries
        - Trend continuation patterns
        - Multiple timeframe confirmation

        Range Trading
        - Identifying ranging markets
        - Support/resistance bounce trades
        - Mean reversion strategies
        - Range breakout setups
        - Range-bound indicators

        Counter-Trend Trading
        - Reversal patterns
        - Divergence setups
        - Exhaustion signals
        - Overbought/oversold conditions
        - Risk management for reversals

        Scalping Strategies
        - Quick entry/exit rules
        - Tick chart analysis
        - Order flow trading
        - Spread considerations
        - High-frequency setups

        Swing Trading
        - Multi-day position holding
        - Weekly chart analysis
        - Fundamental catalysts
        - Position management
        - Weekend risk management`,
        order: 7
    },
    {
        id: 17,
        title: "Advanced Trading Concepts",
        content: `Market Microstructure
        - Order flow analysis
        - Liquidity pools
        - Market makers
        - Spread dynamics
        - Slippage and execution

        Algorithmic Trading
        - Basic algorithm components
        - Backtesting strategies
        - Optimization techniques
        - Risk parameters
        - Execution algorithms

        Options and Derivatives
        - Basic options concepts
        - Options strategies for forex
        - Hedging with options
        - Volatility trading
        - Synthetic positions

        Cross-Asset Trading
        - Currency correlations
        - Commodity relationships
        - Stock market impact
        - Bond yields and currencies
        - Multi-asset portfolios

        Market Regimes
        - Trending vs ranging markets
        - Volatility regimes
        - Adapting strategies
        - Regime identification
        - Strategy selection`,
        order: 8
    },
    {
        id: 18,
        title: "Trading Systems Development",
        content: `System Components
        - Entry rules
        - Exit rules
        - Position sizing
        - Risk management
        - Time filters

        Backtesting
        - Historical data selection
        - Walk-forward analysis
        - Out-of-sample testing
        - Robustness testing
        - Performance metrics

        Optimization
        - Parameter optimization
        - Curve fitting avoidance
        - Multi-timeframe optimization
        - Walk-forward optimization
        - Robust parameter sets

        System Evaluation
        - Performance metrics
        - Drawdown analysis
        - Risk-adjusted returns
        - Consistency measures
        - System comparison

        Implementation
        - Paper trading
        - Demo account testing
        - Live trading transition
        - System monitoring
        - Continuous improvement`,
        order: 9
    },
    {
        id: 19,
        title: "Specialized Trading Approaches",
        content: `News Trading
        - Economic calendar analysis
        - High-impact news events
        - News trading strategies
        - Risk management for news
        - Avoiding news traps

        Carry Trading
        - Interest rate differentials
        - Currency pair selection
        - Risk considerations
        - Hedging strategies
        - Long-term position management

        Volatility Trading
        - Volatility indicators
        - Volatility breakout strategies
        - Mean reversion in volatility
        - Volatility-based position sizing
        - Options for volatility trading

        Correlation Trading
        - Pair trading
        - Correlation analysis
        - Cointegration
        - Spread trading
        - Hedging with correlations

        Seasonal Patterns
        - Currency seasonality
        - Monthly patterns
        - Day-of-week effects
        - Time-of-day patterns
        - Seasonal strategy development`,
        order: 10
    },
    {
        id: 20,
        title: "Trading Business Management",
        content: `Business Planning
        - Trading business structure
        - Capital requirements
        - Revenue projections
        - Expense management
        - Tax considerations

        Record Keeping
        - Trading journal
        - Performance tracking
        - Tax records
        - Strategy documentation
        - Continuous improvement

        Risk Management for Business
        - Capital allocation
        - Drawdown limits
        - Business continuity
        - Insurance considerations
        - Emergency funds

        Scaling Your Trading
        - Increasing position sizes
        - Adding trading strategies
        - Expanding to new markets
        - Hiring assistance
        - Automation options

        Long-term Sustainability
        - Work-life balance
        - Continuous education
        - Adapting to market changes
        - Retirement planning
        - Legacy considerations`,
        order: 11
    },
    {
        id: 21,
        title: "Future of Forex Trading",
        content: `Technological Advances
        - AI and machine learning
        - Blockchain and cryptocurrencies
        - High-frequency trading
        - Mobile trading evolution
        - Cloud-based platforms

        Regulatory Changes
        - Global regulatory trends
        - Compliance requirements
        - Reporting obligations
        - Capital requirements
        - Client protection measures

        Market Evolution
        - New currency pairs
        - Emerging market currencies
        - Digital currencies
        - Alternative trading venues
        - Market structure changes

        Career Opportunities
        - Proprietary trading
        - Fund management
        - Algorithmic trading
        - Education and mentoring
        - Financial technology

        Staying Competitive
        - Continuous learning
        - Adaptability
        - Networking
        - Specialization
        - Innovation in trading approaches`,
        order: 12
    }
];

const populateLearningContent = async () => {
    try {
        await mongoose.connect(process.env.MONGO_CONN);
        console.log('Connected to MongoDB');

        // Clear existing content
        await LearningContent.deleteMany({});
        console.log('Cleared existing learning content');

        // Only use the first 12 chapters that have all required fields
        const chaptersToInsert = learningContent.slice(0, 12);

        // Insert chapters
        await LearningContent.insertMany(chaptersToInsert);
        console.log('Successfully populated learning content with 12 chapters');

        await mongoose.disconnect();
        console.log('Disconnected from MongoDB');
    } catch (error) {
        console.error('Error populating learning content:', error);
        process.exit(1);
    }
};

populateLearningContent(); 