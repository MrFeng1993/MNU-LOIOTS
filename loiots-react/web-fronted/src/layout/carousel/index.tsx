import React from 'react';
// import Slider from 'react-slick';
import { Carousel } from 'antd';
import './index.css'

const App = () => {

  const onChange = (currentSlide) => {
    console.log(currentSlide);
  };

  return (
    <Carousel
      autoplay
      afterChange={onChange}>
      <div className='img-wrapper'>
        <img src="http://www.mnu.cn/images/banner/tsg.jpg" alt="" />
      </div>
      <div className='img-wrapper'>
        <img src="http://www.mnu.cn/images/banner/tsg.jpg" alt="" />
      </div>
    </Carousel >
  );
};

export default App;