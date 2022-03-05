import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import App from './components/App';
import Welcome from './components/Welcome';
import Signup from './components/auth/Signup';

ReactDOM.render(
  <BrowserRouter>
    <App>
      <Routes>
        <Route path='/' exact element={<Welcome />} />
        <Route path='/signup' element={<Signup />} />
      </Routes>
    </App>
  </BrowserRouter>,
  document.querySelector('#root')
);

// all of our route configuration is in our index.js file which kind of centralizes all of our very core setup logic for our application (so the app component doesn't have to have any navigation stuff inside of it and can stay very simple and very straightforward)
