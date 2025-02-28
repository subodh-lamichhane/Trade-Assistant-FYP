import React from 'react';
import './CryptoPage.css';
import CryptoChart from "../../components/Charts/CryptoChart.js";
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/footer';
import Header from '../../components/header/header';


const CryptoPage = () => {
    return (
        <div className="markets-page">
            <Header />
            <Navbar />
         

            {/* Horizontal Line */}
            <hr className="section-divider" />

            <Footer />
        </div>
    );
};

export default CryptoPage;
