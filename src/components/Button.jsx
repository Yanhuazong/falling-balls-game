// Ball.js
import React, { useState, useEffect } from 'react';

const Button = ({ onClick, text }) => {

  return (
    <button
      className={`play-button`}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default Button;
