import React from 'react';

export default function ResultsList({ searchResult, searchTerm, handleAnchorClick, images, carouselImages, currentIndex }) {

  let result;
  if (searchResult.length === 0) {
    result = 'No Results';
  } else if (searchResult.length === 1) {
    result = '1 Result';
  } else if (searchResult.length > 1) {
    result = `${searchResult.length} Results`;
  }
  let sneakerResults;
  if (searchResult) {
    sneakerResults = searchResult.map(results =>
      <li key={results.productId} className='basis-2/4 mt-10 transform transition scale-100 hover:scale-110 cursor-pointer'>
        <img src={results.imageUrl} />
        <h2 className='font-medium'>{results.brand} {results.model}</h2>
        <h2 className='text-sm text-gray-400 font-medium'>{results.gender}</h2>
        <h2 className='font-medium'>${results.price}</h2>
      </li>
    );
  } else if (handleAnchorClick) {
    for (let i = 0; i < images.length; i++) {
      if (images[i].brand === carouselImages[currentIndex].title) {
        sneakerResults = images.map(results =>
          <li key={results.productId} className='basis-2/4 mt-10'>
            <img src={results.imageUrl} />
            <h2 className='font-medium'>{results.brand} {results.model}</h2>
            <h2 className='text-sm text-gray-400 font-medium'>{results.gender}</h2>
            <h2 className='font-medium'>${results.price}</h2>
          </li>
        );
      }
    }
    result = 'All Sneakers';
  }

  return (
    <>
      <div className='ml-3 mt-3 '>
        <h2>Search results for</h2>
        <h2>{searchTerm}</h2>
        <h2 className='text-gray-400 font-medium'>{result}</h2>
      </div>

      <ul className='flex flex-wrap'>{sneakerResults}</ul>
    </>
  );

}
