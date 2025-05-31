import React, { useState, useEffect, useCallback, useRef } from 'react';
import { GameState } from '../types.js';
import {
  BIRD_SIZE,
  GRAVITY,
  JUMP_STRENGTH,
  PIPE_WIDTH,
  PIPE_GAP,
  PIPE_SPEED,
  GAME_WIDTH,
  GAME_HEIGHT,
  GROUND_HEIGHT,
  CEILING_HEIGHT,
  PIPE_SPAWN_FRAME_COUNT,
  BIRD_INITIAL_X_POSITION,
  BIRD_INITIAL_Y_POSITION,
  BIRD_FLAP_ROTATION,
  BIRD_MAX_DOWN_ROTATION,
  BIRD_ROTATION_SPEED,
  GROUND_SCROLL_SPEED_MULTIPLIER,
  CITY_SCROLL_SPEED_MULTIPLIER,
  CLOUD_SCROLL_SPEED_MULTIPLIER,
  GROUND_PATTERN_WIDTH,
  CITY_PATTERN_WIDTH,
  CLOUD_PATTERN_WIDTH
} from '../constants.js';
import Bird from './Bird.js';
import PipeComponent from './Pipe.js';
import ScoreDisplay from './ScoreDisplay.js';
import GameMessage from './GameMessage.js';

