import React, { useEffect, useState } from "react";
import Header from './components/header/Header';
import Slider from './components/Slider/Slider';
import './App.css'
import Filter from './components/filter/Filter';
import ShopInfoCard from './components/shop-info-card/ShopInfoCard';

function App() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Fetch the data
    fetch('/cafes.json')
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
      })
      .catch((error) => {
        console.error('Error loading JSON data:', error);
      });
  }, []);

  return (
    <div className="App">
      <Header products={products}/>
      <Filter />
      <div className='slider-container'>
        <h3>Đang hot</h3>
        <Slider products={products}/>
      </div>
      <div className='slider-container'>
        <h3>Gần đây</h3>
        <Slider products={products}/>
      </div>
    </div>
  );
}

export default App;
