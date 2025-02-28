import React, { useState } from 'react';
import './LearningPage.css';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/footer';
import Header from '../../components/header/header';
import { Link } from 'react-router-dom';

const chapters = [
    { id: 1, title: 'Market Fundamentals', content: '...', image: require('../../assets/images/LearnToTrade/chapter1.jpg') },
    { id: 2, title: 'Technical Analysis', content: '...', image: require('../../assets/images/LearnToTrade/chapter2.jpg') },
    { id: 3, title: 'Risk Management', content: '...', image: require('../../assets/images/LearnToTrade/chapter3.jpg') },
    { id: 4, title: 'Trading Psychology', content: '...', image: require('../../assets/images/LearnToTrade/chapter4.jpg') },
    { id: 5, title: 'Advanced Strategies', content: '...', image: require('../../assets/images/LearnToTrade/chapter5.jpg') }
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
                <p>{chapters[currentChapter - 1].content}</p>
                
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

             {/* Horizontal Line */}
             <hr className="section-divider" />
            
            <Footer />
        </div>
    );
};

export default LearningPage;
