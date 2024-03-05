import React, { Component } from 'react';

const Button = ({ name, func }) => {
  return <div>
    <button onClick={func}>{name}</button>
  </div>;
};
export default Button;
