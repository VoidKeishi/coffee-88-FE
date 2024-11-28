import React, { useState } from 'react';
import './filter.css';

const Filter = ({ onApplyFilters }) => {
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const [selectedDistances, setSelectedDistances] = useState([]); // Store multiple selected distances

  const handleDropdownToggle = () => {
    setDropdownVisible(!isDropdownVisible);
  };

  const handleDistanceChange = (value) => {
    setSelectedDistances((prev) => {
      if (prev.includes(value)) {
        return prev.filter((distance) => distance !== value);
      } else {
        return [...prev, value];
      }
    });
  };

  const handleApplyFilters = () => {
    onApplyFilters({ distance_from_sun: selectedDistances });
  };

  return (
    <div className="filter-container">
      <button className="filter-button" onClick={handleDropdownToggle}>
        <i className="fa-solid fa-sliders"></i> Bộ lọc
      </button>

      <div className={`filter-dropdown ${isDropdownVisible ? 'show' : ''}`}>
        <p>Đồ uống</p>
        <div className="dropdown-item">
          <label>
            <input type="checkbox" name="filter1" />
            Cà phê
          </label>
          <label>
            <input type="checkbox" name="filter2" />
            Nước ép
          </label>
          <label>
            <input type="checkbox" name="filter3" />
            Trà sữa
          </label>
        </div>

        <p>Khoảng cách</p>
        <div className="dropdown-item">
          <label>
            <input
              type="checkbox"
              name="distance"
              checked={selectedDistances.includes('under-1')}
              onChange={() => handleDistanceChange('under-1')}
            />
            Dưới 1km
          </label>
          <label>
            <input
              type="checkbox"
              name="distance"
              checked={selectedDistances.includes('1-3')}
              onChange={() => handleDistanceChange('1-3')}
            />
            1-3 km
          </label>
          <label>
            <input
              type="checkbox"
              name="distance"
              checked={selectedDistances.includes('3-5')}
              onChange={() => handleDistanceChange('3-5')}
            />
            3-5 km
          </label>
          <label>
            <input
              type="checkbox"
              name="distance"
              checked={selectedDistances.includes('above-5')}
              onChange={() => handleDistanceChange('above-5')}
            />
            Trên 5km
          </label>
        </div>
        <button className="filter-button" onClick={handleApplyFilters}>
          Apply Filters
        </button>
      </div>
    </div>
  );
};

export default Filter;
