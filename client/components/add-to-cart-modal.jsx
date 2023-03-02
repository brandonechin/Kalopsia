import React from 'react';

export default function CartModal({ product, addToCart, onModalClick, hideModal }) {
  // eslint-disable-next-line no-console
  console.log('testing');
  return (
    <>
      <div className={`bg-gray-500 bg-opacity-50 fixed inset-0 z-10 ${hideModal}`} onClick={onModalClick} />
      <div className={`fixed bg-white inset-0 bottom-auto pb-5 z-20 flex justify-center ${hideModal}`}>
        <div className= 'w-full sm:w-3/4 md:w-1/2 xl:w-1/3 2xl:w-1/4'>
          <div className='flex mb-5 ml-3 mt-3 2xl:ml-8'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 mr-1 text-green-500">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h1 className='font-medium'>Added to Cart</h1>
          </div>
          <div className='flex flex-wrap'>
            <div className='basis-1/2'>
              <div className='flex justify-center'>
                <img className='h-auto w-4/5' src={product ? product.imageUrl : ''} />
              </div>
            </div>
            <div className='basis-1/2 flex items-center'>
              <div className='ml-4'>
                <h1 className='font-medium'>{product ? product.brand : ''} {product ? product.model : ''}</h1>
                <h1 className='text-sm text-gray-400 font-medium'>{product ? product.gender : ''}</h1>
                <h1 className='text-sm text-gray-400 font-medium'>{addToCart || ''}</h1>
                <h1 className='font-medium'>${product ? product.price : ''}</h1>
              </div>
            </div>
          </div>
          <div className='flex flex-wrap mt-6'>
            <div className='basis-1/2 justify-center  flex'>
              <button className=' border rounded-full h-12 w-48 text-lg shadow-lg bg-[#dfefe2] transform transition scale-100 hover:scale-110 '>View Cart</button>
            </div>
            <div className='basis-1/2 justify-center flex'>
              <a className={`border rounded-full h-12 w-48 text-lg shadow-lg text-center pt-2 bg-slate-100 transform transition scale-100 hover:scale-110 ${hideModal}`} onClick={onModalClick} href='#results'>Continue Shopping</a>
            </div>
          </div>
        </div>
      </div>
    </>

  );
}
