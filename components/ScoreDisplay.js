import React from 'react';
import { GameState } from '../types.js';

const ScoreDisplay = ({ score, highScore, gameState }) => {
  const textOutlineStyle = { textShadow: '2px 2px 0 #000, -2px -2px 0 #000, 2px -2px 0 #000, -2px 2px 0 #000, 3px 3px 0 #000' };

  if (gameState === GameState.Ready) {
     return (
      React.createElement("div", { className: "absolute top-8 left-1/2 -translate-x-1/2 z-20 text-white text-center" },
        highScore > 0 && (
            React.createElement("p", {
                className: "text-2xl font-bold font-mono",
                style: textOutlineStyle
            }, "High Score: ", highScore)
        )
      )
    );
  }
  
  if (gameState === GameState.Playing) {
    return (
      React.createElement("div", {
           className: "absolute top-8 left-1/2 -translate-x-1/2 z-20 text-white text-6xl font-bold font-mono",
           style: textOutlineStyle
        },
        score
      )
    );
  }

  return null; 
};

export default ScoreDisplay;
