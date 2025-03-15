import React, { useState } from "react";
import Navbar from "../../../components/Navbar/Navbar";
import Footer from "../../../components/Footer/footer";
import Header from "../../../components/header/header";
import NepseChart from "../../../components/Charts/NepseChart";

const NepsePage = () => {
    const [symbol, setSymbol] = useState("NEPSE:NABIL"); // Default Nepali stock symbol (example)

    return (
        <div className="markets-page">
            <Header />
            <Navbar />
            <h1>The Nepali Charts</h1>

            {/* Dropdown to Select Nepali Stock */}
            <select onChange={(e) => setSymbol(e.target.value)}>
                <option value="NEPSE:NABIL">Nabil Bank (NABIL)</option>
                <option value="NEPSE:ICFC">ICFC Finance (ICFC)</option>
                <option value="NEPSE:MAHA">Maha Lakshmi Finance (MAHA)</option>
                <option value="NEPSE:SIMEC">Simec Cement (SIMEC)</option>
            </select>

            {/* Display TradingView Chart */}
            <NepseChart symbol={symbol} />

            {/* Horizontal Line */}
            <hr className="section-divider" />           

            <Footer />
        </div>
    );
};

export default NepsePage;
