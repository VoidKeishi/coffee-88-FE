import React from 'react';
import { Link } from 'react-router-dom';
import { AiFillStar, AiOutlineStar, AiOutlineEnvironment, AiOutlineClockCircle, AiFillHeart } from 'react-icons/ai';
import Header from '../components/header/Header';
import './favorite.css';
import { useTranslation } from 'react-i18next';

function Favorite() {
    const { t } = useTranslation();
    // Mock data cho danh sách yêu thích
    const favoriteCafes = [
        {
            id: 1,
            name: "Highlands Coffee",
            image: "/highlands.jpg",
            address: "123 Nguyễn Huệ, Quận 1, TP.HCM",
            rating: 4.5,
            openHours: "07:00 - 22:30",
            description: "Không gian thoáng đãng, view đẹp..."
        },
        {
            id: 2,
            name: "The Coffee House",
            image: "/coffeehouse.jpg",
            address: "456 Lê Lợi, Quận 1, TP.HCM",
            rating: 4.3,
            openHours: "07:00 - 23:00",
            description: "Phong cách hiện đại, menu đa dạng..."
        },
        {
            id: 3,
            name: "Cộng Cà Phê",
            image: "/congcafe.jpg",
            address: "789 Đồng Khởi, Quận 1, TP.HCM",
            rating: 4.7,
            openHours: "08:00 - 22:00",
            description: "Phong cách retro độc đáo..."
        }
    ];

    const renderStars = (rating) => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            stars.push(
                i <= rating ? 
                    <AiFillStar key={i} className="star filled" /> : 
                    <AiOutlineStar key={i} className="star" />
            );
        }
        return stars;
    };

    return (
        <>
            <Header />
            <div className="favorite-container">
                <h1>{t('favoriteCafes')}</h1>
                <div className="favorite-grid">
                    {favoriteCafes.map(cafe => (
                        <Link to={`/detail/${cafe.id}`} key={cafe.id} className="favorite-card">
                            <div className="favorite-image">
                                <img src={cafe.image} alt={cafe.name} />
                                <AiFillHeart className="favorite-icon" />
                            </div>
                            <div className="favorite-info">
                                <h2>{cafe.name}</h2>
                                <div className="rating">
                                    {renderStars(cafe.rating)}
                                    <span>({cafe.rating})</span>
                                </div>
                                <div className="info-item">
                                    <AiOutlineEnvironment />
                                    <span>{cafe.address}</span>
                                </div>
                                <div className="info-item">
                                    <AiOutlineClockCircle />
                                    <span>{cafe.openHours}</span>
                                </div>
                                <p className="description">{cafe.description}</p>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </>
    );
}

export default Favorite; 