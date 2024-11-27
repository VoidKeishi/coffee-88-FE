import React from 'react';
import "./shopInfoCard.css"

const ShopInfoCard = ({ product }) => {
  // Ensure rating is a valid number, default to 0 if not
  const rating = typeof product.google_rating === 'string' ? parseFloat(product.google_rating) : 0;
  const formattedRating = rating >= 0 && rating <= 5 ? rating : 0;

  const renderStars = () => {
    const fullStars = Math.floor(formattedRating);  // Full stars
    const halfStars = formattedRating % 1 >= 0.5 ? 1 : 0;  // Half star if the rating has a fractional part
    const emptyStars = 5 - fullStars - halfStars;  // Remaining empty stars

    return (
      <>
        {[...Array(fullStars)].map((_, index) => (
          <i key={`full-${index}`} className="fas fa-star"></i>
        ))}
        {halfStars > 0 && (
          <i key="half" className="fas fa-star-half-alt"></i> // Half-filled star
        )}
        {[...Array(emptyStars)].map((_, index) => (
          <i key={`empty-${index}`} className="far fa-star"></i>
        ))}
      </>
    );
  };
  
  return (
    <div className="coffee-shop">
      <div className="coffee-shop-header">
        <img 
          src={product.image_urls ? product.image_urls : '/assets/image/shop.png'} 
          alt={product.name || "Shop Image"} 
          className="coffee-shop-image" 
        />
        <div className="coffee-shop-details">
          <h3>{product.name || "Shop Name"}</h3>
          <p className="coffee-shop-location">
            <i className="fas fa-map-marker-alt"></i> {product.address || "No address available"}
          </p>
          <p className="coffee-shop-hours">
            <span className="status green-circle"></span> Mở cửa từ {product.opening_time || "No opening time"} đến {product.closing_time || "No closing time"}
          </p>
          <div className="coffee-shop-rating">
            <span className="rating-stars">
              {renderStars()}
            </span>
            <span className="review-count">{formattedRating} rating</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopInfoCard;
