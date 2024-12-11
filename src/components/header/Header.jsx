import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./header.css";
import {
  faMagnifyingGlass,
  faSliders,
  faCaretDown,
  faUser,
  faCaretUp,
  faXmark,
  faUserCircle,
  faHeartCircleCheck,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Header = () => {
  const [currentFlag, setCurrentFlag] = useState("vietnam"); // Mặc định cờ Việt Nam
  const [keyword, setKeyword] = useState(""); // Thay đổi address thành keyword
  const isFilterOpen = useState(false); // Trạng thái hiển thị filter popup

  const handleFlagChange = () => {
    setCurrentFlag((prevFlag) => {
      if (prevFlag === "vietnam") return "japan";
      if (prevFlag === "japan") return "england";
      return "vietnam";
    });
  };

  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Searching for keyword:", keyword); // Xử lý tìm kiếm từ khóa
  };

  const toggleFilter = () => {
    const filterPopup = document.querySelector(".filter-popup");
    filterPopup.classList.toggle("open");
  };

  const [activeFilters, setActiveFilters] = useState([]);

  // Hàm để toggle active state cho nút filter-btn
  const handleFilterClick = (filter) => {
    setActiveFilters((prevActiveFilters) => {
      if (prevActiveFilters.includes(filter)) {
        // Nếu filter đã active, thì loại bỏ khỏi danh sách active
        return prevActiveFilters.filter((f) => f !== filter);
      } else {
        // Nếu filter chưa active, thì thêm vào danh sách active
        return [...prevActiveFilters, filter];
      }
    });
  };

  const [isUserMenuOpen, setUserMenuOpen] = useState(false);
  const [isCaretUp, setCaretUp] = useState(false);

  // Hàm toggle cả hai state
  const toggleUserMenu = () => {
    setUserMenuOpen((prevState) => !prevState); // Chuyển đổi trạng thái của user menu
    setCaretUp((prevState) => !prevState); // Chuyển đổi trạng thái của caret
  };

  // Hàm xử lý các mục trong menu
  const handleMenuItemClick = (item) => {
    console.log(item); // Tùy thuộc vào mục, có thể điều hướng hoặc thực hiện hành động
    setUserMenuOpen(false); // Đóng menu sau khi chọn
  };

  return (
    <header className="header">
      <div className="logo">
        <Link to="/">
          <img src="/assets/image/logo-coffee.png" alt="Logo" />
        </Link>
      </div>

      <div className="search-container">
        <form onSubmit={handleSearch} className="search-form">
          <FontAwesomeIcon icon={faMagnifyingGlass} />
          <input
            type="text"
            className="search-input"
            placeholder="Tìm kiếm"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
          <div
            className="slider-icon"
            title="Slider Icon"
            onClick={toggleFilter}
          >
            <FontAwesomeIcon icon={faSliders} />
          </div>
        </form>
      </div>

      <div className="flag-container" onClick={handleFlagChange}>
          <img
            src={`/assets/image/${currentFlag}.png`}
            alt={currentFlag}
            className="flag-icon"
          />
      </div>

      <div className="user-menu" onClick={toggleUserMenu}>
        <FontAwesomeIcon icon={faUserCircle} className="user-icon" />
        <FontAwesomeIcon
          icon={isCaretUp ? faCaretUp : faCaretDown}
          className="caret-icon"
        />
      </div>

      {isUserMenuOpen && (
        <div className="user-menu-popup">
          <ul>
            <li onClick={() => handleMenuItemClick("Thông tin tài khoản")}>
              <FontAwesomeIcon icon={faUser} />
              Thông tin tài khoản
            </li>
            <li onClick={() => handleMenuItemClick("Cửa hàng yêu thích")}>
              <FontAwesomeIcon icon={faHeartCircleCheck} />
              Cửa hàng yêu thích
            </li>
            <li onClick={() => handleMenuItemClick("Đăng xuất")}>
              <FontAwesomeIcon icon={faSignOutAlt} />
              Đăng xuất
            </li>
          </ul>
        </div>
      )}

      {/* Popup Filter */}
      {isFilterOpen && (
        <div className="filter-popup">
          <div className="filter-content">
            <h3>BỘ LỌC TÌM KIẾM</h3>
            <button className="close-popup" onClick={toggleFilter}>
              <FontAwesomeIcon icon={faXmark} />
            </button>
            <div className="filter-option">
              <h4>Khoảng cách</h4>
              <div>
                <button
                  className={`filter-btn ${
                    activeFilters.includes("< 1km") ? "active" : ""
                  }`}
                  onClick={() => handleFilterClick("< 1km")}
                >
                  {"< 1km"}
                </button>
                <button
                  className={`filter-btn ${
                    activeFilters.includes("1km - 2km") ? "active" : ""
                  }`}
                  onClick={() => handleFilterClick("1km - 2km")}
                >
                  {"1km - 2km"}
                </button>
                <button
                  className={`filter-btn ${
                    activeFilters.includes("2km - 5km") ? "active" : ""
                  }`}
                  onClick={() => handleFilterClick("2km - 5km")}
                >
                  {"2km - 5km"}
                </button>
                <button
                  className={`filter-btn ${
                    activeFilters.includes("> 5km") ? "active" : ""
                  }`}
                  onClick={() => handleFilterClick("> 5km")}
                >
                  {"> 5km"}
                </button>
              </div>
            </div>
            <div className="filter-option">
              <h4>Phong cách</h4>
              <div>
                <button
                  className={`filter-btn ${
                    activeFilters.includes("Modern") ? "active" : ""
                  }`}
                  onClick={() => handleFilterClick("Modern")}
                >
                  Modern
                </button>
                <button
                  className={`filter-btn ${
                    activeFilters.includes("Vintage") ? "active" : ""
                  }`}
                  onClick={() => handleFilterClick("Vintage")}
                >
                  Vintage
                </button>
                <button
                  className={`filter-btn ${
                    activeFilters.includes("Minimalist") ? "active" : ""
                  }`}
                  onClick={() => handleFilterClick("Minimalist")}
                >
                  Minimalist
                </button>
                <button
                  className={`filter-btn ${
                    activeFilters.includes("Luxury") ? "active" : ""
                  }`}
                  onClick={() => handleFilterClick("Luxury")}
                >
                  Luxury
                </button>
              </div>
            </div>
            <div className="filter-option">
              <h4>Giá tiền</h4>
              <div>
                <button
                  className={`filter-btn ${
                    activeFilters.includes("< 30.000 VND") ? "active" : ""
                  }`}
                  onClick={() => handleFilterClick("< 30.000 VND")}
                >
                  {"< 30.000 VND"}
                </button>
                <button
                  className={`filter-btn ${
                    activeFilters.includes("30.000 - 50.000 VND")
                      ? "active"
                      : ""
                  }`}
                  onClick={() => handleFilterClick("30.000 - 50.000 VND")}
                >
                  {"30.000 - 50.000 VND"}
                </button>
                <button
                  className={`filter-btn ${
                    activeFilters.includes("50.000 - 100.000 VND")
                      ? "active"
                      : ""
                  }`}
                  onClick={() => handleFilterClick("50.000 - 100.000 VND")}
                >
                  {"50.000 - 100.000 VND"}
                </button>
                <button
                  className={`filter-btn ${
                    activeFilters.includes("> 100.000 VND") ? "active" : ""
                  }`}
                  onClick={() => handleFilterClick("> 100.000 VND")}
                >
                  {"> 100.000 VND"}
                </button>
              </div>
            </div>
            <div className="filter-option">
              <h4>Đánh giá</h4>
              <div>
                <div>
                  <button
                    className={`filter-btn ${
                      activeFilters.includes("1 - 2 ⭐") ? "active" : ""
                    }`}
                    onClick={() => handleFilterClick("1 - 2 ⭐")}
                  >
                    1 - 2 ⭐
                  </button>
                  <button
                    className={`filter-btn ${
                      activeFilters.includes("2 - 3 ⭐") ? "active" : ""
                    }`}
                    onClick={() => handleFilterClick("2 - 3 ⭐")}
                  >
                    2 - 3 ⭐
                  </button>
                  <button
                    className={`filter-btn ${
                      activeFilters.includes("3 - 4 ⭐") ? "active" : ""
                    }`}
                    onClick={() => handleFilterClick("3 - 4 ⭐")}
                  >
                    3 - 4 ⭐
                  </button>
                  <button
                    className={`filter-btn ${
                      activeFilters.includes("4 - 5 ⭐") ? "active" : ""
                    }`}
                    onClick={() => handleFilterClick("4 - 5 ⭐")}
                  >
                    4 - 5 ⭐
                  </button>
                </div>
              </div>
            </div>
            <button className="apply-filter" onClick={toggleFilter}>
              Áp dụng
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
