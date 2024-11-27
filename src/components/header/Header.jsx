import React, { useState } from "react";
import './header.css';
import ShopInfoCard from "../shop-info-card/ShopInfoCard";

const Header = () => {
  // State to toggle coffee shop information visibility
  const [showCoffeeShopInfo, setShowCoffeeShopInfo] = useState(false);

  // Handle the toggle for showing coffee shop info
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
          <ShopInfoCard />
          <ShopInfoCard />
          <ShopInfoCard />
          <ShopInfoCard />
          <ShopInfoCard />
          <ShopInfoCard />
          <ShopInfoCard />
          <ShopInfoCard />
          <ShopInfoCard />
          <ShopInfoCard />
          <ShopInfoCard />
        </div>
      )}
    </header>
  );
};

export default Header;
