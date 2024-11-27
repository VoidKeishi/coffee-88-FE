import React from 'react';
import "./shopInfoCard.css"

const ShopInfoCard = () => {
  return (
    <div className="coffee-shop">
      <div className="coffee-shop-header">
        <img 
          src="/assets/image/shop.png" 
          alt="Highlands Coffee" 
          className="coffee-shop-image" 
        />
        <div className="coffee-shop-details">
          <h3>Highlands Coffee - Trà, Cà phê & Bánh</h3>
          <p className="coffee-shop-location">
            <i className="fas fa-map-marker-alt"></i> Tầng 1, Tòa nhà Handico, Phạm Hùng, P.Mễ Trì, Nam Từ Liêm, Hà Nội
          </p>
          <p className="coffee-shop-hours">
            <span className="status green-circle"></span> Mở cửa 8:00 AM - 22:00 PM
          </p>
          <div className="coffee-shop-rating">
            <span className="rating-stars">
              <i className="fas fa-star"></i>
              <i className="fas fa-star"></i>
              <i className="fas fa-star"></i>
              <i className="far fa-star"></i>
            </span>
            <span className="review-count">99+ đánh giá trên website</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopInfoCard;
