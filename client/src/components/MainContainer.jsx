import React, { Component } from 'react';
import Button from './Button.jsx';
import Workspace from './Workspace.jsx'

const MainContainer = () => {
  return (
    <div className = 'mContainer'>
        <h1>Inside Container</h1>
      <Button />
      <Button />
      <Button />
      <Workspace />
    </div>
  );
};
export default MainContainer;
