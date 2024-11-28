import React, { useEffect, useState } from "react";
import Header from "./components/header/Header";
import Slider from "./components/Slider/Slider";
import "./App.css";
import Filter from "./components/filter/Filter";

function App() {
  const [products, setProducts] = useState([]); // All products
  const [filteredProducts, setFilteredProducts] = useState([]); // Filtered products

  useEffect(() => {
    // Fetch the data
    fetch("/cafes.json")
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
        setFilteredProducts(data); // Initially, filtered products are the same as all products
      })
      .catch((error) => {
        console.error("Error loading JSON data:", error);
      });
  }, []);

  const applyFilters = (filters) => {
    let filtered = [...products];

    if (filters.distance) {
      const distanceRange = {
        "under-1": [0, 1],
        "1-3": [1, 3],
        "3-5": [3, 5],
        "above-5": [5, Infinity],
      };

      const [min, max] = distanceRange[filters.distance];
      filtered = filtered.filter(
        (product) =>
          parseFloat(product.distance_from_sun) >= min &&
          parseFloat(product.distance_from_sun) < max
      );
    }

    setFilteredProducts(filtered);
  };

  return (
    <div className="App">
      <Header products={products} />
      
      {/* Filter Component */}
      <Filter onApplyFilters={applyFilters} />

      {/* "Đang hot" Slider */}
      <div className="slider-container">
        <h3>Đang hot</h3>
        <Slider products={filteredProducts} />
      </div>

      {/* "Gần đây" Slider */}
      <div className="slider-container">
        <h3>Gần đây</h3>
        <Slider products={filteredProducts} />
      </div>
    </div>
  );
}

export default App;
