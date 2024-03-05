import React, { Component, useState, useEffect } from 'react';
import Button from './Button.jsx';
import Workspace from './Workspace.jsx';

import { store } from '../redux/store';
import { loadCategories } from '../redux/categorySlice.js';

import { useSelector, useDispatch } from 'react-redux';

// const dataInput = {
//   toDo: ['pay bills', 'pick up kids from school', 'do laundry'],
//   importantEvents: ['Dad\'s Birthday on Friday', 'Susy\'s Recital tomorrow', 'Dentist Appt. 03/22'],
//   phoneNumbers: ['Nancy\'s Pizza: 516-555-1212', ]
// }

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

const MainContainer = () => {
  // const [getData, setData] = useState({});

  // useEffect(() => {
  //   setData(dataInput);
  // }, []);
  const categories = useSelector((state) => state.categories.categories);

  return (
    <div className='mContainer'>
      <div className='buttonDiv'>
        <Button name='LOGIN' />
        <Button name='NEW NOTE' />
        <Button name='NEW CATEGORY' />
      </div>
      <Workspace input={categories} />
    </div>
  );
};
export default MainContainer;
