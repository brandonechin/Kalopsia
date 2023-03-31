import React, { useState, useEffect } from 'react';
import CartModal from '../components/add-to-cart-modal';

export default function ProductDetails({ productId, cartData, setCartData }) {
  const [clickModal, setClickModal] = useState(false);
  const [product, setProduct] = useState(false);
  const [inventory, setInventory] = useState([]);
  const [sizeSelect, setSizeSelect] = useState('');

  function handleModalClick() {
    setClickModal(!clickModal);
  }

  const hideModal = clickModal ? '' : 'hidden';

  useEffect(() => {
    async function loadProductDetail() {
      try {
        const response = await fetch(`/api/products/${productId}`);
        const data = await response.json();
        setProduct(data);
        // eslint-disable-next-line no-console
        // console.log(data);
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
        // eslint-disable-next-line no-console
        // console.log('inventory', data);
        setInventory(data);
        // console.log(data.rows);
      } catch (err) {
        console.error('Error fetching data:', err);
      }
    }
    loadInventoryDetail();
  }, [productId]);

  function handleSubmitCart(event) {
    event.preventDefault();
    setClickModal(!clickModal);
    let newQuantity;
    for (const obj of inventory) {
      if (obj.size === sizeSelect) {
        newQuantity = --obj.quantity;
      }
    }

    async function updateInventory() {
      try {
        const response = await fetch('/api/update-inventory', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ newQuantity, productId: Number(productId), sizeSelect })
        });
        await response.json();
        // const data = await response.json();
        // eslint-disable-next-line no-console
        // console.log(data);
      } catch (err) {
        console.error('Error fetching data:', err);
      }
    }
    updateInventory();

    async function insertCartItems(dataInput) {
      const quantity = 1;
      try {
        const response = await fetch('/api/insert-cart-items', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ cartId: dataInput.cartId, quantity, productId: Number(productId), sizeSelect })
        });
        await response.json();
        // const data = await response.json();
        // eslint-disable-next-line no-console
        // console.log(data);
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
          setCartData(data);
          insertCartItems(data);
          // eslint-disable-next-line no-console
          // console.log(data);
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
          // console.log(data);
        } catch (err) {
          console.error('Error fetching data:', err);
        }
      }
    }
    insertCart();
    setSizeSelect('');
  }
  // eslint-disable-next-line no-console
  console.log('cartData', cartData);
  const style = 'h-12 w-11/12 shadow-md border mb-2 transform transition scale-100 hover:scale-110 rounded-md';
  const outOfStock = [];
  const outOfStockStyle = 'h-12 w-11/12 shadow-md border mb-2 rounded-md bg-[#d6d3d1] cursor-default';
  for (let i = 0; i < inventory.length; i++) {
    if (inventory[i].quantity < 1) {
      outOfStock.push(inventory[i].size);
    }
  }

  let sizes;
  if (inventory) {
    sizes = inventory.map(results =>
      <div key={results.size} className='basis-2/4 flex justify-center'>
        <button onClick={outOfStock.includes(results.size) ? null : () => setSizeSelect(results.size)} className={`${outOfStock.includes(results.size) ? `${outOfStockStyle}` : `${style}`} ${sizeSelect === results.size ? `${style} bg-[#dfefe2] ` : null}`}>{results.size}</button>
      </div>);
  }

  return (
    <div className='h-screen flex justify-center'>
      <div className='w-4/5 mb-4 mt-8'>
        <CartModal product={product} sizeSelect={sizeSelect} onModalClick={handleModalClick} hideModal={hideModal} cartData={cartData}/>
        <div className='md:flex md:flex-wrap'>
          <div className='mb-2 md:basis-1/2 flex justify-center md:items-center'>
            <img className='object-contain h-48 md:h-72' src={product ? product.imageUrl : ''} />
          </div>
          <div className='md:basis-1/2'>
            <div className='mt-4 mb-4 ml-2'>
              <h1 className='font-medium'>{product ? product.brand : ''} {product ? product.model : ''}</h1>
              <h1 className='text-sm text-gray-400 font-medium'>{product ? product.gender : ''}</h1>
              <h1 className='font-medium'>{product ? '$' + product.price : ''}</h1>
            </div>
            <h1 className='mb-4 ml-2 font-medium '>Select Size</h1>
            <div className='flex flex-wrap mb-4'>
              {sizes}
            </div>
            <form className='flex justify-center' onSubmit={sizeSelect ? handleSubmitCart : null} >
              <button type='submit' className='shadow-lg h-14 w-48 border rounded-full text-black bg-[#dfefe2]  transform transition scale-100 hover:scale-110'>Add to Cart</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
