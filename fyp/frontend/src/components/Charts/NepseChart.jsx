import React, { useEffect, useRef, useState } from "react";
import { createChart } from 'lightweight-charts';

const NepseChart = ({ symbol, indicatorType, timeframe = "D" }) => {
    const chartContainerRef = useRef(null);
    const chartRef = useRef(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState(null);

    // Separate effect for data fetching
    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                setError(null);

                const response = await fetch(`http://localhost:8081/api/nepse/index/${symbol.toLowerCase()}?timeframe=${timeframe}`);
                if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

                const responseData = await response.json();
                if (!responseData || !Array.isArray(responseData)) throw new Error('Invalid data format');

                // Format data for the chart
                const chartData = responseData.map(item => ({
                    time: new Date(item.date).getTime() / 1000,
                    open: parseFloat(item.open),
                    high: parseFloat(item.high),
                    low: parseFloat(item.low),
                    close: parseFloat(item.close)
                })).filter(item => 
                    !isNaN(item.open) && 
                    !isNaN(item.high) && 
                    !isNaN(item.low) && 
                    !isNaN(item.close)
                );

                if (chartData.length === 0) throw new Error('No valid data points');
                setData(chartData);
            } catch (error) {
                console.error('Error fetching data:', error);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [symbol, timeframe]);

    // Helper function to calculate EMA
    const calculateEMA = (data, index, period) => {
        if (!data || data.length === 0 || index < period - 1) return 0;
        
        const k = 2 / (period + 1);
        let ema = data[index].close;
        
        for (let i = index - 1; i >= Math.max(0, index - period + 1); i--) {
            if (data[i] && typeof data[i].close === 'number') {
                ema = data[i].close * k + ema * (1 - k);
            }
        }
        
        return ema;
    };

    // Calculate indicators
    const calculateIndicators = (data) => {
        if (!data || data.length === 0) return { smc: [], ict: [] };

        // Calculate SMC (Simple Moving Average)
        const smcPeriod = 20;
        const smcData = data.map((item, index) => {
            if (index < smcPeriod - 1) return null;
            const sum = data.slice(index - smcPeriod + 1, index + 1).reduce((acc, curr) => acc + curr.close, 0);
            return {
                time: item.time,
                value: sum / smcPeriod
            };
        }).filter(item => item !== null);

        // Calculate ICT (Enhanced Technical Analysis)
        const ictPeriod = 14;
        const ictData = data.map((item, index) => {
            if (index < ictPeriod) return null;
            
            // Calculate RSI
            let gains = 0;
            let losses = 0;
            
            for (let i = index - ictPeriod + 1; i <= index; i++) {
                if (data[i] && data[i-1]) {
                    const change = data[i].close - data[i - 1].close;
                    if (change >= 0) {
                        gains += change;
                    } else {
                        losses -= change;
                    }
                }
            }
            
            const avgGain = gains / ictPeriod;
            const avgLoss = losses / ictPeriod;
            const rs = avgLoss === 0 ? 100 : avgGain / avgLoss;
            const rsi = 100 - (100 / (1 + rs));

            // Calculate MACD
            const ema12 = calculateEMA(data, index, 12);
            const ema26 = calculateEMA(data, index, 26);
            const macd = ema12 - ema26;
            
            // Calculate Signal Line (9-period EMA of MACD)
            const macdData = data.slice(Math.max(0, index - 25), index + 1).map(d => ({
                close: macd
            }));
            const signal = calculateEMA(macdData, macdData.length - 1, 9);
            const macdHistogram = macd - signal;

            // Calculate Bollinger Bands
            const bbPeriod = 20;
            const bbData = data.slice(Math.max(0, index - bbPeriod + 1), index + 1);
            const bbSMA = bbData.reduce((acc, curr) => acc + curr.close, 0) / bbData.length;
            const bbStdDev = Math.sqrt(bbData.reduce((acc, curr) => acc + Math.pow(curr.close - bbSMA, 2), 0) / bbData.length);
            const bbUpper = bbSMA + (2 * bbStdDev);
            const bbLower = bbSMA - (2 * bbStdDev);

            // Calculate Stochastic Oscillator
            const stochPeriod = 14;
            const stochData = data.slice(Math.max(0, index - stochPeriod + 1), index + 1);
            const highestHigh = Math.max(...stochData.map(d => d.high));
            const lowestLow = Math.min(...stochData.map(d => d.low));
            const stochK = highestHigh === lowestLow ? 50 : ((item.close - lowestLow) / (highestHigh - lowestLow)) * 100;
            
            // Calculate Stochastic %D (3-period SMA of %K)
            const stochDData = stochData.map(d => ({
                close: stochK
            }));
            const stochD = calculateEMA(stochDData, stochDData.length - 1, 3);

            return {
                time: item.time,
                rsi: rsi,
                macd: macd,
                signal: signal,
                histogram: macdHistogram,
                bbUpper: bbUpper,
                bbMiddle: bbSMA,
                bbLower: bbLower,
                stochK: stochK,
                stochD: stochD
            };
        }).filter(item => item !== null);

        return { smc: smcData, ict: ictData };
    };

    // Separate effect for chart initialization and updates
    useEffect(() => {
        if (!data || !chartContainerRef.current) return;

        let chart = null;
        let candlestickSeries = null;
        let smcSeries = null;
        let bbUpperSeries = null;
        let bbMiddleSeries = null;
        let bbLowerSeries = null;

        const initChart = () => {
            try {
                // Clear previous chart if it exists
                if (chartRef.current) {
                    chartRef.current.remove();
                    chartRef.current = null;
                }

                // Create new chart
                chart = createChart(chartContainerRef.current, {
                    width: chartContainerRef.current.clientWidth,
                    height: 600,
                    layout: {
                        background: { color: '#131722' },
                        textColor: '#d1d4dc',
                    },
                    grid: {
                        vertLines: { color: 'rgba(42, 46, 57, 0.5)' },
                        horzLines: { color: 'rgba(42, 46, 57, 0.5)' },
                    },
                    timeScale: {
                        timeVisible: true,
                        secondsVisible: false,
                        borderColor: '#485c7b',
                    },
                    rightPriceScale: {
                        borderColor: '#485c7b',
                        scaleMargins: {
                            top: 0.1,
                            bottom: 0.1,
                        },
                    },
                });

                // Store the chart reference
                chartRef.current = chart;

                // Add candlestick series
                candlestickSeries = chart.addCandlestickSeries({
                    upColor: '#00ff96',
                    downColor: '#ff4757',
                    borderVisible: false,
                    wickUpColor: '#00ff96',
                    wickDownColor: '#ff4757',
                });

                // Add SMC indicator (20-period SMA)
                smcSeries = chart.addLineSeries({
                    color: '#2962FF',
                    lineWidth: 2,
                    title: 'SMC (20 SMA)',
                    priceLineVisible: false,
                });

                // Add Bollinger Bands
                bbUpperSeries = chart.addLineSeries({
                    color: '#00ff96',
                    lineWidth: 1,
                    title: 'BB Upper',
                    priceLineVisible: false,
                });

                bbMiddleSeries = chart.addLineSeries({
                    color: '#d1d4dc',
                    lineWidth: 1,
                    title: 'BB Middle',
                    priceLineVisible: false,
                });

                bbLowerSeries = chart.addLineSeries({
                    color: '#ff4757',
                    lineWidth: 1,
                    title: 'BB Lower',
                    priceLineVisible: false,
                });

                return true;
            } catch (error) {
                console.error('Error initializing chart:', error);
                if (chart) {
                    chart.remove();
                }
                return false;
            }
        };

        // Initialize chart
        if (!initChart()) {
            setError('Failed to initialize chart');
            return;
        }

        try {
            // Set the data
            candlestickSeries.setData(data);
            
            // Calculate and set indicators
            const { smc, ict } = calculateIndicators(data);
            
            // Show indicators based on indicatorType
            if (indicatorType === 'SMC') {
                smcSeries.setData(smc);
                bbUpperSeries.setData([]);
                bbMiddleSeries.setData([]);
                bbLowerSeries.setData([]);
            } else if (indicatorType === 'ICT') {
                smcSeries.setData([]);
                // Only show Bollinger Bands for ICT
                const bbData = ict.map(item => ({
                    time: item.time,
                    value: item.bbUpper
                }));
                const bbMiddleData = ict.map(item => ({
                    time: item.time,
                    value: item.bbMiddle
                }));
                const bbLowerData = ict.map(item => ({
                    time: item.time,
                    value: item.bbLower
                }));
                bbUpperSeries.setData(bbData);
                bbMiddleSeries.setData(bbMiddleData);
                bbLowerSeries.setData(bbLowerData);
            } else {
                smcSeries.setData([]);
                bbUpperSeries.setData([]);
                bbMiddleSeries.setData([]);
                bbLowerSeries.setData([]);
            }

            chart.timeScale().fitContent();

            // Handle window resize
            const handleResize = () => {
                if (chartRef.current) {
                    chartRef.current.applyOptions({
                        width: chartContainerRef.current.clientWidth
                    });
                }
            };

            window.addEventListener('resize', handleResize);

            // Cleanup
            return () => {
                window.removeEventListener('resize', handleResize);
                if (chartRef.current) {
                    chartRef.current.remove();
                    chartRef.current = null;
                }
            };
        } catch (error) {
            console.error('Error setting chart data:', error);
            setError('Failed to set chart data');
            if (chart) {
                chart.remove();
            }
        }
    }, [data, indicatorType]);

    if (loading) {
        return (
            <div className="nepse-chart-container" style={{ 
                display: 'flex', 
                justifyContent: 'center', 
                alignItems: 'center',
                height: '600px',
                backgroundColor: '#131722',
                borderRadius: '8px',
                padding: '20px'
            }}>
                <div style={{ color: '#d1d4dc' }}>Loading chart data for {symbol}...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="nepse-chart-container" style={{ 
                display: 'flex', 
                justifyContent: 'center', 
                alignItems: 'center',
                height: '600px',
                backgroundColor: '#131722',
                borderRadius: '8px',
                padding: '20px'
            }}>
                <div style={{ color: '#ff4757' }}>Error: {error}</div>
            </div>
        );
    }

    return (
        <div className="nepse-chart-container">
            <div style={{ 
                color: '#d1d4dc', 
                fontSize: '1.2rem', 
                marginBottom: '10px',
                textAlign: 'left'
            }}>
                {symbol} - {timeframe === 'D' ? 'Daily' : timeframe === 'W' ? 'Weekly' : timeframe === '60' ? '1 Hour' : '15 Minutes'} Chart
            </div>
            <div 
                ref={chartContainerRef}
                style={{ 
                    width: '100%',
                    height: '600px',
                    backgroundColor: '#131722',
                    borderRadius: '8px',
                    padding: '20px'
                }}
            />
        </div>
    );
};

export default NepseChart;