const FlappyBirdGame = () => {
  const [gameState, setGameState] = useState(GameState.Ready);
  const [bird, setBird] = useState({
    x: BIRD_INITIAL_X_POSITION,
    y: BIRD_INITIAL_Y_POSITION,
    velocity: 0,
    rotation: 0,
  });
  const [pipes, setPipes] = useState([]);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(() => {
    const savedHighScore = localStorage.getItem('unblockedBirdHighScore');
    return savedHighScore ? parseInt(savedHighScore, 10) : 0;
  });
  const [framesSinceLastPipe, setFramesSinceLastPipe] = useState(0);
  const [backgroundScrollX, setBackgroundScrollX] = useState(0);
  
  const gameAreaRef = useRef(null);
  const animationFrameId = useRef(null);

  const resetGame = useCallback(() => {
    setBird({
      x: BIRD_INITIAL_X_POSITION,
      y: BIRD_INITIAL_Y_POSITION,
      velocity: 0,
      rotation: 0,
    });
    setPipes([]);
    setScore(0);
    setFramesSinceLastPipe(0);
    setGameState(GameState.Ready);
    setBackgroundScrollX(0); 
  }, []);

  const flap = useCallback(() => {
    setBird(prevBird => ({
      ...prevBird,
      velocity: JUMP_STRENGTH,
      rotation: BIRD_FLAP_ROTATION,
    }));
  }, []);

  const spawnNewPipe = useCallback(() => {
    const minTopPipeHeight = 60;
    const maxTopPipeHeight = GAME_HEIGHT - GROUND_HEIGHT - PIPE_GAP - minTopPipeHeight - CEILING_HEIGHT;
    
    const topPipeHeight = Math.random() * (maxTopPipeHeight - minTopPipeHeight) + minTopPipeHeight;

    setPipes(prevPipes => [
      ...prevPipes,
      {
        id: Date.now(),
        x: GAME_WIDTH,
        topPipeHeight: topPipeHeight,
        passed: false,
      },
    ]);
  }, []);

  const checkCollisions = useCallback(() => {
    if (bird.y + BIRD_SIZE.height >= GAME_HEIGHT - GROUND_HEIGHT) {
      return true; // Ground collision
    }
    if (bird.y <= CEILING_HEIGHT) { // Ceiling collision
      setBird(b => ({...b, y: CEILING_HEIGHT, velocity: Math.max(0, b.velocity)})); 
    }

    const birdRect = {
      x: bird.x + BIRD_SIZE.width * 0.1,
      y: bird.y + BIRD_SIZE.height * 0.1,
      width: BIRD_SIZE.width * 0.8, 
      height: BIRD_SIZE.height * 0.8,
    };

    for (const pipe of pipes) {
      const topPipeRect = {
        x: pipe.x,
        y: CEILING_HEIGHT,
        width: PIPE_WIDTH,
        height: pipe.topPipeHeight - CEILING_HEIGHT,
      };
      const bottomPipeRect = {
        x: pipe.x,
        y: pipe.topPipeHeight + PIPE_GAP,
        width: PIPE_WIDTH,
        height: GAME_HEIGHT - (pipe.topPipeHeight + PIPE_GAP) - GROUND_HEIGHT,
      };

      const collidesWithTop =
        birdRect.x < topPipeRect.x + topPipeRect.width &&
        birdRect.x + birdRect.width > topPipeRect.x &&
        birdRect.y < topPipeRect.y + topPipeRect.height &&
        birdRect.y + birdRect.height > topPipeRect.y;

      const collidesWithBottom =
        birdRect.x < bottomPipeRect.x + bottomPipeRect.width &&
        birdRect.x + birdRect.width > bottomPipeRect.x &&
        birdRect.y < bottomPipeRect.y + bottomPipeRect.height &&
        birdRect.y + birdRect.height > bottomPipeRect.y;

      if (collidesWithTop || collidesWithBottom) {
        return true;
      }
    }
    return false;
  }, [bird, pipes]);

  useEffect(() => {
    const handleInput = (event) => {
      if (event instanceof KeyboardEvent && event.key !== ' ' && event.code !== 'Space') {
        return;
      }
      if (event instanceof KeyboardEvent && (event.key === ' ' || event.code === 'Space')) {
        event.preventDefault();
      }

      if (gameState === GameState.Ready) {
        setGameState(GameState.Playing);
        flap(); 
      } else if (gameState === GameState.Playing) {
        flap();
      } else if (gameState === GameState.GameOver) {
        resetGame();
      }
    };

    window.addEventListener('keydown', handleInput);
    window.addEventListener('mousedown', handleInput);
    window.addEventListener('touchstart', handleInput, { passive: false });

    return () => {
      window.removeEventListener('keydown', handleInput);
      window.removeEventListener('mousedown', handleInput);
      window.removeEventListener('touchstart', handleInput);
    };
  }, [gameState, flap, resetGame]);
  
  useEffect(() => {
    if (gameState !== GameState.Playing) {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
        animationFrameId.current = null;
      }
      return;
    }

    let scoreIncreasedThisFrameLoop = false;

    const gameLoop = () => {
      setBird(prevBird => {
        const newVelocity = prevBird.velocity + GRAVITY;
        let newY = prevBird.y + newVelocity;
        
        newY = Math.min(newY, GAME_HEIGHT - BIRD_SIZE.height - GROUND_HEIGHT);
        newY = Math.max(newY, CEILING_HEIGHT);
        
        let newRotation = prevBird.rotation;
        if (newVelocity > 0.5) { 
            newRotation = Math.min(prevBird.rotation + BIRD_ROTATION_SPEED, BIRD_MAX_DOWN_ROTATION);
        } else if (newVelocity < 0) {
            newRotation = BIRD_FLAP_ROTATION;
        }
        return { ...prevBird, y: newY, velocity: newVelocity, rotation: newRotation };
      });

      setPipes(prevPipes =>
        prevPipes
          .map(pipe => ({ ...pipe, x: pipe.x - PIPE_SPEED }))
          .filter(pipe => pipe.x > -PIPE_WIDTH)
      );
      
      setBackgroundScrollX(prev => prev + PIPE_SPEED);

      setFramesSinceLastPipe(prevFrames => {
        if (prevFrames >= PIPE_SPAWN_FRAME_COUNT) {
          spawnNewPipe();
          return 0;
        }
        return prevFrames + 1;
      });
      
      setScore(prevScore => {
        let newScore = prevScore;
        scoreIncreasedThisFrameLoop = false; 
        setPipes(prevPipes => prevPipes.map(pipe => {
          if (!pipe.passed && pipe.x + PIPE_WIDTH < bird.x) { 
            if (!scoreIncreasedThisFrameLoop) { 
              newScore += 1;
              scoreIncreasedThisFrameLoop = true;
            }
            return { ...pipe, passed: true };
          }
          return pipe;
        }));
        return newScore;
      });


      if (checkCollisions()) {
        setGameState(GameState.GameOver);
        setHighScore(prevHighScore => {
          const currentScore = score + (scoreIncreasedThisFrameLoop ? 1: 0);
          if (currentScore > prevHighScore) {
            localStorage.setItem('unblockedBirdHighScore', currentScore.toString());
            return currentScore;
          }
          return prevHighScore;
        });
      }
      animationFrameId.current = requestAnimationFrame(gameLoop);
    };

    animationFrameId.current = requestAnimationFrame(gameLoop);

    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [gameState, bird.x, checkCollisions, flap, spawnNewPipe, score, highScore]);

  const groundScrollStyle = {
    backgroundPositionX: `-${(backgroundScrollX * GROUND_SCROLL_SPEED_MULTIPLIER) % GROUND_PATTERN_WIDTH}px`,
    backgroundImage: `repeating-linear-gradient(
      -45deg,
      #48BB78,
      #48BB78 10px,
      #38A169 10px,
      #38A169 20px
    )`,
    backgroundSize: `${GROUND_PATTERN_WIDTH}px ${GROUND_PATTERN_WIDTH}px`
  };

  const cityScrollStyle = {
    backgroundPositionX: `-${(backgroundScrollX * CITY_SCROLL_SPEED_MULTIPLIER) % CITY_PATTERN_WIDTH}px`,
    backgroundImage: `repeating-linear-gradient(
        90deg,
        transparent 0px, transparent 20px,
        #CBD5E0 20px, #CBD5E0 60px,
        transparent 60px, transparent 90px,
        #A0AEC0 90px, #A0AEC0 120px,
        transparent 120px, transparent 150px,
        #CBD5E0 150px, #CBD5E0 180px
      )`,
    backgroundSize: `${CITY_PATTERN_WIDTH}px 100px`, 
    backgroundRepeat: 'repeat-x',
    opacity: 0.6, 
  };
  
  const cloudScrollStyle = {
    backgroundPositionX: `-${(backgroundScrollX * CLOUD_SCROLL_SPEED_MULTIPLIER) % CLOUD_PATTERN_WIDTH}px`,
    backgroundImage: 'linear-gradient(to bottom, rgba(255,255,255,0.7), rgba(229, 231, 235, 0.5))', 
    backgroundSize: `${CLOUD_PATTERN_WIDTH}px 80px`, 
    backgroundRepeat: 'repeat-x',
    opacity: 0.8,
  };

  return (
    React.createElement("div", { className: "flex flex-col items-center justify-center w-full" },
      React.createElement("div", { 
        ref: gameAreaRef,
        className: "bg-sky-400 relative overflow-hidden rounded-lg border-4 border-sky-600 select-none game-area-shadow",
        style: { width: GAME_WIDTH, height: GAME_HEIGHT },
        tabIndex: 0,
        "aria-label": "Unblocked Bird - Fun Unblocked Game Area"
      },
        React.createElement("div", { 
          className: "absolute top-10 left-0 w-full h-20 z-0 cloud-layer",
          style: cloudScrollStyle,
          "aria-hidden": "true"
        }),
        React.createElement("div", { 
          className: "absolute bottom-0 left-0 w-full h-[100px] z-0 cityscape-layer",
          style: {...cityScrollStyle, bottom: GROUND_HEIGHT},
          "aria-hidden": "true"
        }),
        React.createElement(Bird, { bird: bird }),
        pipes.map(pipe => (
          React.createElement(PipeComponent, {
            key: pipe.id,
            pipeData: pipe,
            gameHeight: GAME_HEIGHT,
            pipeWidth: PIPE_WIDTH,
            pipeGap: PIPE_GAP,
            groundHeight: GROUND_HEIGHT,
            ceilingHeight: CEILING_HEIGHT
          })
        )),
        React.createElement("div", { 
          className: "absolute bottom-0 left-0 w-full bg-green-400 border-t-4 border-green-600 z-10",
          style: { height: GROUND_HEIGHT },
          "aria-hidden": "true"
        },
           React.createElement("div", { 
             className: "absolute top-0 left-0 w-full h-2/3",
             style: groundScrollStyle
           }),
           React.createElement("div", { 
             className: "absolute bottom-0 left-0 w-full h-1/3",
             style: {background: '#A0522D', opacity: 0.9}
           })
        ),
        React.createElement(ScoreDisplay, { score: score, highScore: highScore, gameState: gameState }),
        React.createElement(GameMessage, { gameState: gameState, score: score, highScore: highScore })
      ),
      React.createElement("p", { className: "text-gray-300 mt-4 text-sm" }, "Tap screen or Press Spacebar to Flap. Enjoy one of the best unblocked games!")
    )
  );
};

export default FlappyBirdGame;