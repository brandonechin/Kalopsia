import React, { useState, useEffect } from 'react';
import CartModal from '../components/add-to-cart-modal';
import Footer from '../components/footer';

export default function ProductDetails({ productId, showModal }) {
  const [product, setProduct] = useState();
  const [inventory, setInventory] = useState();
  const [addToCart, setAddToCart] = useState('');
  const [clickModal, setClickModal] = useState(false);
  // const [sizeSelect, setSizeSelect] = useState(false);

  function onModalClick() {
    setClickModal(!clickModal);
  }

  let hideModal;
  if (clickModal) {
    hideModal = '';
  } else {
    hideModal = 'hidden';
  }

  useEffect(() => {
    async function loadProductDetail() {
      try {
        const response = await fetch(`/api/products/${productId}`);
        const data = await response.json();
        // console.log(response);
        setProduct(data);
        // console.log(data.rows);
      } catch (err) {
        console.error('Error fetching data:', err);
      }
    }
    loadProductDetail();
  }, []);

  useEffect(() => {
    async function loadInventoryDetail() {
      try {
        const response = await fetch(`/api/inventory/${productId}`);
        const data = await response.json();
        // console.log(response);
        setInventory(data);
        // console.log(data.rows);
      } catch (err) {
        console.error('Error fetching data:', err);
      }
    }
    loadInventoryDetail();
  }, []);

  // useEffect(() => {
  //   fetch(`/api/products/${productId}`)
  //     .then(res => res.json())
  //     .then(product => setProduct(product))
  //     .catch(err => console.error(err));
  // }, []);
  // console.log(product);
  // console.log(inventory);
  // let { brand, model, price, gender, imageUrl };
  // if (product) {
  //  let { brand, model, price, gender, imageUrl } = product;
  // }

  // function onAddToCart() {
  //   setAddToCart(!addToCart);
  //   console.log('test');
  // }
  function onAddToCart(event) {
    event.preventDefault();
    // console.log(addToCart);
    // console.log('gabagool');
    setClickModal(!clickModal);
    // useEffect(() => {
    //   async function loadInventoryDetail() {
    //     try {
    //       const response = await fetch(`/api/addToCart/${productId}`);
    //       const data = await response.json();
    //       // console.log(response);
    //       setInventory(data);
    //       // console.log(data.rows);
    //     } catch (err) {
    //       console.error('Error fetching data:', err);
    //     }
    //   }
    //   loadInventoryDetail();
    // }, []);
    // }
  }

  // function onSizeSelect() {
  //   setSizeSelect(!sizeSelect);
  //   console.log('test');
  // }

  const style = 'h-12 w-11/12 shadow-md border mb-2 transform transition scale-100 hover:scale-110 rounded-md';
  let sizes;
  if (inventory) {
    sizes = inventory.map(results =>
      <div key={results.size} className='basis-2/4 flex justify-center'>
        <button onClick={() => setAddToCart(results.size)} className={addToCart === results.size ? `${style} bg-[#dfefe2]` : `${style}`}>{results.size}</button>
      </div>);
  }
  return (
    <div>
      <div className='flex justify-center'>
        <div className='w-4/5'>
          <CartModal product={product} addToCart={addToCart} onModalClick={onModalClick} hideModal={hideModal}/>
          <div className='md:flex md:justify-center'>
            <div className='mt-4 mb-4 ml-2 md:ml-28'>
              <h1 className='font-medium'>{product ? product.brand : ''} {product ? product.model : ''}</h1>
              <h1 className='text-sm text-gray-400 font-medium'>{product ? product.gender : ''}</h1>
              <h1 className='font-medium'>${product ? product.price : ''}</h1>
            </div>
          </div>
          <div className='md:flex md:flex-wrap'>
            <div className='mb-2 md:basis-1/2 flex justify-center md:items-center'>
              <img className='object-contain h-48 md:h-72' src={product ? product.imageUrl : ''} />
            </div>
            <div className='md:basis-1/2'>
              <div className='md:w-3/4'>
                <h1 className='mb-4 ml-2 font-medium '>Select Size</h1>
                <div className='flex flex-wrap'>
                  {sizes}
                </div>
              </div>
            </div>
          </div>
          <div className='flex justify-center md:justify-end mb-5'>
            <div className='md:mr-44'>
              <form onSubmit={onAddToCart} >
                <button type='submit' className='shadow-lg h-14 w-48 border rounded-full text-black bg-[#dfefe2]  transform transition scale-100 hover:scale-110'>Add to Cart</button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
}
