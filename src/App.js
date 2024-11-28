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
  
    if (filters.distance_from_sun && filters.distance_from_sun.length > 0) {
      const distanceRange = {
        "under-1": [0, 1],
        "1-3": [1, 3],
        "3-5": [3, 5],
        "above-5": [5, Infinity],
      };
  
      // Filter by selected distances
      filtered = filtered.filter((product) => {
        const distance = parseFloat(product.distance_from_sun);
        
        // Check if the product's distance is in any of the selected ranges
        return filters.distance_from_sun.some((range) => {
          const [min, max] = distanceRange[range];
          return distance >= min && distance < max;
        });
      });
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
