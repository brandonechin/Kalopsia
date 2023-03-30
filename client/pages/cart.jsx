import React, { useState, useEffect } from 'react';

export default function Cart({ products }) {
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
        // console.log(data);
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
            productsInfo.push(products[j]);
          }
        }
      }
      setCartProductsInfo(productsInfo);
    }
  }, [cartItems, products]);
  // eslint-disable-next-line no-console
  console.log(cartProductsInfo);
  // let sneakers;
  // const totalItems = cartProductsInfo ? cartProductsInfo.length : null;
  // if (totalItems > 0) {
  //   sneakers = cartProductsInfo.map(results =>
  //     <a key={results.productId} className='flex' href={`#product-details?productId=${results.productId}`}>
  //       <li className='mt-10 cursor-pointer ml-3 list-none'>
  //         <img className='h-16 w-4/5 object-contain' src={results.imageUrl} />
  //         <h2 className='font-medium'>{results.brand} {results.model}</h2>
  //         <h2 className='text-sm text-gray-400 font-medium'>{results.gender}</h2>
  //         <h2 className='font-medium'>${results.price}</h2>
  //       </li>
  //     </a>);
  // } else {
  //   sneakers = <h1>There are no items in your cart.</h1>;
  // }
  return (
    <div className='flex justify-center items-center'>
      <h1 className='text-4xl'>Under Construction...</h1>
    </div>
  // <div className='h-screen'>
  //   <div className='md:w-11/12 lg:w-10/12 xl:w-1/2'>
  //     <div className='flex justify-center'>
  //       Cart
  //     </div>
  //     <div className='flex justify-center'>
  //       {`${totalItems} Items | —`}
  //     </div>
  //     <div>
  //       {sneakers}
  //     </div>
  //     <div>
  //       Summary
  //     </div>
  //     <div className='flex justify-between'>
  //       <div>
  //         Subtotal
  //       </div>
  //       <div>
  //         $500
  //       </div>
  //     </div>
  //     <div className='flex justify-between'>
  //       <div>
  //         Shipping
  //       </div>
  //       <div>
  //         $500
  //       </div>
  //     </div>
  //     <div className='flex justify-between'>
  //       <div>
  //         Tax
  //       </div>
  //       <div>
  //         $500
  //       </div>
  //     </div>
  //     <div className='flex justify-between'>
  //       <div>
  //         Total
  //       </div>
  //       <div>
  //         $500
  //       </div>
  //     </div>
  //   </div>
  // </div>
  );
}
