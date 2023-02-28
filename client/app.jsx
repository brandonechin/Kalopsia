import React, { useState, useEffect } from 'react';
import parseRoute from './lib/parse-route';
import Home from './pages/home';
import Results from './pages/results';
import NavBar from './components/nav-bar';
import Banner from './components/banner';
import Footer from './components/footer';
import SearchModal from './components/search-modal';
// import SneakerCarousel from './pages/sneakerCarousel';
import jordanImage from '../images/jordan.png';
import newBalanceImage from '../images/new-balance.png';
import asicsImage from '../images/asics.png';

export default function App() {
  const [isVisible, setIsVisible] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResult, setSearchResult] = useState([]);
  const [images, setImages] = useState(undefined);
  const [route, setRoute] = useState(parseRoute(window.location.hash));
  const [currentIndex, setCurrentIndex] = useState(0);

  const carouselImages = [
    { url: jordanImage, title: 'Jordan' },
    { url: newBalanceImage, title: 'New Balance' },
    { url: asicsImage, title: 'Asics' }
  ];

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex((currentIndex + 1) % carouselImages.length);
    }, 5000);

    return () => clearInterval(intervalId);
  });

  function goToPrevious() {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? carouselImages.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  }

  function goToNext() {
    const isLastSlide = currentIndex === carouselImages.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  }

  function handleChange(event) {
    setRoute(parseRoute(window.location.hash));
  }

  useEffect(() => {
    window.addEventListener('hashchange', handleChange);
    return () => window.removeEventListener('hashchange', handleChange);

  }, []);

  function handleClick() {
    setIsVisible(!isVisible);
  }

  function handleAnchorClick() {
    setIsClicked(!isClicked);
  }

  window.addEventListener('load', () => {
    async function getImages() {
      try {
        const response = await fetch('/api/sneakers');
        const data = await response.json();
        // console.log(response);
        setImages(data.rows);
        // console.log(data.rows);
      } catch (err) {
        console.error('Error fetching data:', err);
      }
    }
    getImages();
  });

  function handleSubmit(event) {
    event.preventDefault();

    fetch('/api/sneakers')
      .then(res => res.json())
      .then(data => {

        if (searchTerm) {
          const imageArray = [];
          for (let i = 0; i < images.length; i++) {
            if (searchTerm === images[i].brand) {
              imageArray.push(images[i]);
              // eslint-disable-next-line no-console
              console.log(images[i]);
            }
          }
          window.location.hash = 'results';
          setSearchResult(imageArray);
        }
      })
      .catch(err => console.error(err));
  }
  // eslint-disable-next-line no-console
  console.log(searchResult);

  let showModal;
  if (isVisible) {
    showModal = '';
  } else {
    showModal = 'hidden';
  }

  function renderPage() {
    const { path } = route;
    if (path === '') {
      return <Home images={images} handleAnchorClick={handleAnchorClick} currentIndex={currentIndex} carouselImages={carouselImages} goToNext={goToNext} goToPrevious={goToPrevious} />;
    }
    if (path === 'results') {
      return <Results searchResult={searchResult} searchTerm={searchTerm} handleAnchorClick={handleAnchorClick} images={images} carouselImages={carouselImages} currentIndex={currentIndex} />;
    }
    // if (path === 'sneakerCarousel') {
    //   return <SneakerCarousel handleAnchorClick={handleAnchorClick} images={images} carouselImages={carouselImages} currentIndex={currentIndex} />;
    // }
  }
  return (
    <>
      <SearchModal handleSubmit={handleSubmit} handleClick={handleClick} showModal={showModal} onChange={e => setSearchTerm(e.target.value)} />
      <NavBar handleClick={handleClick} handleSubmit={handleSubmit} onChange={e => setSearchTerm(e.target.value)} />
      <Banner />
      {renderPage()}
      {/* <Home images={images}/>
      <Results searchResult={searchResult} searchTerm={searchTerm} /> */}
      <Footer />
    </>
  );
}
