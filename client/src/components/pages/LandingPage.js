import React from 'react';
import video from '../../photo/video.mp4';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div className='cont'>
      <div className='landingContainer'>
        <div className='videoContainer'>
          <video
            autoPlay
            loop
            muted
            width='100vw'
            height='100vh'
            src={video}
          ></video>
        </div>
        <div className='content'>
          <a href='' className='logo logoText landingLogo' style={{}}>
            My<span>Book </span> List
          </a>

          <h4>
            Keep track of your books and <br />
            write a breif summary about each of them.{' '}
          </h4>

          <p>To get started:</p>

          <div className='buttons'>
            <Link className='loginButton button' to='/login'>
              {' '}
              <span style={{ position: 'relative', zIndex: '12' }}>Log In</span>
            </Link>
            <Link className='signupButton button' to='/register'>
              <span style={{ position: 'relative', zIndex: '12' }}>
                Sign Up
              </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
