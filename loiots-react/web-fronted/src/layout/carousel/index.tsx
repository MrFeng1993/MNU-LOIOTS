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
      effect="fade"
      autoplay
      afterChange={onChange}>
      <div className='img-wrapper'>
        <img src="c1.jpg" alt="" style={{ width: "100%", }} />
      </div>
      <div className='img-wrapper'>

        <img src="c2.jpg" alt="" style={{ width: "100%", }} />

      </div>
      <div className='img-wrapper'>
        <img src="c3.jpg" alt="" style={{ width: "100%", }} />
      </div>
      <div className='img-wrapper'>
        <img src="c4.jpg" alt="" style={{ width: "100%", }} />
      </div>

    </Carousel >
  );
};

export default App;