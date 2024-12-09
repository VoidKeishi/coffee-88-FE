import React from 'react';
import { AiFillStar, AiOutlineStar, AiOutlineClockCircle, AiOutlinePhone, AiOutlineEnvironment } from 'react-icons/ai';
import Header from '../components/header/Header';
import './detail.css';

function Detail() {
    // Mock data - có thể thay thế bằng data thật sau này
    const cafeInfo = {
        name: "Highlands Coffee",
        address: "123 Nguyễn Huệ, Quận 1, TP.HCM",
        openHours: "07:00 - 22:30",
        phone: "028 1234 5678",
        rating: 4.5,
        description: "Không gian thoáng đãng, view đẹp, phù hợp để làm việc và gặp gỡ bạn bè."
    };

    const menuItems = [
        { id: 1, name: "Cà phê sữa đá", price: "29.000đ", rating: 4.8, image: "/latte.jpg" },
        { id: 2, name: "Cappuccino", price: "45.000đ", rating: 4.6, image: "/latte.jpg" },
        { id: 3, name: "Espresso", price: "35.000đ", rating: 4.7, image: "/latte.jpg" },
        { id: 4, name: "Mocha", price: "49.000đ", rating: 4.5, image: "/latte.jpg" },
        { id: 5, name: "Latte", price: "45.000đ", rating: 4.9, image: "/latte.jpg" },
        // Thêm nhiều items khác...
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
            <div className="detail-container">
                <div className="detail-left">
                    <div className="cafe-image">
                        <img src="/highlands.jpg" alt="Highlands Coffee" />
                    </div>
                    <div className="cafe-info">
                        <h1>{cafeInfo.name}</h1>
                        <div className="rating">
                            {renderStars(cafeInfo.rating)}
                            <span className="rating-number">({cafeInfo.rating})</span>
                        </div>
                        <div className="info-item">
                            <AiOutlineEnvironment className="info-icon" />
                            <span>{cafeInfo.address}</span>
                        </div>
                        <div className="info-item">
                            <AiOutlineClockCircle className="info-icon" />
                            <span>{cafeInfo.openHours}</span>
                        </div>
                        <div className="info-item">
                            <AiOutlinePhone className="info-icon" />
                            <span>{cafeInfo.phone}</span>
                        </div>
                        <p className="description">{cafeInfo.description}</p>
                    </div>
                </div>

                <div className="detail-right">
                    <h2>Menu</h2>
                    <div className="menu-container">
                        {menuItems.map((item) => (
                            <div key={item.id} className="menu-item">
                                <img src={item.image} alt={item.name} />
                                <div className="menu-item-info">
                                    <h3>{item.name}</h3>
                                    <div className="menu-item-details">
                                        <span className="price">{item.price}</span>
                                        <div className="menu-rating">
                                            {renderStars(item.rating)}
                                        </div>
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