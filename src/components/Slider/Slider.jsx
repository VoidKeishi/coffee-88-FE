import React, { useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Slider.css";

const Slider = () => {
  const trackRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const totalImages = 8; // Số lượng ảnh trong slider

  const handleWheel = (e) => {
    // Kiểm tra nếu chuột nằm trong vùng của #image-track
    if (trackRef.current && trackRef.current.contains(e.target)) {
      // Ngừng cuộn mặc định của trình duyệt
      e.preventDefault();

      const delta = e.deltaY; // Lấy thông tin cuộn chuột (lên/xuống)
      const scrollAmount = delta > 0 ? -2 : 2; // Giảm tốc độ cuộn xuống
      // Xác định hướng cuộn

      const trackWidth = trackRef.current.scrollWidth; // Chiều rộng tổng của track
      const viewportWidth = window.innerWidth; // Chiều rộng viewport
      const maxScrollPercentage =
        -((trackWidth - viewportWidth * 0.9) / trackWidth) * 100; // Tính toán phần trăm giới hạn cuộn

      const prevPercentage = parseFloat(
        trackRef.current.dataset.percentage || "0"
      );
      const nextPercentage = Math.max(
        Math.min(prevPercentage + scrollAmount, 0),
        maxScrollPercentage
      );

      trackRef.current.dataset.percentage = nextPercentage;

      // Cập nhật vị trí của slider
      trackRef.current.style.transform = `translate(${nextPercentage}%, -50%)`;

      // Cập nhật vị trí hình ảnh
      Array.from(trackRef.current.getElementsByClassName("image")).forEach(
        (image) => {
          image.style.objectPosition = `${100 + nextPercentage}% center`;
        }
      );
    }

    // Cập nhật currentIndex dựa trên percentage
    const percentage = parseFloat(trackRef.current?.dataset.percentage || "0");
    const index = Math.round((percentage * -1) / (100 / (totalImages - 1)));
    setCurrentIndex(Math.max(0, Math.min(index, totalImages - 1)));
  };

  const handleDotClick = (index) => {
    const percentage = -(index * (100 / (totalImages - 1)));
    trackRef.current.dataset.percentage = percentage;
    trackRef.current.style.transform = `translate(${percentage}%, -50%)`;
    setCurrentIndex(index);

    // Cập nhật object-position cho tất cả ảnh
    Array.from(trackRef.current.getElementsByClassName("image")).forEach(
      (image) => {
        image.style.objectPosition = `${100 + percentage}% center`;
      }
    );
  };

  useEffect(() => {
    const handleWheelEvent = (e) => handleWheel(e);

    const trackElement = trackRef.current;
    trackElement.addEventListener("wheel", handleWheelEvent, {
      passive: false,
    });

    return () => {
      trackElement.removeEventListener("wheel", handleWheelEvent);
    };
  }, []);

  return (
    <div id="slider-container">
      <div className="slider-header">
        <div id="slider-title">RECOMMENDED</div>
        <Link to="/favorite" className="favorite-link">
          <i className="fas fa-heart"></i>
          Yêu thích
        </Link>
      </div>
      <div
        id="image-track"
        ref={trackRef}
        data-percentage="0"
        onWheel={handleWheel}
        style={{ overflow: "hidden" }}
      >
        <img
          className="image"
          src="assets/image/caphegiang.jpg"
          alt="Cà phê Giảng"
        />
        <img
          className="image"
          src="assets/image/coffeeshop.jpg"
          alt="Coffee Shop"
        />
        <img
          className="image"
          src="assets/image/highlands1.jpg"
          alt="Highlands 1"
        />
        <img
          className="image"
          src="assets/image/highlands2.jpg"
          alt="Highlands 2"
        />
        <img
          className="image"
          src="assets/image/thecoffeehouse1.jpg"
          alt="The coffee house 1"
        />
        <img
          className="image"
          src="assets/image/thecoffeehouse2.jpg"
          alt="The coffee house 2"
        />
        <img
          className="image"
          src="assets/image/coffeeshop1.jpg"
          alt="Coffee Shop 1"
        />
        <img
          className="image"
          src="assets/image/coffeeshop2.jpg"
          alt="Coffee Shop 2"
        />
      </div>
      <div className="slider-dots">
        {[...Array(totalImages)].map((_, index) => (
          <div
            key={index}
            className={`dot ${index === currentIndex ? 'active' : ''}`}
            onClick={() => handleDotClick(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default Slider;
