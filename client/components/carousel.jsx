import React, { useState, useEffect } from 'react';
import jordanImage from '../../images/jordan.png';
import newBalance from '../../images/new-balance.png';

export function Carousel() {

  const images = [
    { url: jordanImage, title: 'Jordan' },
    { url: newBalance, title: 'New Balance' }
  ];
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex((currentIndex + 1) % images.length);
    }, 3000);

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
    <div className='center flex'>
      <div className='container'>
        <div className='flex justify-center items-center'>
          <img src={images[currentIndex].url} className='w-full h-72 object-cover relative'/>
          <i className="fas fa-chevron-left absolute left-0" onClick={goToPrevious} />
          <i className="fas fa-chevron-right absolute right-0" onClick={goToNext} />
        </div>
      </div>
    </div>
  );
}
