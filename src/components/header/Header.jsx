import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './header.css';
import ShopInfoCard from '../shop-info-card/ShopInfoCard';

const Header = ({ products }) => {
    const [showCoffeeShopInfo, setShowCoffeeShopInfo] = useState(false);
    const navigate = useNavigate();

    const handleToggleCoffeeShopInfo = () => {
        setShowCoffeeShopInfo(!showCoffeeShopInfo);
    };

    const handleLoginClick = () => {
        navigate('/login');
    };

    return (
        <header className="header">
            <div className="logo">Logo</div>

            <div className="search-bar">
                <div className="search-input">
                    <input type="text" placeholder="Tìm kiếm" />
                    <input type="text" placeholder="Vị trí của bạn" />
                    <i className="fa fa-search"></i>
                </div>
                <img src="/assets/image/list-logo.png" alt="list logo" onClick={handleToggleCoffeeShopInfo} />
            </div>

            <div className="header-actions">
                <button className="login-button" onClick={handleLoginClick}>
                    <i className="fas fa-user"></i> Đăng nhập
                </button>
                <i className="fa-solid fa-bars"></i>
            </div>

            {showCoffeeShopInfo && (
                <div className="shop-lists">
                    {products.map((product, index) => (
                        <ShopInfoCard key={index} product={product} />
                    ))}
                </div>
            )}
        </header>
    );
};

export default Header;
