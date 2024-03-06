import React, { Component, useState, useEffect } from 'react';
import Button from './Button.jsx';
import Workspace from './Workspace.jsx';

import { store } from '../redux/store';
import { loadCategories } from '../redux/userDataSlice.js';

import { useSelector, useDispatch } from 'react-redux';

import { getCategories } from '../utils/requests.js';
//import { loadCategories } from '../redux/userDataSlice.js';
//let dataInp;

const MainContainer = () => {
  let dataInp;
  //const dispatch = useDispatch();

  // const [getData, setData] = useState({});

  // useEffect(() => {
  //   setData(dataInput);
  // }, []);

  //const categories = useSelector((state) => state.categories.categories);
  // const categories = getData;
  //console.log('Categories: ', categories);

  const newUser = async () => {
    const user = await prompt('Please enter a new username: ');
    const pass = await prompt('Please enter a password: ');
  };

  const getNewCat = async () => {
    const newCat = await prompt('Please enter a new note catagory: ');
    // console.log(`The new category is: ${newCat}`);
  };

  const getNewNote = async () => {
    const newNote = await prompt('Please enter a new note: ');
    const cat = await prompt('Please enter a category for your note: ');
    // console.log(`You entered the following note: ${newNote}`);
    // console.log(`Your note was entered in the following category: ${cat}`);
  };

  const login = async () => {
    const user = await prompt('Please enter a username: ');
    const pass = await prompt('Please enter your password: ');

    const body = {};
    body.username = user;
    body.password = pass;

    const serverURL = 'http://localhost:3000/users/login';
    const result = await fetch(serverURL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    const userCreds = await result.json();
    //console.log('UserCreds: ', userCreds);

    const id = userCreds.id;
    const noteURL = 'http://localhost:3000/notes/user/' + id;

    const userNotes = await fetch(noteURL);
    //console.log('userNotes', userNotes);
    dataInp = await userNotes.json();

    // const dataInp = await result.json();
    // const dataInp = {
    //   'To Do': ['pay bills', 'pick up kids from school', 'do laundry'],
    //   'Important Dates': [
    //     "Dad's Birthday on Friday",
    //     "Suzy's Recital tomorrow",
    //     'Dentist Appt. 03/22',
    //   ],
    //   'Phone Numbers': [
    //     "Nancy's Pizza: 516-555-1212",
    //     "Honest Don's Car Repair: 718-555-1212",
    //   ],
    //   Credentials: [
    //     'Facebook login: scatman pass: SkiBaB0pBaD0pB0p',
    //     'Yahoo login: scatmaN pass: redux5x23',
    //   ],
    // };

    //console.log('dataInp: ', dataInp);

    // dispatch(dataInp);
    // await getCategories(dataInp);
    getCategories(dataInp);
  };

  // useEffect(() => {
  //   getCategories(dataInp);
  // }, []);

  return (
    <div className="mContainer">
      <div className="buttonDiv">
        <Button name="NEW USER" func={newUser} />
        <Button name="LOGIN" func={login} />
        <Button name="NEW NOTE" func={getNewNote} />
        <Button name="NEW CATEGORY" func={getNewCat} />
      </div>
      <Workspace />
    </div>
  );
};
export default MainContainer;
