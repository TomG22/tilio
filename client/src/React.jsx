/**
 * Authors:     Tom Giallanza
 * File:        React.jsx
 * Description: Frontend HTML and JS code that holds all React GUI components and handle's 
 *              user events.
 */

import './React.css';
import React, {useState, useRef, useEffect} from 'react';

function Header({children}) {
  return <div className="Header">{children}</div>;
}

function Button({className, children}) {
  //const [count, setCount] = useState(0);
  return (
    <div className="ButtonContainer">
      <button className={`Button ${className}`}>{children}</button>
    </div>
  );
}

function Board() {
  return (
    <div className="Board">
      <Tile value="2" data-row="0" data-col="1"/>
      <Tile value="2" data-row="0" data-col="2"/>
      <Tile value="10" data-row="0" data-col="3"/>
      <Tile value="100" data-row="0" data-col="4"/>
      <Tile value="2000" data-row="1" data-col="1"/>
      <Tile value="10000" data-row="1" data-col="2"/>
      <Tile value="100000" data-row="1" data-col="3"/>
      <Tile value="1000000" data-row="1" data-col="4"/>
      <Tile value="10000000" data-row="2" data-col="1"/>
      <Tile value="100000000" data-row="2" data-col="2"/>
      <Tile value="2" data-row="2" data-col="3"/>
      <Tile value="2" data-row="2" data-col="4"/>
      <Tile value="2" data-row="3" data-col="1"/>
      <Tile value="2" data-row="3" data-col="2"/>
      <Tile value="2" data-row="3" data-col="3"/>
      <Tile value="2" data-row="3" data-col="4"/>
    </div>
  )
}

function Tile({ value }) {
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

function Leaderboard({name, id}) {
  return (
    <div className="Leaderboard" id={id}>
      {name}
      <Score username="Player" score="9999" />
      <Score username="Player" score="9999" />
      <Score username="Player" score="9999" />
      <Score username="Player" score="9999" />
      <Score username="Player" score="9999" />
    </div>
  );
}

function Score({username, score}) {
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
      <Header>Header</Header>
      <Board />
      <Button className="Username">Username</Button>
      <Button className="Play">Play</Button>
      <Leaderboard name="High Score" id="scoresLB"/>
      <Leaderboard name="Fastest 2048" id="timesLB"/>
      <Leaderboard name="Live Leaderboard" id="liveLB"/>
    </div>
  );
}

export default App;

await fetchLiveLeaderboard();
async function fetchLiveLeaderboard () {
  fetch('http://localhost:3000/leaderboard/static')
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
  fetch('http://localhost:3000/leaderboard/static')
    .then(response => response.json())
    .then(data => {
      console.log(data);
      return data;
    })
}

(async () => {
    try {
        await updateLiveLeaderboard({
            username: 'eddieis so colajsndkjnasjkd',
            score: 'eddie i like juice',
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
async function updateLiveLeaderboard( {username, score, endTime, winTime, board }) {
  const payload = {
    username,
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
