import React, { Component } from 'react';
import Category from './Category.jsx';

const Workspace = ({input}) => {

  const categories = [];
  for (const category in input) {
    categories.push(
      //Not for later: change what key is
      <Category key={category} name={category} notes={input[category]} />
    );
  }
  return <div className = 'workspace'>{categories}</div>;
};
export default Workspace;
