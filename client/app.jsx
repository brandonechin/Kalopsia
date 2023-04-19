import React, { useState, useEffect } from 'react';
import parseRoute from './lib/parse-route';
import Home from './pages/home';
import Results from './pages/results';
import ProductDetails from './pages/product-details';
import FooterLinks from './pages/footer-links';
import Cart from './pages/cart';
import NavBar from './components/nav-bar';
import Banner from './components/banner';
import Footer from './components/footer';
import SearchModal from './components/search-modal';

export default function App() {
  const [isVisible, setIsVisible] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [print, setPrint] = useState('');
  const [searchResult, setSearchResult] = useState([]);
  const [products, setProducts] = useState(undefined);
  const [route, setRoute] = useState(parseRoute(window.location.hash));
  const [cartData, setCartData] = useState(null);
  const [error, setError] = useState('');

  function handleChange(event) {
    setRoute(parseRoute(window.location.hash));
  }

  useEffect(() => {
    window.addEventListener('hashchange', handleChange);
    return () => window.removeEventListener('hashchange', handleChange);
  }, []);

  function handleSearchTerm(event) {
    setSearchTerm(event.target.value);
  }

  function handleClick() {
    setIsVisible(!isVisible);
  }

  function handleAnchorClick() {
    setIsClicked(true);
    setSearchResult([]);
    setPrint('');
  }

  window.addEventListener('load', () => {
    async function getProducts() {
      try {
        const response = await fetch('/api/sneakers');
        const data = await response.json();
        setProducts(data.rows);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError(err);
      }
    }
    getProducts();
  });

  function handleSubmit(event) {
    event.preventDefault();
    if (isVisible) {
      setIsVisible(!isVisible);
    }
    if (searchTerm) {
      const productsArray = [];
      const lowerCaseSearchTerm = searchTerm.toLowerCase();
      for (let i = 0; i < products.length; i++) {
        const brandModel = `${products[i].brand.toLowerCase()} ${products[i].model.toLowerCase()}`;
        if (brandModel.includes(lowerCaseSearchTerm)) {
          productsArray.push(products[i]);
        }
      }
      window.location.hash = 'results';
      setSearchResult(productsArray);
    }
    setIsClicked(false);
    setPrint(searchTerm);
    setSearchTerm('');
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
      return <Home products={products} onAnchorClick={handleAnchorClick} error={error}/>;
    }
    if (path === 'results') {
      return <Results print={print} searchResult={searchResult} setSearchTerm={setSearchTerm} searchTerm={searchTerm} products={products} isClicked={isClicked} />;
    }
    if (path === 'product-details') {
      const productId = route.params.get('productId');
      return <ProductDetails productId={productId} cartData={cartData} setCartData={setCartData} />;
    }
    if (path === 'cart') {
      return <Cart products={products} cartData={cartData}/>;
    }
    if (path === 'about' || path === 'contact' || path === 'returns') {
      return <FooterLinks route={route}/>;
    }
  }
  return (
    <div className='main-container'>
      <SearchModal onSubmit={handleSubmit} onClick={handleClick} searchTerm={searchTerm} setSearchTerm={setSearchTerm} showModal={showModal} onChange={handleSearchTerm} />
      <div>
        <NavBar onSubmit={handleSubmit} onClick={handleClick} searchTerm={searchTerm} onChange={handleSearchTerm} />
        <Banner />
      </div>
      <div>
        {renderPage()}
      </div>
      <div>

        <Footer />
      </div>
    </div>
  );
}
