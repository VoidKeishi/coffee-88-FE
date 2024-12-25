import React, { useState, useEffect } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { AiFillStar, AiOutlineStar, AiOutlineEnvironment, AiOutlineClockCircle, AiFillHeart } from 'react-icons/ai';
import Header from '../components/header/Header';
import './favorite.css';
import { useTranslation } from 'react-i18next';
import API_BASE_URL from '../apiConfig';
import { useAuth } from '../context/AuthContext';

function Favorite() {
    const { t } = useTranslation();
    const [favoriteCafes, setFavoriteCafes] = useState([]);
    const [loading, setLoading] = useState(true);
    const { user } = useAuth();

    useEffect(() => {
        const fetchFavorites = async () => {
            if (!user) return;

            try {
                // First, get the list of favorite IDs
                const favoriteResponse = await fetch(`${API_BASE_URL}users/favourite/list`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ userId: user.id }),
                });
                const favoriteIds = await favoriteResponse.json();

                // Handle the array of numbers directly
                const cafeDetailsPromises = favoriteIds.map(cafeId => 
                    fetch(`${API_BASE_URL}cafes/detail/${cafeId}`).then(res => res.json())
                );
                
                const cafeDetails = await Promise.all(cafeDetailsPromises);
                setFavoriteCafes(cafeDetails);
            } catch (error) {
                console.error('Error fetching favorites:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchFavorites();
    }, [user]);

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

    if (!user) {
        return <Navigate to="/login" />;
    }

    if (loading) {
        return (
            <>
                <Header />
                <div className="favorite-container">
                    <h1>{t('favoriteCafes')}</h1>
                    <div>Loading...</div>
                </div>
            </>
        );
    }

    return (
        <>
            <Header />
            <div className="favorite-container">
                <h1>{t('favoriteCafes')}</h1>
                {favoriteCafes.length === 0 ? (
                    <div className="empty-state">
                        <p>{t('Your favorites list is currently empty')}</p>
                        <Link to="/" className="browse-link">
                            {t('Browse cafes')} ☕
                        </Link>
                    </div>
                ) : (
                    <div className="favorite-grid">
                        {favoriteCafes.map(cafe => (
                            <Link to={`/detail/${cafe.id}`} key={cafe.id} className="favorite-card">
                                <div className="favorite-image">
                                    <img src={cafe.image_urls[0]} alt={cafe.name} />
                                    <AiFillHeart className="favorite-icon" />
                                </div>
                                <div className="favorite-info">
                                    <h2>{cafe.name}</h2>
                                    <div className="rating">
                                        {renderStars(cafe.google_rating)}
                                        <span>({cafe.google_rating})</span>
                                    </div>
                                    <div className="info-item">
                                        <AiOutlineEnvironment />
                                        <span>{cafe.address}</span>
                                    </div>
                                    <div className="info-item">
                                        <AiOutlineClockCircle />
                                        <span>{`${cafe.opening_time} - ${cafe.closing_time}`}</span>
                                    </div>
                                    <p className="description">{cafe.description}</p>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </>
    );
}

export default Favorite;