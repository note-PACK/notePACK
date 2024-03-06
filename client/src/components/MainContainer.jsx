import React, { Component, useState, useEffect } from 'react';
import Button from './Button.jsx';
import Workspace from './Workspace.jsx';

import { store } from '../redux/store';
import { loadCategories } from '../redux/userDataSlice.js';

import { useSelector, useDispatch } from 'react-redux';



const MainContainer = () => {
  // const [getData, setData] = useState({});

  // useEffect(() => {
  //   setData(dataInput);
  // }, []);

  //const categories = useSelector((state) => state.categories.categories);
  // const categories = getData;
  //console.log('Categories: ', categories);

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
  };

  return (
    <div className='mContainer'>
      <div className='buttonDiv'>
        <Button name='LOGIN' func={login} />
        <Button name='NEW NOTE' func={getNewNote} />
        <Button name='NEW CATEGORY' func={getNewCat} />
      </div>
      <Workspace />
    </div>
  );
};
export default MainContainer;
