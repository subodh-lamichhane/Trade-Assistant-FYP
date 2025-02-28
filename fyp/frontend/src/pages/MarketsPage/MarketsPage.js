import React from 'react';
import './MarketsPage.css';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/footer';
import Header from '../../components/header/header';

// Import images
import CryptoImage from '../../assets/images/MarketsP/Crypto.png';  
import ForexImage from '../../assets/images/MarketsP/Forex.png';  
import NepseImage from '../../assets/images/MarketsP/Nepse.png';  

const MarketsPage = () => {
    return (
        <div className="markets-page">
            <Header />
            <Navbar />

            {/* Market Selection Section */}
            <section className="market-selection">
                <h2>Pick Your Preference</h2>
                <div className="market-container">
                    {/* Forex */}
                    <div className="market-box">
                        <h3 className="market-title forex-title">Forex</h3>
                        <img src={ForexImage} alt="Forex Market" className="market-image" />
                        <p>With trillions of dollars exchanged daily, the Forex market offers endless opportunities to trade and profit from currency price movements.</p>
                        <button className="market-button">Trade Forex</button>
                    </div>

                    {/* Crypto */}
                    <div className="market-box-c">
                        <h3 className="market-title crypto-title">Crypto</h3>
                        <img src={CryptoImage} alt="Crypto Market" className="market-image" />
                        <p>The crypto space is decentralized, highly volatile, and ever-evolving, presenting modern investors with exciting trading opportunities to trade Crypto coins.</p>
                        <button className="market-button">Trade Crypto</button>
                    </div>

                    {/* NEPSE */}
                    <div className="market-box-n">
                        <h3 className="market-title nepse-title">NEPSE</h3>
                        <img src={NepseImage} alt="Nepse Market" className="market-image" />
                        <p>NEPSE lets you invest in Nepal’s economy, offering a chance to build wealth while supporting local businesses and market growth for stocks listed on the NEPSE index.</p>
                        <button className="market-button">Trade NEPSE</button>
                    </div>
                </div>
            </section>

            {/* Horizontal Line */}
            <hr className="section-divider" />

            <Footer />
        </div>
    );
};

export default MarketsPage;
