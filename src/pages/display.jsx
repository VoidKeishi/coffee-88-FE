import React, { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import DisplayHome from './displayhome';
import { AiOutlineArrowUp } from 'react-icons/ai';
import './display.css';

const Display = () => {
    const [showScroll, setShowScroll] = useState(false);

    useEffect(() => {
        const checkScrollTop = () => {
            setShowScroll(window.scrollY > 100);
        };
        window.addEventListener('scroll', checkScrollTop);
        return () => window.removeEventListener('scroll', checkScrollTop);
    }, []);

    const scrollTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div>
            <Routes>
                <Route path="/" element={<DisplayHome />} />
            </Routes>
            <button className={`scroll-top ${showScroll ? 'show' : ''}`} onClick={scrollTop}>
                <AiOutlineArrowUp />
            </button>
        </div>
    );
};

export default Display;
