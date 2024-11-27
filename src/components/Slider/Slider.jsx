import React, { useState } from "react";
import "./slider.css";
import ProductCard from "../product-card/ProductCard";

const Slider = () => {
  const products = [
    { image: "/assets/images/image1.jpg", name: "Product 1", description: "Description 1" },
    { image: "/assets/images/image2.jpg", name: "Product 2", description: "Description 2" },
    { image: "/assets/images/image3.jpg", name: "Product 3", description: "Description 3" },
    { image: "/assets/images/image4.jpg", name: "Product 4", description: "Description 4" },
    { image: "/assets/images/image5.jpg", name: "Product 5", description: "Description 5" },
    { image: "/assets/images/image6.jpg", name: "Product 6", description: "Description 6" },
    { image: "/assets/images/image7.jpg", name: "Product 7", description: "Description 7" },
    { image: "/assets/images/image8.jpg", name: "Product 8", description: "Description 8" },
    { image: "/assets/images/image9.jpg", name: "Product 9", description: "Description 9" },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  // Chia các sản phẩm thành nhóm (mỗi nhóm chứa 3 sản phẩm)
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

  return (
    <div className="slider">
      {/* Images */}
      <div className="slider-wrapper" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
        {groupedProducts.map((group, index) => (
          <div className="slide" key={index}>
            {group.map((_, idx) => (
              <ProductCard key={idx} />
            ))}
          </div>
        ))}
      </div>

      {/* Navigation buttons */}
      <button className="nav-button left" onClick={prevSlide}>
        <i className="fa-solid fa-chevron-left"></i>
      </button>
      <button className="nav-button right" onClick={nextSlide}>
        <i className="fa-solid fa-chevron-right"></i>
      </button>

      {/* Slide indicators */}
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
