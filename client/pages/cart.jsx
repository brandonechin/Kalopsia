import React, { useEffect } from 'react';

export default function Cart() {

  useEffect(() => {
    async function cartItems() {
      const cartId = 1;
      try {
        const response = await fetch(`/api/cart-items/${cartId}`);
        const data = await response.json();
        // eslint-disable-next-line no-console
        console.log(data);
      } catch (err) {
        console.error(err);
      }
    }
    cartItems();
  }, []);

  return (
    <div className='h-screen flex justify-center items-center'>
      <h1 className='text-4xl'>Under Construction...</h1>
    </div>
  );
}
