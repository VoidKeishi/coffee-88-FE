import React from "react";
import "./productCard.css";

const ProductCard = () => {
  const product = {
    image: "/assets/image/coffee.png",
    name: "Highlands Coffee",
    description: "23, Trương Định, Hai Bà Trưng, Hà Nội",
  };

  return (
    <div className="product-card">
      <div className="product-image">
        <img src={product.image} alt={product.name} />
      </div>
      <h3 className="product-name">{product.name}</h3>
      <p className="product-description">{product.description}</p>
      <img className="product-logo bottom" src="/assets/image/image7.png" alt="" />
      <img className="product-logo top" src="/assets/image/image8.png" alt="" />
    </div>
  );
};

export default ProductCard;
