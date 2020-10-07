import React, {Fragment} from 'react';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom'

const Navbar = () => {

  let location = useLocation();
  console.log(location.pathname);

  
  return (
    <Fragment>
    { (location.pathname !== '/' && location.pathname !== '/register' && location.pathname !== '/login')  && <nav className='nav'>
      <div>
        <a href='' className='logo'>
          <i className='fas fa-book-open' />
        </a>
        <a href='' className='logo logoText'>
          My<span>Book </span> List
        </a>
      </div>
      <ul>
        <li>
          <Link to='/home'>Home</Link>
        </li>
        <li>
          <Link to='/about'>About</Link>
        </li>
      </ul>
    </nav>}
    
    </Fragment>
  );
};

export default Navbar;
