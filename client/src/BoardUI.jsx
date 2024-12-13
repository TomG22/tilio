import React, { useState, useEffect } from 'react';
import Board from './Board';
import TileUI from './TileUI';

function BoardUI() {
  const [board, setBoard] = useState(new Board());
  const [score, setScore] = useState(0);

  const checkForAttack = async () => {
    try {
      const response = await fetch('http://localhost:3000/checkAttack', { 
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });
      if (!response.ok) throw new Error('Error checking attack');
      const data = await response.json();
      if (data.isAttacked) {
        board.freezeTile(data.targetTile); // Handle freezing
        setBoard(new Board(board)); // Trigger re-render with updated board state
      }
    } catch (error) {
      console.error('Error checking for attack:', error);
    }
  };

  function handleMove(event) {
    switch (event.key) {
      case 'ArrowUp':
        if (typeof board.up === 'function') board.up();
        break;
      case 'ArrowDown':
        if (typeof board.down === 'function') board.down();
        break;
      case 'ArrowLeft':
        if (typeof board.left === 'function') board.left();
        break;
      case 'ArrowRight':
        if (typeof board.right === 'function') board.right();
        break;
      case " ":
        console.log("Freezing tile");
        board.freezeTile();
        break;
      default:
        return;
    }
    setBoard(new Board(board)); // Update state with new board instance
    setScore(board.getScore()); // Update score
    checkAttackTrigger(); // Check if a new attack should be triggered
  }

  const checkAttackTrigger = () => {
    if (score >= 2000 && (Math.log2(score / 2000) % 1 === 0)) {
      sendAttack();
    }
  };

  const sendAttack = async () => {
    try {
      const response = await fetch('http://localhost:3000/attack', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ score }),
      });
      if (!response.ok) throw new Error('Error sending attack');
      console.log('Attack sent!');
    } catch (error) {
      console.error('Error sending attack:', error);
    }
  };

  // Effect for key press event handling
  useEffect(() => {
    // Attach the event listener for keydown
    window.addEventListener('keydown', handleMove);

    // Cleanup function to remove the event listener
    return () => {
      window.removeEventListener('keydown', handleMove);
    };
  }, [board]);

  const tiles = board.getTiles(); // Get tiles from the board instance
  return (
    <div className="Board">
      {tiles.map((row, rowIndex) => (
        row.map((tile, colIndex) => (
          <TileUI
            key={tile.id || colIndex}
            tile={tile}
          />
        ))
      ))}
    </div>
  );
}

export default BoardUI;