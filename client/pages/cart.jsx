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
        console.log('cartItems', data);
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
    }
  }, [cartItems, products]);
  // eslint-disable-next-line no-console
  console.log('cartProductsInfo', cartProductsInfo);
  // eslint-disable-next-line no-console
  console.log(cartData);
  let sneakers;
  const totalItems = cartProductsInfo ? cartProductsInfo.length : null;
  const totalCost = cartData !== null ? `$${cartData.totalCost}` : '—';
  if (totalItems > 0) {
    sneakers = cartProductsInfo.map(results =>
      <div key={results.productId} className='flex' >
        <li className='mt-10  ml-3 list-none flex'>
          <a href={`#product-details?productId=${results.productId}`} className='cursor-pointer'>
            <img className='h-24 w-4/5 object-contain' src={results.imageUrl} />
          </a>
          <div>
            <a href={`#product-details?productId=${results.productId}`} className='cursor-pointer'>
              <h2 className='font-medium'>{results.brand} {results.model}</h2>
            </a>
            <h2 className='text-sm text-gray-400 font-medium'>{results.gender}</h2>
            <h2 className='font-medium'>${results.price}</h2>
            <h2 className='text-sm text-gray-400 font-medium'>Size {results.size}</h2>
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
    <div className='h-screen'>
      <div className='md:w-11/12 lg:w-10/12 xl:w-1/2'>
        <div className='flex justify-center mt-8 font-medium text-lg'>
          Cart
        </div>
        <div className='flex justify-center'>
          {`${totalItems} ${totalItems === 1 ? 'Item' : 'Items'} | ${totalCost}`}
        </div>
        <div>
          {sneakers}
        </div>
        <div>
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
            $500
          </div>
        </div>
      </div>
    </div>
  );
}
