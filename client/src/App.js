// Fragment is a "gost" element it will not show up in the DOM
import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import './App.css';

const App = () => (
  // Need to wrap everything within Router
  <Router>
    <Fragment>
      <Navbar />
      <Route exact path='/' component={Landing} />
      {/* Every page within the theme (except for the landing page) has a className="container" to push the content to the middle */}
      <section className='container'>
        {/* Wrapping everything in the Switch */}
        <Switch>
          <Route exact path='/register' component={Register} />
          <Route exact path='/login' component={Login} />
        </Switch>
      </section>
    </Fragment>
  </Router>
);

export default App;
