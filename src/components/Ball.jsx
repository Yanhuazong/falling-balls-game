// Ball.js
import React, { useState, useEffect } from 'react';
import '../styles/Ball.css';

const Ball = ({ id, color, shape, position, onClick, onOutOfBounds }) => {
  const [top, setTop] = useState(0);
  useEffect(() => {
    const fallInterval = setInterval(() => {
      // Code to handle the ball falling down the screen
      setTop(prevTop => prevTop + 1);
      if (top > window.innerHeight) {
        onOutOfBounds(id);
      }
    }, 50);

    return () => clearInterval(fallInterval);
  }, [id, onOutOfBounds]);

  return (
    <div
      className={`ball ${color} ${shape}`}
      style={{ left: `${position}%`, top: `${top}%` }}
      onClick={onClick}
    />
  );
};

export default Ball;
