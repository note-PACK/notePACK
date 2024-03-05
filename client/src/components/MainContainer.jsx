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

  const getNewCat = async () => {
    const newCat = await prompt('Please enter a new note catagory: ');
    console.log(`The new category is: ${newCat}`);
  };

  const getNewNote = async () => {
    const newNote = await prompt('Please enter a new note: ');
    const cat = await prompt('Please enter a category for your note: ');
    console.log(`You entered the following note: ${newNote}`);
    console.log(`Your note was entered in the following category: ${cat}`);
  };

  const login = async () => {
    console.log('You are logged in!');
  }

  return (
    <div className='mContainer'>
      <div className='buttonDiv'>
        <Button name='LOGIN' func={login}/>
        <Button name='NEW NOTE' func={getNewNote} />
        <Button name='NEW CATEGORY' func={getNewCat} />
      </div>
      <Workspace input={categories} />
    </div>
  );
};
export default MainContainer;
