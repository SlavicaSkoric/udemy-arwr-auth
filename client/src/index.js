import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';

import reducers from './reducers';
import App from './components/App';
import Welcome from './components/Welcome';
import Signup from './components/auth/Signup';
import Feature from './components/Feature';
import Signout from './components/auth/Signout';
import Signin from './components/auth/Signin';

const store = createStore(
  reducers,
  {
    // this is initial state object, we can use it to get some starting state inside of our redux store
    auth: { authenticated: localStorage.getItem('token') },
  },
  applyMiddleware(reduxThunk)
);

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App>
        <Routes>
          <Route path='/' exact element={<Welcome />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/feature' element={<Feature />} />
          <Route path='/signout' element={<Signout />} />
          <Route path='/signin' element={<Signin />} />
        </Routes>
      </App>
    </BrowserRouter>
  </Provider>,
  document.querySelector('#root')
);

// all of our route configuration is in our index.js file which kind of centralizes all of our very core setup logic for our application (so the app component doesn't have to have any navigation stuff inside of it and can stay very simple and very straightforward)
