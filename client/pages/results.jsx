import React from 'react';
import ResultsList from '../components/results-list';

export default function Results({ searchResult, searchTerm, handleAnchorClick, images, carouselImages, currentIndex }) {
  return (
    <div className='md:flex md:justify-center mb-36'>
      <div className='md:w-1/2 lg:w-1/2'>
        <ResultsList searchResult={searchResult} searchTerm={searchTerm} handleAnchorClick={handleAnchorClick} images={images} carouselImages={carouselImages} currentIndex={currentIndex} />
      </div>
    </div>
  );
}
