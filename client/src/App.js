// Main App component

// Fragment is a "gost" element it will not show up in the DOM
import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Alert from './components/layout/Alert';
// Redux
// 'Provider' comes from React, Redux package. Redux is separate from React but Provider will combine them together...(?) We will achieve that by surrounding entire App with Provider...
import { Provider } from 'react-redux';
import store from './store';
import './App.css';

const App = () => (
  <Provider store={store}>
    {/* // Need to wrap everything within Router */}
    <Router>
      <Fragment>
        <Navbar />
        <Route exact path='/' component={Landing} />
        {/* Every page within the theme (except for the landing page) has a className="container" to push the content to the middle */}
        <section className='container'>
          <Alert />
          {/* Wrapping everything in the Switch */}
          <Switch>
            <Route exact path='/register' component={Register} />
            <Route exact path='/login' component={Login} />
          </Switch>
        </section>
      </Fragment>
    </Router>
  </Provider>
);

export default App;
