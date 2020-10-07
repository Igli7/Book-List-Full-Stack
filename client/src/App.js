import React, { Fragment } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import NavBar from './components/layout/Navbar';
import Home from './components/pages/Home';
import About from './components/pages/About';
import BookState from './context/book/BookState';
import LandingPage from './components/pages/LandingPage';
import Register from './components/auth/Register';
import Login  from './components/auth/Login';

const App = () => {
  return (
    <BookState>
      <Router>
        <Fragment>
        
        
          <div className='bookForm'>
            <Switch>
            <Route exact path='/' component={LandingPage} />
              
            </Switch>

            <NavBar /> 
            <Switch>
            
              <Route exact path='/home' component={Home} />
              <Route exact path='/about' component={About} />
              <Route exact path='/login' component={Login} />
              <Route exact path='/register' component={Register} />
            </Switch>
          </div>
        </Fragment>
      </Router>
    </BookState>
  );
};

export default App;
