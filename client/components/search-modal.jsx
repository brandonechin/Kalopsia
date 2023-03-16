import React from 'react';

export default function SearchModal({ onSubmit, onClick, showModal, onChange, searchTerm }) {
  return (
    <div className={`fixed bg-white inset-0 z-20 md:hidden ${showModal}`}>
      <div className='flex'>
        <form onSubmit={onSubmit} >
          <div className="relative mt-3">
            <div className="absolute inset-y-0 left-0 flex items-center pl-8">
              <label>
                <input type="submit" className="hidden" />
                <svg className="cursor-pointer w-5 h-5 text-gray-500" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" /></svg>
              </label>
            </div>
            <input type="text" value={searchTerm} id="search-navbar" onChange={onChange} className="p-2 ml-4 pl-10 modal-input text-sm text-gray-900 border border-gray-300 rounded-full bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search..." />
          </div>
        </form>
        <button className='mt-2 ml-1 mr-1 modal-cancel' onClick={onClick} >Cancel</button>
      </div>
      <div className='grid mt-6 ml-4'>
        <h3 className='mb-2 text-sm text-gray-500'>Suggested Searches</h3>
        <a href='#' onClick={onClick} className='mb-1'>Nike</a>
        <a href='#' onClick={onClick} className='mb-1'>New Balance</a>
        <a href='#' onClick={onClick} className='mb-1'>Asics</a>
        <a href='#' onClick={onClick} className='mb-1'>Jordan</a>
      </div>
    </div>
  );
}
