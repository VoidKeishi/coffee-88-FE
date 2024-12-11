import React, { useState } from "react";
import "./shopInfoCard.css";

const ShopInfoCard = ({ products }) => {
  const [visibleShops, setVisibleShops] = useState(6); // Hiển thị tối đa 6 quán ban đầu

  const handleViewMore = () => {
    setVisibleShops((prev) => prev + 6); // Hiển thị thêm 6 quán mỗi lần nhấn
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
      <div id="list-shop-title">Coffee Shop List</div>
      <div className="coffee-shop-list">
        {products.slice(0, visibleShops).map((product, index) => (
          <div className="coffee-shop" key={index}>
            <div className="coffee-shop-header">
              <img
                src={product.image_urls || "/assets/image/shop.png"}
                alt={product.name || "Shop Image"}
                className="coffee-shop-image"
              />
              <div className="coffee-shop-details">
                <h3>{product.name || "Shop Name"}</h3>
                <p className="coffee-shop-location">
                  <i className="fas fa-map-marker-alt"></i>{" "}
                  {product.address || "No address available"}
                </p>
                <p className="coffee-shop-hours">
                  <span className="status green-circle"></span> Mở cửa từ{" "}
                  {product.opening_time || "No opening time"} đến{" "}
                  {product.closing_time || "No closing time"}
                </p>
                <div className="coffee-shop-rating">
                  <span className="rating-stars">
                    {renderStars(parseFloat(product.google_rating || "0"))}
                  </span>
                  <span className="review-count">
                    {product.google_rating || "0"} rating
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {visibleShops < products.length && (
        <button className="view-more-button" onClick={handleViewMore}>
          View More
        </button>
      )}
    </div>
  );
};

export default ShopInfoCard;
