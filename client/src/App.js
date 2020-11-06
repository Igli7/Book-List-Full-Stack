import React, { Fragment } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import NavBar from './components/layout/Navbar';
import Home from './components/pages/Home';
import BookState from './context/book/BookState';
import AuthState from './context/auth/AuthState';
import AlertState from './context/alert/AlertState';
import LandingPage from './components/pages/LandingPage';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Resend from './components/auth/Resend';
import setAuthToken from './utils/setAuthToken';
import Reset from './components/auth/Reset';
import PrivateRoute from './components/routing/PrivateRoute';
import PrivateRoute1 from './components/routing/PrivateRoute1';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  return (
    <AuthState>
      <BookState>
        <AlertState>
          <Router>
            <Fragment>
              <div className='bookForm'>
                <Switch>
                  <Route exact path='/' component={LandingPage} />
                </Switch>

                <NavBar />
                <Switch>
                  <PrivateRoute exact path='/home' component={Home} />
                  <Route exact path='/login' component={Login} />
                  <Route exact path='/register' component={Register} />
                  <Route exact path='/resend' component={Resend} />
                  <PrivateRoute1 exact path='/reset' component={Reset} />
                </Switch>
              </div>
            </Fragment>
          </Router>
        </AlertState>
      </BookState>
    </AuthState>
  );
};

export default App;
