import React, { useState, useEffect, useRef } from 'react';
import './LearningPage.css';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/footer';
import Header from '../../components/header/header';
import { Link } from 'react-router-dom';
import axios from '../../utils/axios'; // Import our configured axios instance
import defaultChapterImage from '../../assets/images/LearnToTrade/chapter1.png'; // Import the default image
import chapter1Image from '../../assets/images/LearnToTrade/chapter1.png';
import chapter2Image from '../../assets/images/LearnToTrade/chapter2.png';
import chapter3Image from '../../assets/images/LearnToTrade/chapter3.png';
import chapter4Image from '../../assets/images/LearnToTrade/chapter4.png';
import chapter5Image from '../../assets/images/LearnToTrade/chapter5.png';
import chapter6Image from '../../assets/images/LearnToTrade/chapter6.png';
import chapter7Image from '../../assets/images/LearnToTrade/chapter7.png';
import chapter8Image from '../../assets/images/LearnToTrade/chapter8.png';
import chapter9Image from '../../assets/images/LearnToTrade/chapter9.png';
import chapter10Image from '../../assets/images/LearnToTrade/chapter10.png';
import chapter11Image from '../../assets/images/LearnToTrade/chapter11.png';
import chapter12Image from '../../assets/images/LearnToTrade/chapter12.png';

// Helper function to ensure consistent chapter ID comparison
const parseChapterId = (id) => {
    return typeof id === 'string' ? parseInt(id) : id;
};

const getChapterImage = (chapterId) => {
    switch (chapterId) {
        case 1: return chapter1Image;
        case 2: return chapter2Image;
        case 3: return chapter3Image;
        case 4: return chapter4Image;
        case 5: return chapter5Image;
        case 6: return chapter6Image;
        case 7: return chapter7Image;
        case 8: return chapter8Image;
        case 9: return chapter9Image;
        case 10: return chapter10Image;
        case 11: return chapter11Image;
        case 12: return chapter12Image;
        default: return defaultChapterImage;
    }
};

const getChapterDescription = (chapterId) => {
    switch (chapterId) {
        case 1:
            return "Learn the fundamentals of forex trading, including market basics, currency pairs, and essential terminology.";
        case 2:
            return "Master the art of reading and interpreting price charts, understanding different timeframes and chart types.";
        case 3:
            return "Explore support and resistance levels, trend lines, and how to identify key market levels for trading decisions.";
        case 4:
            return "Discover advanced chart patterns like head and shoulders, double tops/bottoms, and continuation patterns.";
        case 5:
            return "Learn about technical indicators including moving averages, RSI, MACD, and how to use them effectively.";
        case 6:
            return "Understand crucial risk management principles, position sizing, and how to protect your trading capital.";
        case 7:
            return "Master trading psychology, emotional control, and develop the mindset needed for successful trading.";
        case 8:
            return "Learn how to develop and test your own trading strategy, including entry and exit rules.";
        case 9:
            return "Explore different trading platforms, tools, and software that can enhance your trading experience.";
        case 10:
            return "Dive into advanced trading concepts like leverage, margin, swap rates, and market microstructure.";
        case 11:
            return "Learn about professional trading systems, automated trading, and portfolio management strategies.";
        case 12:
            return "Master advanced trading techniques, market analysis, and strategies for consistent profitability.";
        default:
            return "No description available";
    }
};

