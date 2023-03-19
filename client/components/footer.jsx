import React from 'react';
import kalopsia from '../../images/kalopsia-footer.png';

export default function Footer() {
  return (
    <div>
      <div className='bg-[#231f20] h-44 w-full flex justify-center'>
        <div className='flex items-center justify-center'>
          <img src={kalopsia} className="h-16 w-25"/>
        </div>
        <div className='text-white ml-2 items-center flex text-xs'>
          <a className='mr-5 ' href='#about'>About</a>
          <a className='mr-5' href='#contact'>Contact Us</a>
          <a className=' ' href='#returns'>Returns & Exchanges</a>
        </div>
      </div>
      <div className='h-9 bg-[#aaa2a2]'>
        <h2 className='text-center text-white text-md pt-1'>© 2020 Kalopsia, Inc.</h2>
      </div>
    </div>
  );
}
