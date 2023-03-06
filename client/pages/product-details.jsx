import React, { useState, useEffect } from 'react';
import CartModal from '../components/add-to-cart-modal';
import Footer from '../components/footer';

export default function ProductDetails({ productId, showModal, cartData, setCartData }) {
  const [clickModal, setClickModal] = useState(false);
  const [product, setProduct] = useState();
  const [inventory, setInventory] = useState();
  const [sizeSelect, setSizeSelect] = useState('');
  // const [cartData, setCartData] = useState(null);

  function onModalClick() {
    setClickModal(!clickModal);
  }

  const hideModal = clickModal ? '' : 'hidden';

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
  }, [productId]);

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
  }, [productId]);

  function onSubmitCart(event) {
    let newQuantity;
    event.preventDefault();
    setClickModal(!clickModal);
    for (const key in inventory) {
      if (inventory[key].size === sizeSelect) {
        newQuantity = --inventory[key].quantity;
      }
    }
    async function updateInventory() {
      try {
        const response = await fetch('/api/update-inventory', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ newQuantity, productId: Number(productId), sizeSelect })
        });
        const data = await response.json();
        // eslint-disable-next-line no-console
        console.log(data);
      } catch (err) {
        console.error('Error fetching data:', err);
      }
    }
    updateInventory();

    async function insertCartItems(dataInput) {
      const quantity = 1;
      try {
        const response = await fetch('/api/update-cart-items', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ cartId: dataInput.cartId, quantity, productId: Number(productId), sizeSelect })
        });
        const data = await response.json();
        // eslint-disable-next-line no-console
        console.log(data);
      } catch (err) {
        console.error('Error fetching data:', err);
      }
    }

    async function insertCart() {
      const productPrice = product.price;
      const userIdSet = 1;
      if (cartData === null || cartData.userId !== 1) {
        try {
          const response = await fetch('/api/insert-cart', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userIdSet, productPrice })
          });
          const data = await response.json();
          // eslint-disable-next-line no-console
          console.log(data);
          setCartData(data);
          insertCartItems(data);
        } catch (err) {
          console.error('Error fetching data:', err);
        }
      } else {
        const newTotalCost = Number(cartData.totalCost) + Number(product.price);
        const cartId = cartData.cartId;
        try {
          const response = await fetch('/api/new-total-cost', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ cartId, newTotalCost })
          });
          const data = await response.json();
          setCartData(data);
          insertCartItems(data);
          // eslint-disable-next-line no-console
          console.log(data);
        } catch (err) {
          console.error('Error fetching data:', err);
        }
      }
    }
    insertCart();
  }

  const style = 'h-12 w-11/12 shadow-md border mb-2 transform transition scale-100 hover:scale-110 rounded-md';
  let sizes;
  if (inventory) {
    sizes = inventory.map(results =>
      <div key={results.size} className='basis-2/4 flex justify-center'>
        <button onClick={() => setSizeSelect(results.size)} className={sizeSelect === results.size ? `${style} bg-[#dfefe2]` : `${style}`}>{results.size}</button>
      </div>);
  }
  return (
    <div>
      <div className='flex justify-center'>
        <div className='w-4/5'>
          <CartModal product={product} sizeSelect={sizeSelect} onModalClick={onModalClick} hideModal={hideModal} cartData={cartData}/>
          <div className='md:flex md:justify-center'>
            <div className='mt-4 mb-4 ml-2 md:ml-20'>
              <h1 className='font-medium'>{product ? product.brand : ''} {product ? product.model : ''}</h1>
              <h1 className='text-sm text-gray-400 font-medium'>{product ? product.gender : ''}</h1>
              <h1 className='font-medium'>{product ? '$' + product.price : ''}</h1>
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
              <form onSubmit={sizeSelect ? onSubmitCart : null} >
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
