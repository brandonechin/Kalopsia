import React from 'react';
import Carousel from '../components/carousel';
import jordan6 from '../../images/jordan6.png';

export default function Home({ images }) {

  return (
    <div>
      <Carousel/>
      <h2 className='text-center underline font-medium mt-4'> New Arrivals</h2>
      <div className='flex mt-3'>
        <div className='basis-2/4 hover:bg-gray-100 cursor-pointer'>
          <img src={images ? images[0].imageUrl : ''} />
          <h2 className='font-medium'>{images ? images[0].brand : ''} {images ? images[0].model : ''}</h2>
          <h2 className='text-sm text-gray-400 font-medium'>{images ? images[0].gender : ''} Shoes</h2>
          <h2 className='font-medium'>${images ? images[0].price : ''}</h2>

        </div>
        <div className='basis-2/4 hover:bg-gray-100 cursor-pointer'>
          <img src={images ? images[14].imageUrl : ''} />
          <h2 className='font-medium'>{images ? images[14].brand : ''} {images ? images[14].model : ''}</h2>
          <h2 className='text-sm text-gray-400 font-medium'>{images ? images[14].gender : ''} Shoes</h2>
          <h2 className='font-medium'>${images ? images[14].price : ''}</h2>
        </div>
      </div>
      <img className='mt-5' src={jordan6}/>
    </div>
  );
}
