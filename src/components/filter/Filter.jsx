import React, { useState } from 'react';
import './filter.css';

const Filter = () => {
  const [isDropdownVisible, setDropdownVisible] = useState(false);

  const handleDropdownToggle = () => {
    setDropdownVisible(!isDropdownVisible);
  };

  return (
    <div className="filter-container">
      <button className="filter-button" onClick={handleDropdownToggle}>
        <i class="fa-solid fa-sliders"></i> Bộ lọc
      </button>

      <div className={`filter-dropdown ${isDropdownVisible ? 'show' : ''}`}>
        <p>Đồ uống</p>
        <div className='dropdown-item'>
          <label>
            <input
              type="checkbox"
              name="filter1"
            />
            Cà phê
          </label>
          <label>
            <input
              type="checkbox"
              name="filter2"
            />
            Nước ép
          </label>
          <label>
            <input
              type="checkbox"
              name="filter3"
            />
            Trà sữa
          </label>
        </div>
        <p>Khoảng cách</p>
        <div className='dropdown-item'>
          <label>
            <input
              type="checkbox"
              name="filter1"
            />
            Dưới 1km
          </label>
          <label>
            <input
              type="checkbox"
              name="filter2"
            />
            1-3 km
          </label>
          <label>
            <input
              type="checkbox"
              name="filter3"
            />
            3-5 km
          </label>
          <label>
            <input
              type="checkbox"
              name="filter3"
            />
            Trên 5km
          </label>
        </div>

      </div>
    </div>
  );
};

export default Filter;
