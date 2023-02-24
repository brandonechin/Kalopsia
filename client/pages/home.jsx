import React, { useState } from 'react';
import NavBar from '../components/nav-bar';
import Banner from '../components/banner';
import Carousel from '../components/carousel';
import Footer from '../components/footer';
// import kalopsiaLogo from '../../images/kalopsia-logo.png';
// import kalopsia from '../../images/kalopsia.png';
import jordan6 from '../../images/jordan6.png';

export default function Home(props) {
  const [isVisible, setIsVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResult, setSearchResult] = useState('');
  const [images, setImages] = useState('');

  function handleClick() {
    setIsVisible(!isVisible);
  }

  window.addEventListener('load', () => {

    async function getImages() {
      try {
        const response = await fetch('/api/sneakers');
        const data = await response.json();
        // console.log(response);
        setImages(data.rows);
        // console.log(data);
      } catch (err) {
        console.error('Error fetching data:', err);
      }
    }

    getImages();
  });
  // fetch('/api/sneakers')
  //   .then(res => res.json())
  //   .then(data => {
  //     setImages(data.rows);
  //   })
  //   .catch(function (error) {
  //     console.error('Error fetching data:', error);
  //   });

  function handleSubmit(event) {
    event.preventDefault();

    fetch('/api/sneakers')
      .then(res => res.json())
      .then(data => {
        // eslint-disable-next-line no-console
        if (searchTerm) {
          const imageArray = [];
          for (let i = 0; i < images.length; i++) {
            if (searchTerm === images[i].brand) {
              imageArray.push(images[i]);
              // eslint-disable-next-line no-console
              console.log(images[i]);
            }
          }
          setSearchResult(imageArray);
        }
        // eslint-disable-next-line no-console
        console.log(searchResult);
      })
      .catch(err => console.error(err));
  }

  let showModal;
  if (isVisible) {
    showModal = '';
  } else {
    showModal = 'hidden';
  }

  return (
    <div>
      <NavBar handleClick={handleClick}/>
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
      <h2 className='text-center underline font-medium mt-4'> New Arrivals</h2>
      <div className='flex mt-3'>
        <div className='basis-2/4 hover:bg-gray-100 cursor-pointer'>
          <img src={images ? images[0].imageUrl : ''} />
          <p className='font-medium'>{images ? images[0].brand : ''}</p>
          <p className='text-sm text-gray-400 font-medium'>{images ? images[0].gender : ''} Shoes</p>
          <p className='font-medium'>${images ? images[0].price : ''}</p>

        </div>
        <div className='basis-2/4 hover:bg-gray-100 cursor-pointer'>
          <img src={images ? images[14].imageUrl : ''} />
          <p className='font-medium'>{images ? images[14].brand : ''}</p>
          <p className='text-sm text-gray-400 font-medium'>{images ? images[14].gender : ''} Shoes</p>
          <p className='font-medium'>${images ? images[14].price : ''}</p>
        </div>
      </div>
      <img className='mt-5' src={jordan6}/>
      <Footer />
    </div>
  );
}
