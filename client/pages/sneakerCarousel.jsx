import React from 'react';

export default function SneakerCarousel({ images }) {

  const sneakerResults = images.map(results =>
    <li key={results.productId} className='basis-2/4 mt-10'>
      <img src={results.imageUrl} />
      <h2 className='font-medium'>{results.brand} {results.model}</h2>
      <h2 className='text-sm text-gray-400 font-medium'>{results.gender}</h2>
      <h2 className='font-medium'>${results.price}</h2>
    </li>
  );

  return (

    <ul className='flex flex-wrap'>{sneakerResults}</ul>

  );
}
