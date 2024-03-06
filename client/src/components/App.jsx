import React, { Component, useEffect } from 'react';
import MainContainer from './MainContainer.jsx';
import { getCategories } from '../utils/requests.js';

const App = () => {
  useEffect(() => {
    getCategories();
  }, []);
  return (
    <div className='app'>
      <MainContainer />
    </div>
  );
};
export default App;
