import React from 'react';
import ResultsList from '../components/results-list';

export default function Results({ searchResult, searchTerm, products, isClicked, print }) {
  return (
    <div className='flex justify-center'>
      <div className='w-11/12 lg:w-10/12 pl-5'>
        <ResultsList searchResult={searchResult} searchTerm={searchTerm} products={products} isClicked={isClicked} print={print} />
      </div>
    </div>
  );
}
