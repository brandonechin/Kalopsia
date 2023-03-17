import React from 'react';

export default function ResultsList({ searchResult, searchTerm, products, isClicked, print }) {
  let result;
  if (searchResult.length === 0) {
    result = 'No Results';
  } else if (searchResult.length === 1) {
    result = '1 Result';
  } else if (searchResult.length > 1) {
    result = `${searchResult.length} Results`;
  }
  let sneakerResults;

  if (searchResult.length > 0) {
    sneakerResults = searchResult.map(results =>
      <a key={results.productId} className='basis-2/4 xl:basis-1/3 flex justify-center' href={`#product-details?productId=${results.productId}`}>
        <li className='mt-10 transform transition scale-100 hover:scale-110 cursor-pointer ml-3'>
          <img className='h-auto w-4/5 object-contain' src={results.imageUrl} />
          <h2 className='font-medium'>{results.brand} {results.model}</h2>
          <h2 className='text-sm text-gray-400 font-medium'>{results.gender}</h2>
          <h2 className='font-medium'>${results.price}</h2>
        </li>
      </a>
    );
  } else if (isClicked) {
    sneakerResults = products.map(results =>
      <a key={results.productId} className='basis-2/4 xl:basis-1/3 flex justify-center' href={`#product-details?productId=${results.productId}`}>
        <li className='mt-10 transform transition scale-100 hover:scale-110 cursor-pointer ml-3'>
          <img className='h-auto w-4/5 object-contain' src={results.imageUrl} />
          <h2 className='font-medium'>{results.brand} {results.model}</h2>
          <h2 className='text-sm text-gray-400 font-medium'>{results.gender}</h2>
          <h2 className='font-medium'>${results.price}</h2>
        </li>
      </a>
    );
    result = 'All Sneakers';
  }

  return (
    <>
      <div className='ml-3 mt-3 font-medium'>
        <h2>Search results for</h2>
        <h2>{print}</h2>
        <h2 className='text-gray-400 font-medium'>{result}</h2>
      </div>
      <ul className='flex flex-wrap'>
        {sneakerResults}
      </ul>
    </>
  );

}
