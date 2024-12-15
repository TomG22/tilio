import React, { useState, useEffect } from 'react';
import Board from './Board';
import TileUI from './TileUI';

//let username;
const startTime = Date.now();
const db_port = 27017;
const port = 3000;
const hostname = `localhost`;
let highestScore = 2000;

function BoardUI({ username, mode }) {
  const [board, setBoard] = useState(new Board());
  const [score, setScore] = useState(0);

  const checkForAttack = async () => {
    console.log("user" + username);
    try {
      const payload = {
        username,
      };
      const response = await fetch(`http://${hostname}:${port}/checkAttack`, {
 
        // TODO: Replace with server URL
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const resObject = await response.json();
      console.log(resObject);
      console.log('data: ' + resObject.isAttacked);
      if (!response.ok) throw new Error('Error checking attack');
      if (resObject.isAttacked) {
        board.freezeTile(); // Handle freezing0
        // setBoard(new Board(board)); // Trigger re-render with updated board state
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
    console.log("score", board.getScore());
    if (board.won) {
      console.log("winna");
      alert("you win");
      return;
    } 
    if (board.gameLost()){
      console.log("LOSER");
      alert("lol loser");
      return;
    }
    // let scoreString = board.getScore().toString();
    // const tilesArr = board.getTiles();
    updateLiveLeaderboard({
      score: board.getScore(),
      board: board.getTiles(),
      startTime: startTime,    // Make sure `startTime` is defined
      lastMove: Date.now(),
      endTime: '',             // Empty string for endTime
      winTime: ''              // Empty string for winTime
    });
    checkAttackTrigger({ score: board.getScore() }); // Check if a new attack should be triggered
    checkForAttack();
    if (mode === "Multiplayer") {
      console.log("ATTACKING");
      checkAttackTrigger({score}); // Check if a new attack should be triggered
      checkForAttack();
    }
  }

  function checkAttackTrigger({score}) {
    if(score > highestScore) {
      sendAttack();
      highestScore *= 2;
    }
  };

  const sendAttack = async () => {
    console.log("Sending attack.");
    try {
      const response = await fetch(`http://${hostname}:${port}/attack`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username }),
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
      <div className="BoardScoreLabel">Score: {score}</div> 
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


  async function fetchUpdatedBoard () {
    const payload = {
      username
    };

    try {
      const response = await fetch(`http://${hostname}:${port}/getBoardUpdate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
      if (!response.ok) {
        // Log and throw an error if the response is not OK
        const errorText = await response.text(); // Read the error response as plain text
        throw new Error(`Server error: ${response.status} - ${errorText}`);
      }
    
      const data = await response.json(); // Parse the response
      console.log('Leaderboard updated successfully:', data);
      return data; // Return the server's response
    } catch (error) {
        console.error(error);
    }
  }

  async function updateLiveLeaderboard( { 
  score, board, startTime, lastMove, endTime, winTime }) {
    const payload = {
      username,
      score,
      board,
      startTime,
      lastMove,
      endTime,
      winTime
    };

    try {
      const response = await fetch(`http://${hostname}:${port}/leaderboard/live/update`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
      if (!response.ok) {
        // Log and throw an error if the response is not OK
        const errorText = await response.text(); // Read the error response as plain text
        throw new Error(`Server error: ${response.status} - ${errorText}`);
      }
    
      const data = await response.json(); // Parse the response
      console.log('Leaderboard updated successfully:', data);
      return data; // Return the server's response
    } catch (error) {
        console.error(error);
    }
  }
  function setMostSig({num}) {
      if (num === 0) return 0;

      const isNegative = num < 0;
      num = Math.abs(num);

      const magnitude = Math.floor(Math.log10(num)); // Find the magnitude of the number
      const mostSignificantDigit = Math.floor(num / Math.pow(10, magnitude)); // Extract the most significant digit
      const result = mostSignificantDigit * Math.pow(10, magnitude); // Reconstruct the number with only the most significant digit

      return result; // Restore the sign if the number was negative
  }
}

export default BoardUI;
