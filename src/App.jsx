// App.js
import React, { useState, useEffect } from 'react';
import Ball from './components/Ball.jsx';
import Button from './components/Button.jsx';
import './App.css';

const App = () => {
  const [balls, setBalls] = useState([]);
  const [score, setScore] = useState(0);
  const [buttonText, setButtonText] = useState("Stop");

  const addBall = () => {
    const color = Math.random() > 0.5 ? 'blue' : 'red';
    const position = Math.random() * 90; // Random horizontal position
    setBalls((prevBalls) => [
      ...prevBalls,
      { color, position, id: Math.random() },
    ]);
  };

  const handleBallClick = (id,color) => {
    if (color === 'blue') {
      setScore((prevScore) => prevScore + 10);  
      setBalls((prevBalls) => prevBalls.filter(ball => ball.id !== id));    
    } else {
      setScore((prevScore) => prevScore - 5);
    }
  };
  const handleButtonClick = () => {
      setScore(0);  
      setBalls([]);  
      buttonText === "Play" ? setButtonText("Stop"): setButtonText("Play");  
  };

  useEffect(() => {
    if(buttonText === "Stop") {
      const interval = setInterval(addBall, 1000); // Add a new ball every second if the button text is "Stop"
      return () => clearInterval(interval);
    }

  }, [buttonText]);

  return (
    <div className="App">

      <h1>Score: {score}</h1>
      <Button onClick={handleButtonClick} text={buttonText}/>
      <div className="game-area">
        {balls.map((ball) => (
          <Ball
            key={ball.id}
            color={ball.color}
            position={ball.position}
            onClick={() => handleBallClick(ball.id, ball.color)}
          />
        ))}
      </div>
    </div>
  );
};

export default App;
