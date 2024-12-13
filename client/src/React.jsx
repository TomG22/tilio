/**
 * Authors:     Tom Giallanza
 * File:        React.jsx
 * Description: Frontend HTML and JS code that holds all React GUI components and handle's 
 *              user events.
 */

import './React.css';
import Board from './Board.js'
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

  // Handler for when the board changes
  useEffect(() => {

  }, [board]);

  const tiles = board.getTiles(); // Get tiles from the Board instance
  console.log(board.toString());
  return (
    <div className="Board">
      <TileUI value="2" data-row="0" data-col="1"/>
      <TileUI value="2" data-row="0" data-col="2"/>
      <TileUI value="10" data-row="0" data-col="3"/>
      <TileUI value="100" data-row="0" data-col="4"/>
      <TileUI value="2000" data-row="1" data-col="1"/>
      <TileUI value="10000" data-row="1" data-col="2"/>
      <TileUI value="100000" data-row="1" data-col="3"/>
      <TileUI value="1000000" data-row="1" data-col="4"/>
      <TileUI value="10000000" data-row="2" data-col="1"/>
      <TileUI value="100000000" data-row="2" data-col="2"/>
      <TileUI value="2" data-row="2" data-col="3"/>
      <TileUI value="2" data-row="2" data-col="4"/>
      <TileUI value="2" data-row="3" data-col="1"/>
      <TileUI value="2" data-row="3" data-col="2"/>
      <TileUI value="2" data-row="3" data-col="3"/>
      <TileUI value="2" data-row="3" data-col="4"/>
    </div>
  )
}

function TileUI({ value }) {
  const selfRef = useRef(null);
  const [textSize, setTextSize] = useState(0);

  useEffect(() => {
    const rescaleText = () => {
      if (selfRef.current && value.length !== 1) {
        // Rescaling the text so larger values appear smaller
        setTextSize(`${(selfRef.current.clientWidth + 20) / selfRef.current.textContent.length}px`);
      } else if (selfRef.current && value.length === 1) {
        setTextSize(`${(selfRef.current.clientWidth + 20) / 2}px`);
      }
    };

    rescaleText();

    // Add event listener for window resize
    window.addEventListener('resize', rescaleText);

    return () => {
      // Cleanup the listener when the object is unmounted
      window.removeEventListener('resize', rescaleText);
    };
  }, [value]);

  return <button ref={selfRef} className="Tile" style={{ fontSize: textSize }}>{value}</button>;
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