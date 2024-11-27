import Header from './components/header/Header';
import Slider from './components/Slider/Slider';
import './App.css'
import Filter from './components/filter/Filter';
import ShopInfoCard from './components/shop-info-card/ShopInfoCard';

function App() {
  return (
    <div className="App">
      <Header />
      <Filter />
      <div className='slider-container'>
        <h3>Đang hot</h3>
        <Slider />
      </div>
      <div className='slider-container'>
        <h3>Gần đây</h3>
        <Slider />
      </div>
    </div>
  );
}

export default App;
