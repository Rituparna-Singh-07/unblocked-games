import React from 'react';
import { GameState } from '../types.js';

const GameMessage = ({ gameState, score, highScore }) => {
  const commonTextClass = "font-bold font-mono";
  const commonContainerClass = "absolute inset-0 flex flex-col items-center justify-center z-20 text-white text-center p-4";
  const textOutlineStyle = { textShadow: '2px 2px 0 #000, -2px -2px 0 #000, 2px -2px 0 #000, -2px 2px 0 #000, 3px 3px 0 #000' };

  if (gameState === GameState.Ready) {
    return (
      React.createElement("div", { className: commonContainerClass, style: textOutlineStyle },
        React.createElement("h1", { className: `${commonTextClass} text-6xl mb-2` }, "Unblocked Bird"),
        React.createElement("p", { className: `${commonTextClass} text-xl mb-4 text-sky-300`}, "Your Favorite Unblocked Game!"),
        React.createElement("p", { className: `${commonTextClass} text-3xl animate-pulse` }, "Tap or Space to Start")
      )
    );
  }

  if (gameState === GameState.GameOver) {
    return (
      React.createElement("div", { className: `${commonContainerClass} bg-black bg-opacity-50 rounded-lg`, style: textOutlineStyle },
        React.createElement("h2", { className: `${commonTextClass} text-5xl mb-4` }, "Game Over!"),
        React.createElement("p", { className: `${commonTextClass} text-3xl mb-2` }, "Score: ", score),
        React.createElement("p", { className: `${commonTextClass} text-3xl mb-6` }, "High Score: ", highScore),
        React.createElement("p", { className: `${commonTextClass} text-2xl animate-pulse` }, "Tap or Space to Play Again")
      )
    );
  }

  return null;
};

export default GameMessage;