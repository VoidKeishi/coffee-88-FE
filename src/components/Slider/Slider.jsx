import React, { useState } from "react";
import "./slider.css";
import ProductCard from "../product-card/ProductCard";

const Slider = ({ products }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Split products into groups (each slide contains 3 products)
  const groupedProducts = [];
  for (let i = 0; i < products.length; i += 3) {
    groupedProducts.push(products.slice(i, i + 3));
  }

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % groupedProducts.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + groupedProducts.length) % groupedProducts.length);
  };

  if (products.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div className="slider">
      <div className="slider-wrapper" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
        {groupedProducts.map((group, index) => (
          <div className="slide" key={index}>
            {group.map((product, idx) => (
              <ProductCard key={idx} product={product} />
            ))}
          </div>
        ))}
      </div>

      <button className="nav-button left" onClick={prevSlide}>
        <i className="fa-solid fa-chevron-left"></i>
      </button>
      <button className="nav-button right" onClick={nextSlide}>
        <i className="fa-solid fa-chevron-right"></i>
      </button>

      <div className="indicators">
        {groupedProducts.map((_, index) => (
          <div
            key={index}
            className={`indicator ${index === currentSlide ? "active" : ""}`}
            onClick={() => setCurrentSlide(index)}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default Slider;
