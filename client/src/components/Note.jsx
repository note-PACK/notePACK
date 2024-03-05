import React, { Component } from 'react';

const Note = ({ content, bg }) => {
  return (
    <div className='note' style={{ backgroundColor: bg }}>
      {content}
    </div>
  );
};
export default Note;
