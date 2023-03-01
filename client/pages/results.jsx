import React from 'react';
import ResultsList from '../components/results-list';

export default function Results({ searchResult, searchTerm, handleAnchorClick, images, isClicked }) {
  // console.log(images);
  return (
    <div className='flex justify-center'>
      <div className='w-11/12 lg:w-10/12 pl-5'>
        <ResultsList searchResult={searchResult} searchTerm={searchTerm} handleAnchorClick={handleAnchorClick} images={images} isClicked={isClicked} />
      </div>
    </div>
  );
}
