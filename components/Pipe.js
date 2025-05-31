import React from 'react';

const PipeComponent = ({ pipeData, gameHeight, pipeWidth, pipeGap, groundHeight, ceilingHeight }) => {
  const topPipeActualHeight = pipeData.topPipeHeight - ceilingHeight;
  const bottomPipeY = pipeData.topPipeHeight + pipeGap;
  const bottomPipeActualHeight = gameHeight - bottomPipeY - groundHeight;

  return (
    React.createElement(React.Fragment, null,
      React.createElement("div", {
        className: "absolute bg-green-500 border-2 border-green-700 rounded-sm z-0",
        style: {
          left: pipeData.x,
          top: ceilingHeight,
          width: pipeWidth,
          height: topPipeActualHeight,
        }
      }, React.createElement("div", { className: "absolute bottom-0 left-0 w-full h-6 bg-green-600 border-t-2 border-green-800 rounded-b-sm" })),
      React.createElement("div", {
        className: "absolute bg-green-500 border-2 border-green-700 rounded-sm z-0",
        style: {
          left: pipeData.x,
          top: bottomPipeY,
          width: pipeWidth,
          height: bottomPipeActualHeight,
        }
      }, React.createElement("div", { className: "absolute top-0 left-0 w-full h-6 bg-green-600 border-b-2 border-green-800 rounded-t-sm" }))
    )
  );
};

export default PipeComponent;
