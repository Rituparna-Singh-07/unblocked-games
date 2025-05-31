import React from 'react';
import ReactDOM from 'react-dom/client';
import FlappyBirdGame from './components/FlappyBirdGame.js';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  React.createElement(React.StrictMode, null,
    React.createElement(FlappyBirdGame, null)
  )
);
