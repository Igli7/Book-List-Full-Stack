import React, { useState } from 'react';
import library from '../../photo/library.jpg';
import { Link } from 'react-router-dom';

const Register = () => {
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
  });

  const { name, email, password, password2 } = user;

  const onChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = () => {};

  return (
    <div className='landingContainer'>
      <div className='videoContainer'>
        <img width='100vw' height='100vh' src={library} alt=''></img>
      </div>
      <div className='registerForm'>
        <h1>Sign Up</h1>
        <form id='book-form' onSubmit={onSubmit}>
          <div className='text'>
            <input
              type='text'
              name='name'
              id='title'
              required
              value={name}
              onChange={onChange}
            />
            <label htmlFor='name' className='labelName'>
              <span className='contentName'>Name</span>
            </label>
          </div>
          <div className='text'>
            <input
              type='email'
              name='email'
              id='author'
              required
              value={email}
              onChange={onChange}
            />
            <label htmlFor='email' className='labelName'>
              <span className='contentName'>Email Address</span>
            </label>
          </div>
          <div className='text'>
            <input
              type='password'
              name='password'
              id='isbn'
              required
              value={password}
              onChange={onChange}
            />
            <label htmlFor='password' className='labelName'>
              <span className='contentName'>Password</span>
            </label>
          </div>
          <div className='text'>
            <input
              type='password'
              name='password2'
              id='date'
              required
              value={password2}
              onChange={onChange}
            />
            <label htmlFor='password2' className='labelName'>
              <span className='contentName'>Confirm Password</span>
            </label>
          </div>

          <div className='btn'>
            <input type='submit' value='Sign Up' className='button' />
          </div>
        </form>

        <p>
          Already have an Account? <Link className="link" to='/login'>Log in</Link> here.
        </p>
      </div>
    </div>
  );
};

export default Register;
