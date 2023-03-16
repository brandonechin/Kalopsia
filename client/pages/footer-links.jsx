import React from 'react';
import About from '../components/about';
import Contact from '../components/contact';
import Return from '../components/return';

export default function FooterLinks({ route }) {
  const { path } = route;

  function renderLink() {
    if (path === 'about') {
      return <About />;
    } else if (path === 'contact') {
      return <Contact />;
    } else if (path === 'returns') {
      return <Return />;
    }
  }
  return (
    <div className='h-screen'>
      {renderLink()}
    </div>
  );
}
