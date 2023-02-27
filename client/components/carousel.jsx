import React from 'react';

// import React, { useState, useEffect } from 'react';
// import jordanImage from '../../images/jordan.png';
// import newBalanceImage from '../../images/new-balance.png';
// import asicsImage from '../../images/asics.png';

export default function Carousel({ handleAnchorClick, currentIndex, carouselImages, goToNext, goToPrevious }) {
  // const [currentIndex, setCurrentIndex] = useState(0);

  // const carouselImages = [
  //   { url: jordanImage, title: 'Jordan' },
  //   { url: newBalanceImage, title: 'New Balance' },
  //   { url: asicsImage, title: 'Asics' }
  // ];

  // useEffect(() => {
  //   const intervalId = setInterval(() => {
  //     setCurrentIndex((currentIndex + 1) % carouselImages.length);
  //   }, 5000);

  //   return () => clearInterval(intervalId);
  // });

  // function goToPrevious() {
  //   const isFirstSlide = currentIndex === 0;
  //   const newIndex = isFirstSlide ? carouselImages.length - 1 : currentIndex - 1;
  //   setCurrentIndex(newIndex);
  // }

  // function goToNext() {
  //   const isLastSlide = currentIndex === carouselImages.length - 1;
  //   const newIndex = isLastSlide ? 0 : currentIndex + 1;
  //   setCurrentIndex(newIndex);
  // }

  return (
    <>
      <div className='center flex'>
        <div className='container'>
          <div className='flex justify-center items-center'>
            <img src={carouselImages[currentIndex].url} className='w-full h-96 object-cover relative'/>
            <i className="fas fa-chevron-left absolute left-0 md:left-24 lg:left-1/4 " onClick={goToPrevious} />
            <i className="fas fa-chevron-right absolute right-0 md:right-24 lg:right-1/4" onClick={goToNext} />
          </div>
        </div>
      </div>
      <div className='flex justify-center m-2'>
        {/* <a href='#results' onClick={handleAnchorClick} className='drop-shadow-lg bg-black text-white py-2 px-3 rounded cursor-pointer'>{`Shop ${carouselImages[currentIndex].title} Footwear`} </a> */}
        <a href='#results' onClick={handleAnchorClick} className='drop-shadow-lg bg-black text-white py-2 px-3 rounded cursor-pointer'>Shop All Footwear </a>

      </div>
    </>
  );
}
