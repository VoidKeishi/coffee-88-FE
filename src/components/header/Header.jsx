import React, { useState } from "react";
import './header.css';
import ShopInfoCard from "../shop-info-card/ShopInfoCard";

const Header = ({ products }) => {
  const [showCoffeeShopInfo, setShowCoffeeShopInfo] = useState(false);

  const handleToggleCoffeeShopInfo = () => {
    setShowCoffeeShopInfo(!showCoffeeShopInfo);
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

      <i className="fa-solid fa-bars"></i>
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
