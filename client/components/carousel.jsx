import React, { useState, useEffect } from 'react';
import jordanImage from '../../images/jordan.png';
import newBalanceImage from '../../images/new-balance.png';
import asicsImage from '../../images/asics.png';

export default function Carousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const images = [
    { url: jordanImage, title: 'Jordan' },
    { url: newBalanceImage, title: 'New Balance' },
    { url: asicsImage, title: 'Asics' }
  ];

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex((currentIndex + 1) % images.length);
    }, 5000);

    return () => clearInterval(intervalId);
  });

  function goToPrevious() {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? images.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  }

  function goToNext() {
    const isLastSlide = currentIndex === images.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  }

  return (
    <>
      <div className='center flex'>
        <div className='container'>
          <div className='flex justify-center items-center'>
            <img src={images[currentIndex].url} className='w-full h-72 object-cover relative'/>
            <i className="fas fa-chevron-left absolute left-0" onClick={goToPrevious} />
            <i className="fas fa-chevron-right absolute right-0" onClick={goToNext} />
          </div>
        </div>
      </div>
      <div className='flex justify-center m-2'>
        <a href='#sneakerCarousel' className='drop-shadow-lg bg-black text-white py-2 px-3 rounded cursor-pointer'>{`Shop ${images[currentIndex].title} Footwear`} </a>
      </div>
    </>
  );
}
