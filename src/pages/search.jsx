import React, { useState, useEffect } from 'react';
import { FaStar, FaSort } from 'react-icons/fa';
import Header from '../components/header/Header';
import './search.css';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import API_BASE_URL from '../apiConfig';

function Search() {
    const { t, i18n } = useTranslation();
    const [showSortOptions, setShowSortOptions] = useState(false);
    const [sortOptions, setSortOptions] = useState([
        t('mostRelevant'),
        t('highestRating'),
        t('bestSelling'),
        t('closestDistance'),
        t('priceLowToHigh'),
        t('priceHighToLow')
    ]);
    const [selectedSort, setSelectedSort] = useState(sortOptions[0]);
    const [searchResults, setSearchResults] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();
    const location = useLocation();
    const searchQuery = new URLSearchParams(location.search).get('q');

    useEffect(() => {
        // Cập nhật sortOptions khi ngôn ngữ thay đổi
        const newSortOptions = [
            t('mostRelevant'),
            t('highestRating'),
            t('bestSelling'),
            t('closestDistance'),
            t('priceLowToHigh'),
            t('priceHighToLow')
        ];

        // Tìm chỉ mục của selectedSort hiện tại trong danh sách cũ
        const currentIndex = sortOptions.findIndex(option => option === selectedSort);

        // Cập nhật sortOptions và selectedSort tương ứng với ngôn ngữ mới
        setSortOptions(newSortOptions);
        if (currentIndex >= 0) {
            setSelectedSort(newSortOptions[currentIndex]);
        } else {
            setSelectedSort(newSortOptions[0]); // Mặc định nếu không tìm thấy
        }
    }, [i18n.language, t]);

    useEffect(() => {
        const fetchResults = async () => {
            if (!searchQuery) return;

            setIsLoading(true);
            try {
                const response = await fetch(`${API_BASE_URL}cafes/search/${encodeURIComponent(searchQuery)}`);
                const data = await response.json();
                setSearchResults(data);
            } catch (error) {
                console.error('Error fetching search results:', error);
                setSearchResults([]);
            } finally {
                setIsLoading(false);
            }
        };

        fetchResults();
    }, [searchQuery]);

    const sortResults = (results, sortType) => {
        const sorted = [...results];
        switch (sortType) {
            case t('highestRating'):
                return sorted.sort((a, b) => b.google_rating - a.google_rating);
            case t('priceLowToHigh'):
                return sorted.sort((a, b) => {
                    const getMinPrice = (cafe) => Math.min(...cafe.drinks.map(d => parseFloat(d.price)));
                    return getMinPrice(a) - getMinPrice(b);
                });
            case t('priceHighToLow'):
                return sorted.sort((a, b) => {
                    const getMaxPrice = (cafe) => Math.max(...cafe.drinks.map(d => parseFloat(d.price)));
                    return getMaxPrice(b) - getMaxPrice(a);
                });
            case t('closestDistance'):
                return sorted.sort((a, b) => parseFloat(a.distance_from_sun) - parseFloat(b.distance_from_sun));
            default:
                return sorted;
        }
    };

    const handleSortSelect = (option) => {
        setSelectedSort(option);
        setSearchResults(prev => sortResults(prev, option));
        setShowSortOptions(false);
    };

    const renderStars = (rating) => {
        return [...Array(5)].map((_, index) => (
            <FaStar 
                key={index}
                className={index < Math.floor(rating) ? "star-filled" : "star-empty"}
            />
        ));
    };

    const handleCafeClick = (cafeId) => {
        navigate(`/detail/${cafeId}`);
    };

    const formatPrice = (price) => {
        return new Intl.NumberFormat('vi-VN', { 
            style: 'currency', 
            currency: 'VND' 
        }).format(price);
    };

    return (
        <>
            <Header />
            <div className="search-results-container">
                <div className="search-header">
                    <div className="search-title">
                        <h2>{t('searchResultsFor')} <span>"{searchQuery}"</span></h2>
                        <p>{searchResults.length} {t('resultsFound')} </p>
                    </div>
                    
                    <div className="sort-container">
                        <span className="sort-label">{t('sortBy')}</span>
                        <div 
                            className="sort-button"
                            onClick={() => setShowSortOptions(!showSortOptions)}
                        >
                            <span>{selectedSort}</span>
                            <FaSort />
                        </div>
                        
                        {showSortOptions && (
                            <div className="sort-options">
                                {sortOptions.map((option) => (
                                    <div
                                        key={option}
                                        className={`sort-option ${selectedSort === option ? 'selected' : ''}`}
                                        onClick={() => handleSortSelect(option)}
                                    >
                                        {option}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {isLoading ? (
                    <div>Loading...</div>
                ) : (
                    <div className="results-grid">
                        {searchResults.map((item) => {
                            const minPrice = Math.min(...item.drinks.map(d => parseFloat(d.price)));
                            const maxPrice = Math.max(...item.drinks.map(d => parseFloat(d.price)));
                            
                            return (
                                <div 
                                    key={item.id} 
                                    className="result-card"
                                    onClick={() => handleCafeClick(item.id)}
                                    style={{ cursor: 'pointer' }}
                                >
                                    <div className="result-image">
                                        <img src={item.image_urls[0]} alt={item.name} />
                                        <div className="status-badge">
                                            {new Date().getHours() >= parseInt(item.opening_time) && 
                                             new Date().getHours() < parseInt(item.closing_time) 
                                                ? t('openNow') 
                                                : t('closed')}
                                        </div>
                                    </div>
                                    <div className="result-info">
                                        <h3>{item.name}</h3>
                                        <div className="rating-container">
                                            <div className="stars">
                                                {renderStars(parseFloat(item.google_rating))}
                                            </div>
                                            <span className="rating-number">{item.google_rating}</span>
                                        </div>
                                        <p className="address">{item.address}</p>
                                        <div className="additional-info">
                                            <span className="price-range">
                                                {formatPrice(minPrice)} - {formatPrice(maxPrice)}
                                            </span>
                                            <span className="distance">{item.distance_from_sun}km</span>
                                        </div>
                                        <div className="open-time">
                                            <span>{t('openingHours')}: {item.opening_time.substring(0,5)} - {item.closing_time.substring(0,5)}</span>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </>
    );
}

export default Search;
