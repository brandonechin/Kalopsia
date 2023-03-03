import React, { useState, useEffect } from 'react';
import parseRoute from './lib/parse-route';
import Home from './pages/home';
import Results from './pages/results';
import ProductDetails from './pages/product-details';
import NavBar from './components/nav-bar';
import Banner from './components/banner';
import SearchModal from './components/search-modal';

export default function App() {
  const [isVisible, setIsVisible] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResult, setSearchResult] = useState([]);
  const [images, setImages] = useState(undefined);
  const [route, setRoute] = useState(parseRoute(window.location.hash));
  const [cartData, setCartData] = useState(null);

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

  function onAnchorClick() {
    setIsClicked(true);
    setSearchResult([]);
  }

  window.addEventListener('load', () => {
    async function getImages() {
      try {
        const response = await fetch('/api/sneakers');
        const data = await response.json();
        setImages(data.rows);
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
            }
          }
          window.location.hash = 'results';
          setSearchResult(imageArray);
        }
      })
      .catch(err => console.error(err));
  }

  let showModal;
  if (isVisible) {
    showModal = '';
  } else {
    showModal = 'hidden';
  }

  function renderPage() {
    const { path } = route;
    if (path === '') {
      return <Home images={images} onAnchorClick={onAnchorClick} />;
    }
    if (path === 'results') {
      return <Results searchResult={searchResult} searchTerm={searchTerm} images={images} isClicked={isClicked} />;
    }
    if (path === 'product-details') {
      const productId = route.params.get('productId');
      return <ProductDetails productId={productId} showModal={showModal} cartData={cartData} setCartData={setCartData}/>;
    }
  }
  return (
    <>
      <SearchModal handleSubmit={handleSubmit} handleClick={handleClick} showModal={showModal} onChange={e => setSearchTerm(e.target.value)} />
      <NavBar handleClick={handleClick} handleSubmit={handleSubmit} onChange={e => setSearchTerm(e.target.value)} />
      <Banner />
      {renderPage()}
    </>
  );
}
