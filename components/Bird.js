import React from 'react';
import { BIRD_SIZE } from '../constants.js';

const Bird = ({ bird }) => {
  return (
    React.createElement("div", {
      className: "absolute z-10 text-4xl",
      style: {
        left: bird.x,
        top: bird.y,
        width: BIRD_SIZE.width,
        height: BIRD_SIZE.height,
        transform: `rotate(${bird.rotation}deg) scaleX(-1)`,
        transition: 'transform 0.1s linear',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      },
      "aria-label": "Bird",
      role: "img"
    }, "🐦")
  );
};

export default Bird;
