import React, { Component } from 'react';
import Note from './Note.jsx';

// array of sticky note colors
const allColors = ['#ff32b2', '#f1f58f', '#74ed4b', '#ffa930', '#a9edf1'];
let currColor = Math.floor(Math.random() * 5);
const getColor = () => {
  const catColor = allColors[currColor];
  currColor++;
  if (currColor === 5) currColor = 0;
  return catColor;
};

const Category = ({ name, notes }) => {
  const newColor = getColor();
  const noteComponents = notes.map((note) => (
    <Note bg={newColor} key={note} content={note} />
  ));

  return (
    <div className='category'>
      {/* <h1>{name}</h1> */}
      {/* <div>{name}</div> */}
      <div>{noteComponents}</div>
    </div>
  );
};
export default Category;
