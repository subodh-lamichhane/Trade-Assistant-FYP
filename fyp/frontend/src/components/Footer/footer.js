import React, { useState } from "react";
import "./footer.css";
import { FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";

import Logo from '../../assets/images/TALogo.png';  

const Footer = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqs = [
    { question: "How accurate is Trade Assistant?", answer: "Trade Assistant uses AI models to predict market trends with high accuracy, though predictions are not guaranteed." },
    { question: "Is Trade Assistant free?", answer: "Trade Assistant offers free and premium plans with extra features in the premium version." },
    { question: "What markets can I find on Trade Assistant?", answer: "Trade Assistant covers stocks, forex, and cryptocurrency markets for comprehensive trading insights." },
    { question: "Can I trade directly from Trade Assistant?", answer: "Currently, Trade Assistant provides market analysis but does not support direct trading. However, future integrations with brokers may be possible." }
  ];

  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Left Section */}
        <div className="footer-left">
          <div className="footer-logo">
            <img src={Logo} alt="TA Logo" className="logo" />
            <h3>Trade Assistant</h3>
          </div>
          <div className="footer-socials">
            <h4>Socials</h4>
            <div className="social-icons">
              <FaInstagram />
              <FaTwitter />
              <FaYoutube />
            </div>
          </div>
          <div className="footer-general">
            <h4>General</h4>
            <ul>
              <li><a href="#">Contact Us</a></li>
              <li><a href="#">Privacy Policy</a></li>
              <li><a href="#">Terms of Service</a></li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="footer-divider"></div>

        {/* Right Section */}
        <div className="footer-right">
          <h3>Frequently Asked Questions</h3>
          <ul className="faq-list">
            {faqs.map((faq, index) => (
              <li key={index} className="faq-item">
                <div className="faq-question" onClick={() => toggleFAQ(index)}>
                  {faq.question}
                  <span className={`arrow ${openIndex === index ? "open" : ""}`}>▼</span>
                </div>
                {openIndex === index && <p className="faq-answer">{faq.answer}</p>}
                <div className="faq-underline"></div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