const LearningPage = () => {
    const [currentChapter, setCurrentChapter] = useState(0); // Start with 0 for the landing page
    const [completedChapters, setCompletedChapters] = useState([]); // Track completed chapters from the database
    const [scrollProgress, setScrollProgress] = useState(0); // Track scroll progress
    const [chapters, setChapters] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const chapterContentRef = useRef(null); // Reference to the chapter content
    const [hasReadEntireChapter, setHasReadEntireChapter] = useState(false); // Track if user has read the entire chapter
    const [progressUpdated, setProgressUpdated] = useState(false); // Track if progress has been updated

    // Fetch learning content
    useEffect(() => {
        const fetchContent = async () => {
            try {
                const response = await axios.get('/learning/content');
                if (response.data.success) {
                    // Ensure all chapters have numeric IDs and are sorted
                    const processedChapters = response.data.data
                        .map(chapter => ({
                            ...chapter,
                            id: parseInt(chapter.chapter)
                        }))
                        .sort((a, b) => a.id - b.id);
                    setChapters(processedChapters);
                    console.log('Fetched chapters:', processedChapters);
                } else {
                    setError('Failed to fetch learning content');
                }
            } catch (error) {
                console.error('Error fetching content:', error);
                setError('Error fetching learning content');
            } finally {
                setLoading(false);
            }
        };

        fetchContent();
    }, []);

    // Fetch user progress
    useEffect(() => {
        const fetchProgress = async () => {
            try {
                const response = await axios.get('/learning/progress');
                if (response.data.success) {
                    // Ensure all chapter IDs are numbers
                    const completed = response.data.progress.completedChapters
                        .map(id => parseInt(id))
                        .filter(id => !isNaN(id)); // Filter out any invalid numbers
                    setCompletedChapters(completed);
                    console.log('Fetched completed chapters:', completed);
                }
            } catch (error) {
                console.error('Error fetching progress:', error);
                // Initialize with empty array if there's an error
                setCompletedChapters([]);
            }
        };

        fetchProgress();
    }, []);

    // Update progress when progressUpdated changes
    useEffect(() => {
        if (progressUpdated) {
            // Fetch the latest progress after an update
            const fetchLatestProgress = async () => {
                try {
                    const response = await axios.get('/learning/progress');
                    if (response.data.success) {
                        const completed = response.data.progress.completedChapters || [];
                        setCompletedChapters(completed);
                        console.log('Updated completed chapters:', completed);
                    }
                } catch (error) {
                    console.error('Error fetching latest progress:', error);
                }
            };

            fetchLatestProgress();
            setProgressUpdated(false);
        }
    }, [progressUpdated]);

    const updateProgress = async (chapterId) => {
        // Only update if the chapter hasn't been completed yet
        if (!completedChapters.includes(chapterId)) {
            try {
                // Create a new array with the current chapter added
                const updatedCompletedChapters = [...completedChapters, chapterId].sort((a, b) => a - b);
                
                console.log('Updating progress:', {
                    currentChapterId: chapterId,
                    updatedCompletedChapters
                });

                // Update the backend
                const response = await axios.post('/learning/progress', { 
                    completedChapters: updatedCompletedChapters,
                    lastAccessedChapter: chapterId
                });
                
                if (response.data.success) {
                    // Update local state immediately for better UX
                    setCompletedChapters(updatedCompletedChapters);
                    console.log(`Chapter ${chapterId} marked as completed`);
                    setProgressUpdated(true);
                } else {
                    console.error('Failed to update progress:', response.data);
                }
        } catch (error) {
                console.error('Error updating progress:', error);
            }
        }
    };

    const startLearning = () => {
        setCurrentChapter(1);
    };

    const nextChapter = async () => {
        if (currentChapter < chapters.length) {
            try {
                const numericCurrentChapter = parseChapterId(currentChapter);
                const updatedCompletedChapters = [...completedChapters];
                
                if (!updatedCompletedChapters.includes(numericCurrentChapter)) {
                    updatedCompletedChapters.push(numericCurrentChapter);
                    setCompletedChapters(updatedCompletedChapters);
                    
                    // Update backend
                    await axios.post('/learning/progress', {
                        completedChapters: updatedCompletedChapters,
                        lastAccessedChapter: numericCurrentChapter + 1
                    });

                    console.log('Chapter marked as completed:', numericCurrentChapter);
                    console.log('Updated completed chapters:', updatedCompletedChapters);
                }

                // Check if we need to redirect to a quiz
                if (numericCurrentChapter === 4) {
                    // Redirect to beginner quiz after chapter 4
                    window.location.href = '/quiz/beginner';
                    return;
                } else if (numericCurrentChapter === 8) {
                    // Redirect to intermediate quiz after chapter 8
                    window.location.href = '/quiz/intermediate';
                    return;
                } else if (numericCurrentChapter === 12) {
                    // Redirect to advanced quiz after chapter 12
                    window.location.href = '/quiz/advanced';
                    return;
                }

                // Move to next chapter if not redirecting to quiz
                setCurrentChapter(numericCurrentChapter + 1);
                setHasReadEntireChapter(false);
                setProgressUpdated(true);
            } catch (error) {
                console.error('Error updating chapter progress:', error);
            }
        }
    };

    const prevChapter = () => {
        if (currentChapter > 1) {
            setCurrentChapter(currentChapter - 1);
            setHasReadEntireChapter(false); // Reset the read status for the previous chapter
        }
    };

    const goToChapterList = () => {
        // Mark current chapter as completed when returning to chapter list
        if (currentChapter > 0 && !completedChapters.includes(currentChapter)) {
            // Directly update the completedChapters state for immediate UI feedback
            const updatedCompletedChapters = [...completedChapters, currentChapter];
            setCompletedChapters(updatedCompletedChapters);
            
            // Then update the backend
            updateProgress(currentChapter);
        }
        setCurrentChapter(0);
    };

    const accessChapter = (chapterId) => {
        // Ensure chapterId is a number
        const numericChapterId = parseInt(chapterId);
        
        console.log('Attempting to access chapter:', numericChapterId);
        console.log('Current completed chapters:', completedChapters);
        
        // Chapter 1 is always accessible
        if (numericChapterId === 1) {
            setCurrentChapter(numericChapterId);
            setHasReadEntireChapter(false);
            return;
        }

        // For other chapters, check if previous chapter is completed
        const previousChapterCompleted = completedChapters.includes(numericChapterId - 1);
        
        if (previousChapterCompleted || completedChapters.includes(numericChapterId)) {
            setCurrentChapter(numericChapterId);
            setHasReadEntireChapter(false);
            console.log('Chapter access granted');
        } else {
            console.log('Chapter access denied - Complete previous chapter first');
        }
    };

    const progressPercentage = Math.round((completedChapters.length / chapters.length) * 100);

    // Update progress when chapter is read
    useEffect(() => {
        const handleScrollEvent = () => {
            if (!chapterContentRef.current) return;

            const { scrollTop, scrollHeight, clientHeight } = chapterContentRef.current;
            const scrollPercentage = (scrollTop / (scrollHeight - clientHeight)) * 100;
            setScrollProgress(scrollPercentage);

            // Mark chapter as completed when user reaches the bottom
            if (scrollPercentage > 90 && !hasReadEntireChapter && currentChapter > 0) {
                setHasReadEntireChapter(true);
                updateProgress(currentChapter);
            }
        };

        const contentElement = chapterContentRef.current;
        if (contentElement) {
            contentElement.addEventListener('scroll', handleScrollEvent);
            return () => contentElement.removeEventListener('scroll', handleScrollEvent);
        }
    }, [currentChapter, hasReadEntireChapter, completedChapters]);

    const renderQuizBox = (groupIndex) => {
        // Determine quiz type and required chapters based on group index
        const quizType = groupIndex === 1 ? 'Beginner' : 
                        groupIndex === 2 ? 'Intermediate' : 'Advanced';
        
        // Define required chapters for each quiz
        const requiredChapters = {
            'Beginner': [1, 2, 3, 4],
            'Intermediate': [5, 6, 7, 8],
            'Advanced': [9, 10, 11, 12]
        };

        // Check if all required chapters are completed
        const isUnlocked = requiredChapters[quizType].every(chapter => 
            completedChapters.includes(chapter)
        );

        // Check if this quiz is required before proceeding
        const isRequired = isUnlocked && (
            (quizType === 'Beginner' && !completedChapters.includes(5)) ||
            (quizType === 'Intermediate' && !completedChapters.includes(9)) ||
            (quizType === 'Advanced' && completedChapters.includes(12))
        );

        // Debug log
        console.log(`${quizType} Quiz Status:`, {
            requiredChapters: requiredChapters[quizType],
            completedChapters,
            isUnlocked,
            isRequired
        });

        return (
            <div className={`quiz-box ${isUnlocked ? '' : 'locked'} ${isRequired ? 'required' : ''}`}>
                <h3>{quizType} Quiz</h3>
                {isUnlocked ? (
                    <div className="quiz-content">
                    <Link to={`/quiz/${quizType.toLowerCase()}`} className="quiz-btn">
                        Take {quizType} Quiz
                    </Link>
                        {isRequired && (
                            <p className="quiz-required-message">
                                Complete this quiz to unlock the next section
                            </p>
                        )}
                    </div>
                ) : (
                    <div className="quiz-lock-info">
                        <p>Complete chapters {requiredChapters[quizType].join(', ')} to unlock</p>
                        <div className="quiz-progress">
                            <span className="completed">
                                {requiredChapters[quizType].filter(ch => completedChapters.includes(ch)).length}
                            </span>
                            /{requiredChapters[quizType].length} chapters completed
                        </div>
                    </div>
                )}
            </div>
        );
    };

    const renderChapterBlocks = () => {
        if (!chapters || chapters.length === 0) return null;

        // Group chapters into sets of 4
        const chapterGroups = [];
        for (let i = 0; i < chapters.length; i += 4) {
            chapterGroups.push(chapters.slice(i, i + 4));
        }

        console.log('Rendering chapters with completed:', completedChapters);

        return chapterGroups.map((group, groupIndex) => {
            const sectionTitle = groupIndex === 0 ? 'Beginner' : 
                               groupIndex === 1 ? 'Intermediate' : 'Advanced';

            return (
                <div key={groupIndex} className="chapter-section">
                    <h2 className="section-title">{sectionTitle}</h2>
                    <div className="chapter-overview">
                        {group.map((chapter) => {
                            const chapterId = parseInt(chapter.id);
                            
                            // First chapter is never locked, others are locked if previous chapter is not completed
                            const isLocked = chapterId !== 1 && !completedChapters.includes(chapterId - 1);
                            const isCompleted = completedChapters.includes(chapterId);

                            console.log(`Chapter ${chapterId} status:`, {
                                isLocked,
                                isCompleted,
                                completedChapters,
                                previousChapterCompleted: completedChapters.includes(chapterId - 1)
                            });

                            return (
                                <div 
                                    key={chapterId}
                                    className={`chapter-card ${isLocked ? 'locked' : ''}`}
                                    onClick={() => !isLocked && accessChapter(chapterId)}
                                >
                                    <div className="chapter-image">
                                        <img 
                                            src={getChapterImage(chapterId)} 
                                            alt={`Chapter ${chapterId}`}
                                            onError={(e) => {
                                                e.target.onerror = null;
                                                e.target.src = defaultChapterImage;
                                            }}
                                        />
                                        {isLocked && (
                                            <div className="lock-overlay">
                                                <i className="fas fa-lock"></i>
                        </div>
                                        )}
                                    </div>
                                    <div className="chapter-info">
                                        <h3>Chapter {chapterId}: {chapter.title}</h3>
                                        <p>{getChapterDescription(chapterId)}</p>
                                        {isCompleted && (
                                            <div className="completed-badge">Completed</div>
                                        )}
                                    </div>
                </div>
            );
                        })}
                    </div>
                    {renderQuizBox(groupIndex + 1)}
                </div>
            );
        });
    };

    const renderChapterContent = () => {
        const currentChapterData = chapters[currentChapter - 1];
        return (
            <div className="chapter-page">
                <div className="scroll-tracker">
                    <div 
                        className="scroll-progress-bar" 
                        style={{ height: `${scrollProgress}%` }}
                    />
                </div>
                <h1>Chapter {currentChapter}: {currentChapterData.title}</h1>
                <div className="chapter-content">
                    <img 
                        src={getChapterImage(currentChapter)} 
                        alt={currentChapterData.title || 'Chapter'} 
                        className="chapter-image"
                        onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = defaultChapterImage;
                        }}
                    />
                    <div className="chapter-text">
                        {currentChapterData.content.split('\n').map((paragraph, index) => (
                            <p key={index}>{paragraph.trim()}</p>
                        ))}
                    </div>
                </div>
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

    // Add a debug function to help troubleshoot
    useEffect(() => {
        console.log('Current completed chapters:', completedChapters);
        console.log('Current chapter:', currentChapter);
    }, [completedChapters, currentChapter]);

    if (loading) {
        return <div className="loading">Loading...</div>;
    }

    if (error) {
        return <div className="error">Error: {error}</div>;
    }

    return (
        <div className="learning-page">
            <Header />
            <Navbar />
            <div className="learning-container">
                {currentChapter === 0 ? (
                    <div className="landing-page">
                        <h1>Welcome to the Learning Journey</h1>
                        <p>Track your progress and master the art of trading with our comprehensive chapters.</p>
                        <button onClick={startLearning} className="start-learning-btn">Start Learning</button>
                        {renderChapterBlocks()}
                        <div className="progress-bar-container">
                            <div className="progress-bar" style={{ width: `${progressPercentage}%` }}></div>
                            <p>{progressPercentage}% Complete</p>
                        </div>
                    </div>
                ) : (
                    renderChapterContent()
                )}
            </div>
            <Footer />
        </div>
    );
};

export default LearningPage;