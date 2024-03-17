import React, { Component } from 'react';
import Button from './Button.jsx';
import Workspace from './Workspace.jsx'

const MainContainer = () => {
  return (
    <div className = 'mContainer'>
        <h4>Inside Container</h4>
      <Button />
      <Button />
      <Button />
      <Workspace />
    </div>
  );
};
export default MainContainer;
