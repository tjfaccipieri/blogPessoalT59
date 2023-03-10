import React from 'react'
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';


const items = [
  <img src="https://github.com/tjfaccipieri.png"  role="presentation" />,
  <img src="https://github.com/fernandodelgadoazevedo.png"  role="presentation" />,
  <img src="https://github.com/ChrisPCruz99.png"  role="presentation" />,
];

const responsive = {
  0: { items: 1 },
  568: { items: 2 },
  1024: { items: 3 },
};

function Carousel() {
  return (
    <AliceCarousel mouseTracking infinite autoPlay items={items} animationType="fadeout" 
    animationDuration={800} />
  )
}

export default Carousel