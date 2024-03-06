import React, { Component } from 'react';
import Category from './Category.jsx';
import { useSelector } from 'react-redux';

const Workspace = () => {
  const input = useSelector((state) => state.userdataslice.categories);
  const categories = [];
  for (const category of Object.keys(input)) {
    categories.push(
      //Not for later: change what key is
      <Category key={category} name={category} notes={input[category]} />
    );
  }
  return <div className='workspace'>{categories}</div>;
};
export default Workspace;
