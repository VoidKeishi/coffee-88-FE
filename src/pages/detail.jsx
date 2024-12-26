import React, { useState, useEffect } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { AiFillStar, AiOutlineStar, AiOutlineClockCircle, AiOutlinePhone, AiOutlineEnvironment, AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import Header from '../components/header/Header';
import './detail.css';
import API_BASE_URL from '../apiConfig';
import { useAuth } from '../context/AuthContext';
import { useTranslation } from 'react-i18next';

function Detail() {
    const {t} = useTranslation();
    const { id } = useParams();
    const [cafeData, setCafeData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isFavorite, setIsFavorite] = useState(false);
    const { user } = useAuth();

    useEffect(() => {
        const fetchCafeDetails = async () => {
            try {
                const [cafeResponse, favoriteResponse] = await Promise.all([
                    fetch(`${API_BASE_URL}cafes/detail/${id}`),
                    user ? fetch(`${API_BASE_URL}users/favourite/list`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ userId: user.id }),
                    }) : Promise.resolve({ json: () => [] })
                ]);
                
                const cafeData = await cafeResponse.json();
                const favorites = await favoriteResponse.json();
                setCafeData(cafeData);
                setIsFavorite(favorites.includes(parseInt(id)));
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchCafeDetails();
    }, [id, user]);

    const toggleFavorite = async () => {
        if (!user) {
            // Redirect to login if not authenticated
            return <Navigate to="/login" />;
        }

        try {
            const endpoint = isFavorite ? 'remove' : 'add';
            await fetch(`${API_BASE_URL}users/favourite/${endpoint}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userId: user.id,
                    cafeId: parseInt(id)
                }),
            });
            setIsFavorite(!isFavorite);
        } catch (error) {
            console.error('Error toggling favorite:', error);
        }
    };

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

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!cafeData) {
        return <div>Cafe not found</div>;
    }

    return (
        <>
            <Header />
            <div className="detail-container">
                <div className="detail-left">
                    <div className="cafe-image">
                         <img src={cafeData.image_urls[0]} alt={cafeData.name} />
                    </div>
                    <div className="cafe-info">
                        <div className="cafe-header">
                            <h1>{cafeData.name}</h1>
                            <button 
                                className="favorite-btn"
                                onClick={user ? toggleFavorite : () => <Navigate to="/login" />}
                            >
                                {isFavorite ? 
                                    <AiFillHeart className="heart-icon filled" /> : 
                                    <AiOutlineHeart className="heart-icon" />
                                }
                            </button>
                        </div>
                        <div className="rating">
                        {renderStars(cafeData.google_rating)}
                        <span className="rating-number">({cafeData.google_rating})</span>   
                        </div>
                        <div className="info-item">
                            <AiOutlineEnvironment className="info-icon" />
                            <span>{cafeData.address}</span>
                        </div>
                        <div className="info-item">
                            <AiOutlineClockCircle className="info-icon" />
                            <span>{`${cafeData.opening_time.slice(0,5)} - ${cafeData.closing_time.slice(0,5)}`}</span>
                        </div>
                    
                    </div>
                </div>

                <div className="detail-right">
                    <h2>{t('menu')}</h2>
                    <div className="menu-container">
                    {cafeData.drinks && cafeData.drinks.map((drink) => (
                            <div key={drink.id} className="menu-item">
                                <img src={drink.image_url} alt={drink.name} />
                                <div className="menu-item-info">
                                    <h3>{drink.name}</h3>
                                    <div className="menu-item-details">
                                    <span className="price">{`${new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(drink.price)}`}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}

export default Detail;