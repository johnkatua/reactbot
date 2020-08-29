import React from 'react';
import { Link } from 'react-router-dom';
 
const Header = () => (
    <nav className='nav-wrapper'>
      <Link to={'/'} className='brand-logo'>React chatbot</Link>
      <ul id='nav-mobile' className='right hide-on-med-and-down'>
        <li><Link to={'/shop'}>Shop</Link></li>
        <li><Link to={'/about'}>About us</Link></li>
      </ul>
    </nav>
  )


export default Header;
