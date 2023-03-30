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
  // <div className='flex justify-center items-center'>
  //   <h1 className='text-4xl'>Under Construction...</h1>
  // </div>
    <div className='h-screen'>
      <div className='md:w-11/12 lg:w-10/12 xl:w-1/2'>
        {/* <div className='flex flex-wrap'>
          <div className='basis-1/2'>
            hi
          </div>
          <div className='basis-1/2'>
            <div className='flex'>
              <h1>Summary</h1>
            </div>
            <div className='flex'>
              <div className='flex justify-center basis-1/2'>
                <h1>Subtotal</h1>
              </div>
              <div className='flex justify-center basis-1/2'>
                <h1>$900</h1>
              </div>
            </div>
            <div className='flex'>
              <div className='flex justify-center basis-1/2'>
                <h1>Total</h1>
              </div>
              <div className='flex justify-center basis-1/2'>
                <h1>$900</h1>
              </div>
            </div>
          </div>
        </div> */}
        <div className='flex justify-center'>
          Bag
        </div>
        <div className='flex justify-center'>
          X Items | $907
        </div>
        <div>
          shoe info
        </div>
        <div>
          Summary
        </div>
        <div className='flex justify-between'>
          <div>
            Subtotal
          </div>
          <div>
            $500
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
