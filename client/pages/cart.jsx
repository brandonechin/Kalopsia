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

  return (
    <div className='h-screen flex justify-center items-center'>
      <h1 className='text-4xl'>Under Construction...</h1>
    </div>
  );
}
