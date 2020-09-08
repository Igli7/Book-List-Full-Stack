import React from 'react';
import video from '../../photo/video.mp4';

const LandingPage = () => {
    return (
        <div className='landingContainer'>
            <div className='videoContainer'>
                <video autoPlay loop muted width='100vw' height='100vh' src={video}>

                </video>
            </div>
            <div className="content">
            <a href='/landing' className='logo logoText landingLogo' style={{
                
            }}>
          My<span>Book </span> List
        </a>

            </div>
        </div>
    )
}

export default LandingPage
