import React, { Fragment, useContext } from 'react';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import AuthContext from '../../context/auth/authContext';
import BookContext from '../../context/book/bookContext';

const Navbar = (props) => {
  let location = useLocation();

  const authContext = useContext(AuthContext);
  const bookContext = useContext(BookContext);

  const { resendReset, logout, user } = authContext;

  const { clearBooks } = bookContext;

  const onClick = () => {
    resendReset();
  };

  const onLogout = () => {
    logout();
    clearBooks();
    
  };

  let name = '';
  if (user !== null ) {
    name = user.name;
  }

  return (
    <Fragment>
      {location.pathname === '/resend' || location.pathname === '/reset' ? (
        <nav className='nav'>
          <div>
            <a href={location.pathname} className='logo'>
              <i className='fas fa-book-open' />
            </a>
            <a href={location.pathname} className='logo logoText'>
              My<span>Book </span> List
            </a>
          </div>
          <ul>
            <li>
              <Link to='/login' onClick={onClick}>
                Login
              </Link>
            </li>
            <li>
              <Link to='/register' onClick={onClick}>
                Sign up
              </Link>
            </li>
          </ul>
        </nav>
      ) : (
        location.pathname !== '/' &&
        location.pathname !== '/register' &&
        location.pathname !== '/login' && (
          <nav className='nav'>
            <div>
              <a href={location.pathname} className='logo'>
                <i className='fas fa-book-open' />
              </a>
              <a href={location.pathname} className='logo logoText'>
                My<span>Book </span> List
              </a>
            </div>
            <ul>
              <li>
                <p style={{ fontSize: '0.9em' }}>
                  Welcome back, <span>{name}</span>
                </p>
              </li>
              <li>
                <a href='#!' onClick={onLogout}>
                  <i className='fas fa-sign-out-alt'>
                    <span>Logout</span>
                  </i>
                </a>
              </li>
            </ul>
          </nav>
        )
      )}
    </Fragment>
  );
};

export default Navbar;
