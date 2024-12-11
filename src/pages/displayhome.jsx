import React, { useEffect, useState } from "react";
import Header from "../components/header/Header";
import Slider from "../components/Slider/Slider";
import ShopInfoCard from "../components/ShopInfoCard/ShopInfoCard";

function DisplayHome() {
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

  return (
    <div className="App">
      <Header products={products} />
      <Slider />
      <ShopInfoCard products={products} />
    </div>
  );
}

export default DisplayHome;
