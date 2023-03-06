import React from 'react';
import ResultsList from '../components/results-list';
import Footer from '../components/footer';

export default function Results({ searchResult, searchTerm, images, isClicked }) {
  return (
    <div>
      <div className='flex justify-center mb-5'>
        <div className='w-11/12 lg:w-10/12 pl-5'>
          <ResultsList searchResult={searchResult} searchTerm={searchTerm} images={images} isClicked={isClicked} />
        </div>
      </div>
      <Footer/>
    </div>
  );
}
