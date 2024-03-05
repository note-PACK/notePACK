import React, { Component, useEffect } from 'react';
import MainContainer from './MainContainer.jsx';
import { store } from '../redux/store.js';
import { loadCategories } from '../redux/categorySlice.js';

const dataInput = {
  'To Do': ['pay bills', 'pick up kids from school', 'do laundry'],
  'Important Dates': [
    "Dad's Birthday on Friday",
    "Susy's Recital tomorrow",
    'Dentist Appt. 03/22',
  ],
  'Phone Numbers': [
    "Nancy's Pizza: 516-555-1212",
    "Honest Don's Car Repair: 718-555-1212",
  ],
};

const getCategories = async () => {
  store.dispatch(loadCategories(dataInput));
};

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
