import React, { useState } from 'react';
// import NavBar from '../components/nav-bar';
import Banner from '../components/banner';
import { Carousel } from '../components/carousel';
import kalopsiaLogo from '../../images/kalopsia-logo.png';
import kalopsia from '../../images/kalopsia.png';

export default function Home(props) {
  const [click, setClick] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  function handleClick() {
    setClick(!click);
  }

  function handleSubmit(event) {
    event.preventDefault();

    fetch('/api/sneakers')
      .then(res => res.json())
      .then(data => {
        // eslint-disable-next-line no-console
        console.log(data.rows);
      });
    // eslint-disable-next-line no-console
    console.log(searchTerm);
  }

  let showModal;
  if (click) {
    showModal = '';
  } else {
    showModal = 'hidden';
  }

  return (
    <div>
      {/* <NavBar /> */}
      <nav className="bg-[#dfefe2] border-gray-200 px-2 sm:px-4 py-2 rounded dark:bg-gray-900">
        <div className="container flex flex-wrap items-center justify-between mx-auto">
          <a href='#' className="flex items-center">
            <img src={kalopsia} className="h-5 ml-2 sm:ml-0 sm:h-5 " alt="Flowbite Logo" />
          </a>
          <div className="flex md:order-2">
            <button type="button" data-collapse-toggle="navbar-search" aria-controls="navbar-search" aria-expanded="false" onClick={handleClick} className="md:hidden text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5 mr-1" >
              <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" /></svg>
              <span className="sr-only">Search</span>
            </button>
            <a href=""><i className="fa-solid fa-cart-shopping  text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5 mr-1"> </i></a>
            <div className="relative hidden md:block">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg className="w-5 h-5 text-gray-500" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" /></svg>
                <span className="sr-only">Search icon</span>
              </div>
              <input type="text" id="search-navbar" className="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search..." />
            </div>
            <button data-collapse-toggle="navbar-search" type="button" className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-search" aria-expanded="false">
              <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" /></svg>
            </button>
          </div>
          <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-search">
            <div className="relative mt-3 md:hidden">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg className="w-5 h-5 text-gray-500" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" /></svg>
              </div>
              <input type="text" id="search-navbar" className="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search..." />
            </div>
            <a href="#"><img className="h-14 w-25 ml-36" src={kalopsiaLogo} alt='kalopsia-logo' /></a>
          </div>
        </div>
      </nav>
      <form onSubmit={handleSubmit}>
        <div className={`fixed bg-white inset-0 z-10 ${showModal}`}>
          <div className="relative mt-3">
            <div className="absolute inset-y-0 left-0 flex items-center pl-8">
              <label>
                <input type="submit" className="hidden" />
                <svg className="cursor-pointer w-5 h-5 text-gray-500" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" /></svg>
              </label>
            </div>
            <input type="text" id="search-navbar" onChange={e => setSearchTerm(e.target.value)} className="w-10/12 p-2 ml-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-full bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search..." />
            <a href='#' className='ml-2' onClick={handleClick} >Cancel</a>
          </div>
          <div className='grid mt-6 ml-4'>
            <h3 className='mb-2 text-sm text-gray-500'>Suggested Searches</h3>
            <a href='#' className='mb-1'>Nike</a>
            <a href='#' className='mb-1'>New Balance</a>
            <a href='#' className='mb-1'>Asics</a>
            <a href='#' className='mb-1'>Jordan</a>
          </div>
        </div>
      </form>
      <Banner />
      <Carousel />
    </div>
  );
}
