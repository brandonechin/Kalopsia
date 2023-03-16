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
        // console.log(data);
        // const obj = {};
        // for (let i = 0; i < data.length; i++) {
        //   obj[data[i].size] = data[i].quantity;
        // }
        // console.log(obj);
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
    setSizeSelect('');
    let newQuantity;
    for (const obj of inventory) {

      if (obj.size === sizeSelect) {
        newQuantity = --obj.quantity;
      }
    }
    // for (const key in inventory) {

    //   if (key === sizeSelect) {
    //     newQuantity = --inventory[key];
    //   }
    // }
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
        const response = await fetch('/api/insert-cart-items', {
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
          setCartData(data);
          insertCartItems(data);
          // eslint-disable-next-line no-console
          console.log(data);
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
  // const sizeArray = [];
  let sizes;
  const copyInventory = [...inventory];
  // eslint-disable-next-line no-console
  console.log('copy of inventory', copyInventory);
  if (inventory) {
    sizes = copyInventory.map(results =>
      <div key={results.size} className='basis-2/4 flex justify-center'>
        <button onClick={() => setSizeSelect(results.size)} className={sizeSelect === results.size ? `${style} bg-[#dfefe2]` : `${style}`}>{results.size}</button>
        {/* <button onClick={() => { setSizeSelect(results.size); setSizeClick(!sizeClick); }} className={sizeSelect === results.size ? `${style} bg-[#dfefe2]` : `${style}`}>{results.size}</button> */}
      </div>);

    // sizes = Object.keys(inventory).map((size, index) =>
    //   <div key= {index} className='basis-2/4 flex justify-center'>
    //     <button onClick={() => setSizeSelect(size)} className={sizeSelect === size ? `${style} bg-[#dfefe2]` : `${style}`}>{size}</button>
    //   </div >);

    // for (const key in newInventory) {

    //   sizes =
    //     <div className='basis-2/4 flex justify-center'>
    //       <button onClick={() => setSizeSelect(key)} className={sizeSelect === key ? `${style} bg-[#dfefe2]` : `${style}`}>{key}</button>
    //     </div >;
    //   sizeArray.push(sizes);
    // }

  }

  return (
    <div className='h-screen'>
      <div className='flex justify-center'>
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
    </div>
  );
}
