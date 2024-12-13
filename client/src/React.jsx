/**
 * Authors:     Tom Giallanza
 * File:        React.jsx
 * Description: Frontend HTML and JS code that holds all React GUI components and handle's 
 *              user events.
 */

import './React.css';
import BoardUI from './BoardUI'
import React, {useState, useRef, useEffect} from 'react';

let userID;
let username;

function HeaderUI({children}) {
  return <div className="Header">{children}</div>;
}

function ButtonUI({children, id, onClick}) {
  //const [count, setCount] = useState(0);
  return (
    <div className="ButtonContainer" id={id}>
      <button className="Button"onClick={onClick}>{children}</button>
    </div>
  );
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
  const [currentScreen, setCurrentScreen] = useState('Home');

  const showHome = () => setCurrentScreen('Home');
  const showLB = () => setCurrentScreen('Leaderboards');
  const showMP = () => setCurrentScreen('Multiplayer');
  const showPractice = () => setCurrentScreen('Practice');

  console.log(currentScreen);
  return (
    <div className="App">
      {currentScreen === 'Home' && (
        <>
          <ButtonUI id="SPButton" onClick={showPractice}>Practice</ButtonUI>
          <ButtonUI id="MPButton" onClick={showMP}>Multiplayer</ButtonUI>
          <ButtonUI id="LBButton" onClick={showLB}>Leaderboards</ButtonUI>
        </>
      )}

      {currentScreen === 'Leaderboards' && (
        <>
          <LeaderboardUI name="High Score" id="scoresLB" />
          <LeaderboardUI name="Fastest 2048" id="timesLB" />
          <ButtonUI id="Back" onClick={showHome}>Back to Menu</ButtonUI>
        </>
      )}

      {currentScreen === 'Multiplayer' && (
        <>
          <BoardUI />
          <LeaderboardUI name="Live Leaderboard" id="liveLB" />
          <ButtonUI id="Back" onClick={showHome}>Back to Menu</ButtonUI>
        </>
      )}

      {currentScreen === 'Practice' && (
        <>
          <BoardUI />
          <ButtonUI id="Back" onClick={showHome}>Back to Menu</ButtonUI>
        </>
      )}

      <HeaderUI>{currentScreen}</HeaderUI>
      <ButtonUI id="UsernameLabel">Username</ButtonUI>
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
async function updateLiveLeaderboard( { 
score, endTime, winTime, board }) {
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