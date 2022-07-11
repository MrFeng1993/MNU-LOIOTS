import React from 'react';
import Slider from 'react-slick';

export default function SliderPage() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: true,
  };

  const arr = [1, 2, 3, 4];

  return (
    <div>
      <Slider {...settings} style={{
        padding: '10px',
        background: '#419be0'
      }}>
        {
          arr.map((item) => (
            <div key={item}>
              <img style={{ margin: 'auto' }} src="http://placekitten.com/g/400/200" />
            </div>
          )
          )
        }
      </Slider >
    </div>
  );
}