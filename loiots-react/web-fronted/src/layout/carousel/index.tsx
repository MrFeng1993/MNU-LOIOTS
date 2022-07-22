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
        <img src="https://images.unsplash.com/photo-1597655601841-214a4cfe8b2c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1978&q=80" alt="" />
      </div>
      <div className='img-wrapper'>
        <img src="http://www.mnu.cn/images/banner/tsg.jpg" alt="" />
      </div>
    </Carousel >
  );
};

export default App;