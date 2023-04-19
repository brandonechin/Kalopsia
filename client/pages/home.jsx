import React from 'react';
import Carousel from '../components/carousel';
import jordan6 from '../../server/public/images/jordan6.png';

export default function Home({ products, onAnchorClick, error }) {
  let sneakerProductHome;
  if (error) {
    sneakerProductHome = <h1 className='flex justify-center'>There was a problem loading products. Please try again.</h1>;
  } else {
    sneakerProductHome = <img className='h-auto w-auto' src={products ? products[0].imageUrl : ''} />;
  }
  return (
    <div>
      <div className='flex justify-center'>
        <div className='md:w-11/12 lg:w-10/12 xl:w-1/2'>
          <Carousel onAnchorClick={onAnchorClick} />
          <h2 className='text-center underline font-medium mt-4 mb-4'> New Arrivals</h2>
          <div className='flex justify-center'>
            <div className='flex flex-wrap mt-3 w-11/12'>
              <div className='basis-2/4 flex justify-center transform transition scale-100 hover:scale-110 cursor-pointer'>
                <div className='h-auto w-11/12'>
                  <a href="#product-details?productId=1">
                    {/* <img className='h-auto w-auto' src={products ? products[0].imageUrl : ''} /> */}
                    {sneakerProductHome}
                    <h2 className='font-medium'>{products ? products[0].brand : ''} {products ? products[0].model : ''}</h2>
                    <h2 className='text-sm text-gray-400 font-medium'>{products ? products[0].gender + ' Shoes' : ''} </h2>
                    <h2 className='font-medium'>{products ? '$' + products[0].price : ''}</h2>
                  </a>
                </div>
              </div>
              <div className='basis-2/4 flex justify-center transform transition scale-100 hover:scale-110 cursor-pointer'>
                <div className='h-auto w-11/12'>
                  <a href="#product-details?productId=15">
                    <img className='h-auto w-auto' src={products ? products[14].imageUrl : ''} />
                    <h2 className='font-medium'>{products ? products[14].brand : ''} {products ? products[14].model : ''}</h2>
                    <h2 className='text-sm text-gray-400 font-medium'>{products ? products[14].gender + ' Shoes' : ''} </h2>
                    <h2 className='font-medium'>{products ? '$' + products[14].price : ''}</h2>
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className='flex justify-center '>
            <img className='mt-10 w-full h-96 object-cover mb-5' src={jordan6}/>
          </div>
        </div>
      </div>
    </div>
  );
}
