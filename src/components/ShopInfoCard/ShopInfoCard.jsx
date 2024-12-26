import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import "./shopInfoCard.css";
import { useTranslation } from "react-i18next";
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { useAuth } from '../../context/AuthContext';
import API_BASE_URL from '../../apiConfig';

const ShopInfoCard = ({ products }) => {
    const { t } = useTranslation();
    const [visibleShops, setVisibleShops] = useState(6);
    const { user } = useAuth();
    const [favorites, setFavorites] = useState([]);

    const handleViewMore = () => {
        setVisibleShops(prev => prev + 6);
    };

    useEffect(() => {
        if (user) {
            fetchFavorites();
        }
    }, [user]);

    const fetchFavorites = async () => {
        if (!user) return;
        try {
            const response = await fetch(`${API_BASE_URL}users/favourite/list`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userId: user.id }),
            });
            const data = await response.json();
            setFavorites(data);
        } catch (error) {
            console.error('Error fetching favorites:', error);
        }
    };

    const toggleFavorite = async (e, productId) => {
        e.preventDefault();
        if (!user) return;
        
        try {
            const endpoint = favorites.includes(productId) ? 'remove' : 'add';
            await fetch(`${API_BASE_URL}users/favourite/${endpoint}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userId: user.id, cafeId: productId }),
            });
            await fetchFavorites();
        } catch (error) {
            console.error('Error toggling favorite:', error);
        }
    };

    const renderStars = (rating) => {
        const fullStars = Math.floor(rating); // Số lượng sao đầy
        const halfStars = rating % 1 >= 0.5 ? 1 : 0; // Nếu có phần thập phân >= 0.5 thì thêm nửa sao
        const emptyStars = 5 - fullStars - halfStars; // Số lượng sao rỗng

        return (
        <>
            {[...Array(fullStars)].map((_, index) => (
            <i key={`full-${index}`} className="fas fa-star"></i>
            ))}
            {halfStars > 0 && <i key="half" className="fas fa-star-half-alt"></i>}
            {[...Array(emptyStars)].map((_, index) => (
            <i key={`empty-${index}`} className="far fa-star"></i>
            ))}
        </>
        );
    };

    return (
        <div className="coffee-shop-section">
            <div id="list-shop-title">{t('coffeeShopList')}</div>
            <div className="coffee-shop-list">
                {products.slice(0, visibleShops).map((product, index) => (
                    <div className="coffee-shop" key={index}>
                        <Link to={`/detail/${product.id}`} className="shop-info-link">
                            <div className="coffee-shop-header">
                                <div className="image-container">
                                    <img
                                        src={product.image_urls && product.image_urls.length > 0 
                                            ? product.image_urls[0] 
                                            : "/assets/image/shop.png"}
                                        alt={product.name}
                                        className="coffee-shop-image"
                                    />
                                </div>
                                <div className="coffee-shop-details">
                                    <h3>{product.name}</h3>
                                    <p className="coffee-shop-location">
                                        <i className="fas fa-map-marker-alt"></i> {product.address}
                                    </p>
                                    <p className="coffee-shop-hours">
                                        <span className="status green-circle"></span> { t('openFrom')+" "}
                                        {product.opening_time?.slice(0, 5)} {t('to') +" "}
                                        {product.closing_time?.slice(0, 5)}
                                    </p>
                                    <div className="coffee-shop-info">
                                        <p>{t('style')}: {product.style}</p>
                                        <p>{t('priceRange')}: {product.price_range}</p>
                                        <p>{t('distance')}: {product.distance_from_sun}km</p>
                                    </div>
                                    <div className="coffee-shop-rating">
                                        <span className="rating-stars">
                                            {renderStars(parseFloat(product.google_rating))}
                                        </span>
                                        <span className="review-count">
                                            {product.google_rating} {t('rating')}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </Link>
                        {user && (
                            <button 
                                className="favorite-button"
                                onClick={(e) => toggleFavorite(e, product.id)}
                            >
                                {favorites.includes(product.id) 
                                    ? <AiFillHeart className="heart-icon filled" />
                                    : <AiOutlineHeart className="heart-icon" />
                                }
                            </button>
                        )}
                    </div>
                ))}
            </div>
            {visibleShops < products.length && (
                <button className="view-more-button" onClick={handleViewMore}>
                    {t('viewMore')}
                </button>
            )}
        </div>
    );
};

export default ShopInfoCard;
