// Ball.js
import React, { useState, useEffect } from 'react';
import '../styles/Ball.css';

const Ball = ({ color, onClick, position }) => {
  const [top, setTop] = useState(0);
  useEffect(() => {
    const fallInterval = setInterval(() => {
      // Code to handle the ball falling down the screen
      setTop(prevTop => prevTop + 1);
    }, 50);

    return () => clearInterval(fallInterval);
  }, []);

  return (
    <div
      className={`ball ${color}`}
      style={{ left: `${position}%`, top: `${top}%` }}
      onClick={onClick}
    />
  );
};

export default Ball;
