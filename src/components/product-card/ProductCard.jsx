import React from "react";
import "./productCard.css";
import { useTranslation } from "react-i18next";

const ProductCard = ({ product }) => {
  const { t } = useTranslation();
  return (
    <div className="product-card">
      <div className="product-image">
        {product.image_urls? (
          <img src={product.image_urls} alt={product.name} />
        ) : (
          <div>No Image Available</div>
        )}
      </div>
      <h3 className="product-name">{product.name}</h3>
      <p className="product-description">{product.address}</p>
      <img className="product-logo bottom" src="/assets/image/image7.png" alt="" />
      <img className="product-logo top" src="/assets/image/image8.png" alt="" />
    </div>
  );
};

export default ProductCard;