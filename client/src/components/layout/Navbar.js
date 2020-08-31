import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className='nav'>
      <div>
        <a href='/' className='logo'>
          <i className='fas fa-book-open' />
        </a>
        <a href='/' className='logo logoText'>
          My<span>Book </span> List
        </a>
      </div>
      <ul>
        <li>
          <Link to='/'>Home</Link>
        </li>
        <li>
          <Link to='/about'>About</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
