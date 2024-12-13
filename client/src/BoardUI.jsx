import React, { useState, useEffect } from 'react';
import Board from './Board';
import TileUI from './TileUI';

let username;

function BoardUI() {
  const [board, setBoard] = useState(new Board());
  const [score, setScore] = useState(0);

  const checkForAttack = async () => {
    try {
      const response = await fetch('http://localhost:3000/checkAttack', { 
        // TODO: Replace with server URL
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });
      const data = await response.json();
      console.log('data: ' + data);
      if (!response.ok) throw new Error('Error checking attack');
      if (data.isAttacked) {
        board.freezeTile(data.targetTile); // Handle freezing
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
    console.log(board.getScore());
    checkAttackTrigger(); // Check if a new attack should be triggered
<<<<<<< HEAD
    (async () => {
        username = "eddie";
        try {
            await createUser({
              username: username
            });
            await updateLiveLeaderboard({
                score: 'eddie i like juice 2jisjfoijdsijoigsdoadf',
                board: board.getTilesData(),
                startTime: Date.now(),
                lastMove: Date.now(),
                endTime: '',
                winTime: Date.now()
            });
            await fetchLiveLeaderboard();
            await fetchLiveLeaderboard();
            console.log("OWOOOOOWOWOWOOO");
        } catch (error) {
            console.error("Error:", error);
        }
    })();
    checkForAttack();
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

async function fetchLiveLeaderboard () {
    await fetch('http://localhost:3000/leaderboard/live')
    .then(response => response.json())
    .then(data => {
      console.log(data);
      return data;
    })
      
    .catch(error => {
      console.log("meow");
      console.error(error)}
    );
}


(async () => { await fetchStaticLeaderboard(); })();
async function fetchStaticLeaderboard() {
    await fetch('http://localhost:3000/leaderboard/static')
    .then(response => response.json())
    .then(data => {
      console.log(data);
      return data;
    })
}

async function fetchUpdatedBoard () {
  const payload = {
    username
  };

  try {
    const response = await fetch('http://localhost:3000/getBoardUpdate', {
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

async function fetchWinners() {
    await fetch('http://localhost:3000/leaderboard/winners')
    .then(response => response.json())
    .then(data => {
      console.log(data);
      return data;
    })
}

(async () => {
    username = "eddie";
    try {
        await createUser({
          username: username
        });
        await updateLiveLeaderboard({
            score: 'eddie i like juice',
            board: board.tiles,
            startTime: Date.now(),
            lastMove: Date.now(),
            endTime: '',
            winTime: Date.now()
        });
        await fetchLiveLeaderboard();
        await fetchLiveLeaderboard();
        console.log("OWOOOOOWOWOWOOO");
    } catch (error) {
        console.error("Error:", error);
    }
})();
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
    const response = await fetch('http://localhost:3000/leaderboard/live/update', {
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
async function createUser({username}) {
  let startTime = Date.now();

  const payload = {
    username,
    startTime
  };

  try {
    const response = await fetch('http://localhost:3000/createuser', {
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
    console.log('User created successfully:', data);
  } catch (error) {
      console.error(error);
  }
}
}


export default BoardUI;
