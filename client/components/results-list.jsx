import React from 'react';

export default function ResultsList({ searchResult, searchTerm }) {

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
      <li key={results.productId} className='basis-2/4 mt-10'>
        <img src={results.imageUrl} />
        <h2 className='font-medium'>{results.brand} {results.model}</h2>
        <h2 className='text-sm text-gray-400 font-medium'>{results.gender}</h2>
        <h2 className='font-medium'>${results.price}</h2>
      </li>
    );
  } else {
    return;
  }
  return (
    <>
      <div className='ml-3 mt-3'>
        <h2>Search results for</h2>
        <h2>{searchTerm}</h2>
        <h2 className='text-gray-400 font-medium'>{result}</h2>
      </div>

      <ul className='flex flex-wrap'>{sneakerResults}</ul>
    </>
  );
}
