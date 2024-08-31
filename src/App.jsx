// App.js
import React, { useState, useEffect } from "react";
import Ball from "./components/Ball.jsx";
import Button from "./components/Button.jsx";
import "./App.css";

const App = () => {
  const [balls, setBalls] = useState([]);
  const [score, setScore] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [shape, setShape] = useState("circle"); // New state to handle ball shape

  const addBall = () => {
    const color = Math.random() > 0.5 ? "blue" : "red";
    const position = Math.random() * 90; // Random horizontal position
    setBalls((prevBalls) => [
      ...prevBalls,
      { color, position, id: Math.random() },
    ]);
  };

  const handleBallClick = (id, color) => {
    if (color === "blue") {
      setScore((prevScore) => prevScore + 10);
      setBalls((prevBalls) => prevBalls.filter((ball) => ball.id !== id));
    } else {
      setScore((prevScore) => prevScore - 5);
    }
  };
  const handleOutOfBounds = (id) => {
    setBalls((prevBalls) => prevBalls.filter((ball) => ball.id !== id));
  };
  const toggleGame = () => {
    if (isRunning) {
      setIsRunning(false);
    } else {
      setBalls([]);
      setScore(0);
      setGameOver(false);
      setIsRunning(true);

      // Stop the game after 2 minutes
      setTimeout(() => {
        setIsRunning(false);
        setGameOver(true);
      }, 60 * 1000); // 2 minutes
    }
  };

  const handleShapeChange = (event) => {
    setShape(event.target.value);
  };
  useEffect(() => {
    if (isRunning) {
      const interval = setInterval(addBall, 1000); // Add a new ball every second if the button text is "Stop"
      return () => clearInterval(interval);
    }
  }, [isRunning]);

  return (
    <div className="App">
      <div className="control-panel">
        {isRunning || gameOver ? <h1>Score: {score}</h1> : ""}

        {gameOver && <h2>Game Over!</h2>}
        <button onClick={toggleGame}>
          {isRunning ? "Stop Game" : "Start Game"}
        </button>
        {isRunning && !gameOver ? (
          <div className="selector">
            <label>Choose Shape </label>
            <select value={shape} onChange={handleShapeChange}>
              <option value="circle">Circle</option>
              <option value="square">Square</option>
            </select>
          </div>
        ) : (
          ""
        )}
      </div>

      <div className="game-area">
        {isRunning &&
          balls.map((ball) => (
            <Ball
              key={ball.id}
              id={ball.id}
              color={ball.color}
              shape={shape}
              position={ball.position}
              onClick={() => handleBallClick(ball.id, ball.color)}
              onOutOfBounds={handleOutOfBounds}
            />
          ))}
      </div>
    </div>
  );
};

export default App;
