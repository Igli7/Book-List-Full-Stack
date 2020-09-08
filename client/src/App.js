import React, { Fragment } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import NavBar from './components/layout/Navbar';
import Home from './components/pages/Home';
import About from './components/pages/About';
import BookState from './context/book/BookState';
import LandingPage from './components/pages/LandingPage'

const App = () => {
  return (
    <BookState>
      <Router>
        <Fragment>
        
          {/* <NavBar /> */}
          <div className='bookForm'>
            <Switch>
              <Route exact path='/' component={Home} />
              <Route exact path='/landing' component={LandingPage} />
              <Route exact path='/about' component={About} />
            </Switch>
          </div>
        </Fragment>
      </Router>
    </BookState>
  );
};

export default App;
