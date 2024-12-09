import React, { useState } from 'react';
import { FaStar, FaSort } from 'react-icons/fa';
import Header from '../components/header/Header';
import './search.css';

function Search() {
    const [showSortOptions, setShowSortOptions] = useState(false);
    const [selectedSort, setSelectedSort] = useState('Liên quan nhất');

    const sortOptions = [
        'Liên quan nhất',
        'Đánh giá cao nhất',
        'Bán chạy nhất',
        'Khoảng cách gần nhất',
        'Giá thấp đến cao',
        'Giá cao đến thấp'
    ];

    const searchResults = [
        {
            id: 1,
            name: "Highlands Coffee - Nguyễn Huệ",
            image: "/highlands.jpg",
            rating: 4.5,
            reviews: 128,
            address: "123 Nguyễn Huệ, Quận 1, TP.HCM",
            distance: "0.5 km",
            status: "Đang mở cửa",
            priceRange: "20.000đ - 80.000đ",
            openTime: "07:00 - 22:00"
        },
        {
            id: 2,
            name: "Highlands Coffee - Lê Lợi",
            image: "/highlands.jpg",
            rating: 4.3,
            reviews: 95,
            address: "456 Lê Lợi, Quận 1, TP.HCM",
            distance: "0.8 km",
            status: "Đang mở cửa",
            priceRange: "20.000đ - 85.000đ",
            openTime: "07:00 - 22:30"
        },
        // Thêm kết quả khác...
    ];

    const handleSortSelect = (option) => {
        setSelectedSort(option);
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

    return (
        <>
            <Header />
            <div className="search-container">
                <div className="search-header">
                    <div className="search-title">
                        <h2>Kết quả tìm kiếm cho từ khóa: <span>"Highland"</span></h2>
                        <p>{searchResults.length} kết quả được tìm thấy</p>
                    </div>
                    
                    <div className="sort-container">
                        <span className="sort-label">Sắp xếp theo:</span>
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

                <div className="results-grid">
                    {searchResults.map((item) => (
                        <div key={item.id} className="result-card">
                            <div className="result-image">
                                <img src={item.image} alt={item.name} />
                                <div className="status-badge">{item.status}</div>
                            </div>
                            <div className="result-info">
                                <h3>{item.name}</h3>
                                <div className="rating-container">
                                    <div className="stars">
                                        {renderStars(item.rating)}
                                    </div>
                                    <span className="rating-number">{item.rating}</span>
                                    <span className="review-count">({item.reviews} đánh giá)</span>
                                </div>
                                <p className="address">{item.address}</p>
                                <div className="additional-info">
                                    <span className="price-range">{item.priceRange}</span>
                                    <span className="distance">{item.distance}</span>
                                </div>
                                <div className="open-time">
                                    <span>Giờ mở cửa: {item.openTime}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}

export default Search; 