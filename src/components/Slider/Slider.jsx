import React, { useRef, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./slider.css";
import { useTranslation } from "react-i18next";
import { useAuth } from "../../context/AuthContext";
import API_BASE_URL from "../../apiConfig";

const Slider = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const trackRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cafes, setCafes] = useState([]);

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}users/preference/recommend`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ userId: user?.id }),
        });
        const data = await response.json();
        setCafes(data);
      } catch (error) {
        console.error('Error fetching recommendations:', error);
      }
    };

    if (user?.id) {
      fetchRecommendations();
    }
  }, [user]);

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
    const index = Math.round((percentage * -1) / (100 / (cafes.length - 1)));
    setCurrentIndex(Math.max(0, Math.min(index, cafes.length - 1)));
  };

  const handleDotClick = (index) => {
    const percentage = -(index * (100 / (cafes.length - 1)));
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
  }, [cafes]);

  const handleCafeClick = (cafeId) => {
    navigate(`/detail/${cafeId}`);
  };

  return (
    <div id="slider-container">
      <div className="slider-header">
        <div id="slider-title">{t('recommended')}</div>
        <Link to="/favorite" className="favorite-link">
          <i className="fas fa-heart"></i>
          {t('favorite')}
        </Link>
      </div>
      <div
        id="image-track"
        ref={trackRef}
        data-percentage="0"
        onWheel={handleWheel}
        style={{ overflow: "hidden" }}
      >
        {cafes.map((cafe, index) => (
          <div key={cafe.id} className="slider-cafe-item" onClick={() => handleCafeClick(cafe.id)}>
            <img
              className="slider-image"
              src={cafe.image_urls[0] || "assets/image/default-cafe.jpg"}
              alt={cafe.name}
            />
            <div className="slider-cafe-info">
              <h3>{cafe.name}</h3>
              <div className="slider-rating">
                <i className="fas fa-star"></i>
                {cafe.google_rating}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="slider-dots">
        {cafes.map((_, index) => (
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
