import React, { useState, useEffect } from 'react';
import parseRoute from './lib/parse-route';
import Home from './pages/home';
import Results from './pages/results';
import NavBar from './components/nav-bar';
import Banner from './components/banner';
import Footer from './components/footer';
import SearchModal from './components/search-modal';
import SneakerCarousel from './pages/sneakerCarousel';

export default function App() {
  const [isVisible, setIsVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResult, setSearchResult] = useState('');
  const [images, setImages] = useState('');
  const [route, setRoute] = useState(parseRoute(window.location.hash));

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
          window.location.hash = 'results';
          setSearchResult(imageArray);
          handleClick();

        }
        // eslint-disable-next-line no-console
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
      return <Home images={images} />;
    }
    if (path === 'results') {
      return <Results searchResult={searchResult} searchTerm={searchTerm} />;
    }
    if (path === 'sneakerCarousel') {
      return <SneakerCarousel images={images} />;
    }
  }
  return (
    <>
      <SearchModal handleSubmit={handleSubmit} handleClick={handleClick} showModal={showModal} onChange={e => setSearchTerm(e.target.value)} />
      <NavBar handleClick={handleClick} />
      <Banner />
      {renderPage()}
      {/* <Home images={images}/>
      <Results searchResult={searchResult} searchTerm={searchTerm} /> */}
      <Footer />
    </>
  );
}
