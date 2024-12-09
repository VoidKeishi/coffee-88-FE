import React, { useState } from 'react';
import { FaSearch, FaUserCircle, FaGlobe, FaCaretDown } from 'react-icons/fa';
import './header.css';

const Header = () => {
    const [showLanguages, setShowLanguages] = useState(false);
    const [selectedLang, setSelectedLang] = useState('VN');

    const languages = [
        { code: 'VN', flag: '/vn-flag.png', name: 'Tiếng Việt' },
        { code: 'EN', flag: '/en-flag.jpg', name: 'English' },
        { code: 'JP', flag: '/jp-flag.png', name: '日本語' }
    ];

    const handleLanguageSelect = (langCode) => {
        setSelectedLang(langCode);
        setShowLanguages(false);
    };

    return (
        <header className="header">
            <div className="logo">
                <img src="/logo.jpg" alt="Logo" />
            </div>

            <div className="search-bar">
                <input type="text" placeholder="Tìm kiếm..." />
                <div className="search-icon">
                    <FaSearch />
                </div>
            </div>

            <div className="header-actions">
                <div className="language-selector">
                    <div 
                        className="selected-language" 
                        onClick={() => setShowLanguages(!showLanguages)}
                    >
                        <FaGlobe />
                        <span>{selectedLang}</span>
                        <FaCaretDown />
                    </div>
                    
                    {showLanguages && (
                        <div className="language-dropdown">
                            {languages.map((lang) => (
                                <div
                                    key={lang.code}
                                    className="language-option"
                                    onClick={() => handleLanguageSelect(lang.code)}
                                >
                                    <img src={lang.flag} alt={lang.name} />
                                    <span>{lang.name}</span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
                <div className="user-avatar">
                    <FaUserCircle />
                </div>
            </div>
        </header>
    );
};

export default Header;
