import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { AiFillStar, AiOutlineStar, AiOutlineClockCircle, AiOutlineEnvironment } from 'react-icons/ai';
import Header from '../components/header/Header';
import './detail.css';
import API_BASE_URL from '../apiConfig';

function Detail() {
    const { id } = useParams();
    const [cafeData, setCafeData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCafeDetails = async () => {
            try {
                const response = await fetch(`${API_BASE_URL}cafes/detail/${id}`);
                const data = await response.json();
                setCafeData(data);
            } catch (error) {
                console.error('Error fetching cafe details:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchCafeDetails();
    }, [id]);

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
                        <h1>{cafeData.name}</h1>
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
                            <span>{`${cafeData.opening_time} - ${cafeData.closing_time}`}</span>
                        </div>
                    </div>
                </div>

                <div className="detail-right">
                    <h2>Menu</h2>
                    <div className="menu-container">
                        {cafeData.drinks && cafeData.drinks.map((drink) => (
                            <div key={drink.id} className="menu-item">
                                <img src={drink.image_url} alt={drink.name} />
                                <div className="menu-item-info">
                                    <h3>{drink.name}</h3>
                                    <div className="menu-item-details">
                                        <span className="price">{`${drink.price}đ`}</span>
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