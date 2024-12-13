/**
 * Authors:     Tom Giallanza
 * File:        React.jsx
 * Description: Frontend HTML and JS code that holds all React GUI components and handle's 
 *              user events.
 */

import './React.css';
import Board from './Board.js'
import Tile from './Tile.js'

import React, {useState, useRef, useEffect} from 'react';

let userID;
let username;

function HeaderUI({children}) {
  return <div className="Header">{children}</div>;
}

function ButtonUI({className, children}) {
  //const [count, setCount] = useState(0);
  return (
    <div className="ButtonContainer">
      <button className={`Button ${className}`}>{children}</button>
    </div>
  );
}

function BoardUI() {
  const [board, setBoard] = useState(new Board());

  const allTiles = Tile.allTiles;

  function handleKeyPress(event) {
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

    setBoard(new Board(board));
  }
  useEffect(() => {
    // Attach the event listener for keydown
    window.addEventListener('keydown', handleKeyPress);

    // Cleanup function to remove the event listener when component unmounts
    console.log(board.toString());
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [board]);

  const tiles = board.getTiles();
  //const allTilesArray = Array.from(Tile.allTiles.values());

  return (
    <div className="Board">
      {tiles.map((row, rowIndex) => (
        row.map((tile, colIndex) => (
          <TileUI
            key={tile.id || colIndex}
            tile={tile}
            //value={tile.data.value}
            //row={tile.row}
            //col={tile.col}
          />
        ))
      ))}
    </div>
  )
}

function TileUI({tile}) {
  const selfRef = useRef(null);
  const [textSize, setTextSize] = useState(0);
  const [tileSize, setTileSize] = useState(0);
  const [tileOffset, setTileOffset] = useState({ top: 0, left: 0 });

  useEffect(() => {
    const rescaleText = () => {
      let charLength = tile.data.value.toString().length;
      if (selfRef.current && charLength !== 1) {
        setTextSize((selfRef.current.clientWidth + 20) / charLength);
      } else if (selfRef.current && charLength === 1) {
        setTextSize((selfRef.current.clientWidth + 20) / 2);
      }
    };

    rescaleText();

    // Add event listener for window resize
    window.addEventListener('resize', rescaleText);

    return () => {
      // Cleanup the listener when the object is unmounted
      window.removeEventListener('resize', rescaleText);
    };
  }, [tile]);

  useEffect(() => {
    const getTileOffset = () => {
      let realTileSize = selfRef.current.clientWidth;
      if (selfRef.current == null) {
        return { top: 0, left: 0 };
      }
      let offsetTop = 0;
      let offsetLeft = 0;

      if (tile.data.moveDir === 'up') {
        offsetTop -= realTileSize;
      } else if (tile.data.moveDir === 'down') {
        offsetTop += realTileSize;
      } else if (tile.data.moveDir === 'left') {
        offsetLeft -= realTileSize;
      } else if (tile.data.moveDir === 'right') {
        offsetLeft += realTileSize;
      }

      return { top: offsetTop, left: offsetLeft };
    };
    console.log("HI");
    setTileOffset(getTileOffset());
  }, [tile.data.moveDir, tileSize]);

  const tileStyle = {
    top: `${tileOffset.top}px`,
    left: `${tileOffset.left}px`,
    fontSize: `${textSize}px`,
    transition: true ? 'top 0.3s ease, left 0.3s ease' : 'none',
    visibility: tile.data.value === 0 ? 'hidden' : 'visible'
  };

  return <button ref={selfRef} className="Tile" style={tileStyle}>{tile.data.value}</button>;
}

function LeaderboardUI({name, id}) {
  return (
    <div className="Leaderboard" id={id}>
      {name}
      <ScoreUI username="Player" score="9999" />
      <ScoreUI username="Player" score="9999" />
      <ScoreUI username="Player" score="9999" />
      <ScoreUI username="Player" score="9999" />
      <ScoreUI username="Player" score="9999" />
    </div>
  );
}

function ScoreUI({username, score}) {
  return (
  <div className="Score">
    <div className="UsernameLabel">
      {username}
    </div>
    <div className="ScoreLabel">
      {score}
    </div>
  </div>
  );
}

function App() {
  return (
    <div className="App">
      <HeaderUI>Header</HeaderUI>
      <BoardUI />
      <ButtonUI className="Username">Username</ButtonUI>
      <ButtonUI className="Play">Play</ButtonUI>
      <LeaderboardUI name="High Score" id="scoresLB"/>
      <LeaderboardUI name="Fastest 2048" id="timesLB"/>
      <LeaderboardUI name="Live Leaderboard" id="liveLB"/>
    </div>
  );
}

export default App;
/*
await fetchLiveLeaderboard();
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


await fetchStaticLeaderboard();
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

(async () => {
    try {
        await createUser({
          username: 'eddie'
        });
        await updateLiveLeaderboard({
            userID: userID,
            score: 'eddie i like juice',
            startTime: '2024-12-10T10:00:00',
            endTime: '2024-12-10T10:00:00',
            board: [1, 2, 3, 4, 5]
        });
        await fetchLiveLeaderboard();
        await updateLiveLeaderboard({
            userID: userID,
            score: 'eddie i like juice also 2',
            startTime: '2024-12-10T10:00:00',
            endTime: '2024-12-10T10:00:00',
            board: [1, 2, 3, 4, 5]
        });
        await fetchLiveLeaderboard();
        console.log("OWOOOOOWOWOWOOO");
    } catch (error) {
        console.error("Error:", error);
    }
})();
async function updateLiveLeaderboard( { score, endTime, winTime, board }) {
  const payload = {
    userID,
    score, 
    endTime,
    winTime,
    board,
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
  const payload = {
    username
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
    userID =  data; // Return the server's response
  } catch (error) {
      console.error(error);
  }
}
*/