import React, { useState, useEffect } from 'react';

export default function Cart({ products, cartData }) {
  const [cartItems, setCartItems] = useState(null);
  const [cartProductsInfo, setCartProductsInfo] = useState(null);

  useEffect(() => {
    async function cartItems() {
      const cartId = 1;
      try {
        const response = await fetch(`/api/cart-items/${cartId}`);
        const data = await response.json();
        setCartItems(data);
        // eslint-disable-next-line no-console
        // console.log('cartItems', data);
      } catch (err) {
        console.error(err);
      }
    }
    cartItems();
  }, []);

  useEffect(() => {
    if (cartItems) {
      const productsInfo = [];
      for (let i = 0; i < cartItems.length; i++) {
        for (let j = 0; j < products.length; j++) {
          if (cartItems[i].productId === products[j].productId) {
            products[j].size = cartItems[i].size;
            productsInfo.push(products[j]);
          }
        }
      }
      setCartProductsInfo(productsInfo);
      // eslint-disable-next-line no-console
      // console.log('cartProductsInfo', cartProductsInfo);
    }

  }, [cartItems, products]);

  // useEffect(() => {

  //   if (cartItems && cartProductsInfo) {
  //   // eslint-disable-next-line no-console
  //     console.log('cartItems', cartItems);
  //     let x;
  //     for (let l = 0; l < cartItems.length; l++) {
  //       // cartProductsInfo[l].cartItemsId = cartItems[l].cartItemsId;
  //       x = cartItems[l].cartItemsId;
  //       cartProductsInfo[l].cartItemsId = x;

  //       console.log('test', x);

  //       console.log('cartProductInfoLoop', cartProductsInfo[l]);
  //       console.log('cartItems', cartItems[l]);
  //     }
  //   }
  // }, [cartItems, cartProductsInfo]);

  function handleDelete(event) {
    // async function cartItems() {
    //   const cartId = 1;
    //   try {
    //     const response = await fetch(`/api/cart-items/${cartId}`);
    //     const data = await response.json();
    //     setCartItems(data);
    //     // eslint-disable-next-line no-console
    //     console.log('cartItems', data);
    //   } catch (err) {
    //     console.error(err);
    //   }
    // }
    // cartItems();
  }

  let sneakers;
  const totalItems = cartProductsInfo ? cartProductsInfo.length : null;
  const totalCost = cartData !== null ? `$${cartData.totalCost}` : '—';
  if (totalItems > 0) {
    sneakers = cartProductsInfo.map(results =>
      <div key={results.productId} className='border-b pb-3' >
        <li className='mt-10  ml-3 list-none flex'>
          <a href={`#product-details?productId=${results.productId}`} className='cursor-pointer'>
            <img className='h-24 w-4/5 object-contain' src={results.imageUrl} />
          </a>
          <div>
            <a href={`#product-details?productId=${results.productId}`} className='cursor-pointer'>
              <h2 className='font-medium'>{results.brand} {results.model}</h2>
            </a>
            <h2 className='text-sm text-gray-400 font-medium'>{results.gender}</h2>
            <h2 className='text-sm text-gray-400 font-medium'>Size {results.size}</h2>
            <i onClick={handleDelete} className="text-gray-400 fa-solid fa-trash-can cursor-pointer" />
          </div>
          <div className='flex ml-auto'>
            <h2 className='font-medium'>${results.price}</h2>
          </div>
        </li>
      </div>);
  } else {
    sneakers = <h1>There are no items in your cart.</h1>;
  }
  return (
  // <div className='flex justify-center items-center'>
  //   <h1 className='text-4xl'>Under Construction...</h1>
  // </div>
    <div className='flex justify-center'>
      <div className='w-full lg:w-10/12 xl:w-1/2 mx-2'>
        <div className='flex justify-center mt-8 font-medium text-lg'>
          Cart
        </div>
        <div className='flex justify-center border-b pb-5'>
          {`${totalItems} ${totalItems === 1 ? 'Item' : 'Items'} | ${totalCost}`}
        </div>
        <div>
          {sneakers}
        </div>
        <div className='ml-2 mt-2'>
          <div className='text-lg font-normal'>
            Summary
          </div>
          <div className='flex justify-between'>
            <div>
              Subtotal
            </div>
            <div>
              {totalCost}
            </div>
          </div>
          <div className='flex justify-between'>
            <div>
              Shipping
            </div>
            <div>
              $500
            </div>
          </div>
          <div className='flex justify-between'>
            <div>
              Tax
            </div>
            <div>
              $500
            </div>
          </div>
          <div className='flex justify-between'>
            <div>
              Total
            </div>
            <div>
              {totalCost}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
