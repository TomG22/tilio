/**
 * Authors:     Tom Giallanza
 * File:        React.jsx
 * Description: Frontend HTML and JS code that holds all React GUI components and handle's 
 *              user events.
 */

import './React.css';
import BoardUI from './BoardUI';
import React, { useState, useEffect } from 'react';
import TutorialUI from './TutorialUI';

const hostname = `143.244.148.164`;
const port = 3000;

function HeaderUI({ children }) {
  return <div className="Header">{children}</div>;
}

function ButtonUI({ children, id, onClick }) {
  return (
    <div className="ButtonContainer" id={id}>
      <button className="Button" onClick={onClick}>{children}</button>
    </div>
  );
}

function LeaderboardUI({ name, id, fetchData }) {
  const [lbData, setLBData] = useState([]);

  useEffect(() => {
    async function loadLBData() {
      try {
        const data = await fetchData();
        setLBData(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error(`Error fetching leaderboard data: ${error}`);
      }
    }

    // Fetch the new leaderboard data every second
    const intervalId = setInterval(() => {
      loadLBData();
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, [fetchData]);

  return (
    <div className="Leaderboard" id={id}>
      <h2>{name}</h2>
      {lbData.length > 0 ? (
        lbData.map((data, index) => {
          return (
            <ScoreUI
              key={index}
              username={data.username || "Unknown"}
              score={data.score || "N/A"}
            />
          );
        })
      ) : (
        <div>No data available</div>
      )}
    </div>
  );
}

function ScoreUI({ username, score }) {
  return (
    <div className="Score">
      <div className="UsernameLabel">{username}</div>
      <div className="ScoreLabel">{score}</div>
    </div>
  );
}

function App() {
  const [currentScreen, setCurrentScreen] = useState('Login');
  const [username, setUsername] = useState('');

  const goBack = () => {
    if (username === '') {
      setCurrentScreen('Login');
    } else {
      setCurrentScreen('Home');
    }

    if (currentScreen === 'Multiplayer') {
      updateLiveLeaderboard({
        endTime: Date.now(),
      });
    }
  };
  const showHome = () => setCurrentScreen('Home');
  const showLB = () => setCurrentScreen('Leaderboards');
  const showTutorial = () => setCurrentScreen('Tutorial');

  const login = (event) => {
    let inputText = document.getElementById("LoginField").value;
    if (inputText !== "") {
      setUsername(inputText);
      showHome();
    }
  };


  const selectMode = async (mode) => {
    try {
      console.log(`selectMode creating user ${username}`);
      if (mode === 'Practice') {
        console.log("entering practice mode with ", username);
        await createStaticUser({ username });
      } else if (mode === 'Multiplayer') {
        await createUser({ username });
      }
      setCurrentScreen(mode);
    } catch (error) {
      console.error("Error selecting mode: ", error);
    }
  };

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  async function createUser({ username }) {
    let startTime = Date.now();

    const payload = {
      username,
      startTime
    };

    try {
      const response = await fetch(`http://${hostname}:${port}/createuser`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Server error: ${response.status} - ${errorText}`);
      }

      const data = await response.json();
      console.log('User created successfully:', data);
    } catch (error) {
      console.error(error);
    }
  }

  async function createStaticUser({ username }) {
    let startTime = Date.now();

    const payload = {
      username,
      startTime,
    };

    try {
      const response = await fetch(`http://${hostname}:${port}/createStaticUser`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      console.log("client creating static user " + payload.username);
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Server error: ${response.status} - ${errorText}`);
      }

      const data = await response.json();
      console.log('client successfully static created user: ', data);
    } catch (error) {
      console.error(error);
    }
  }

  async function fetchLiveLeaderboard() {
    try {
      const response = await fetch(`http://${hostname}:${port}/leaderboard/live`);
      const data = await response.json();
      console.log(data);
      return data;
    } catch (error) {
      console.error(error);
      return [];
    }
  }

  async function fetchStaticLeaderboard() {
    try {
      const response = await fetch(`http://${hostname}:${port}/leaderboard/static`);
      const data = await response.json();
      console.log(data);
      return data;
    } catch (error) {
      console.error(error);
      return [];
    }
  }

  async function fetchWinners() {
    try {
      const response = await fetch(`http://${hostname}:${port}/leaderboard/winners`);
      const data = await response.json();
      console.log(data);
      return data;
    } catch (error) {
      console.error(error);
      return [];
    }
  }

  return (
    <div className="App">
      {currentScreen === 'Login' && (
        <>
          <div id="Title">tilio</div>
          <input type="text" id="LoginField" placeholder="Username" />
          <ButtonUI id="Login" onClick={login}>Login</ButtonUI>
        </>
      )}

      {currentScreen === 'Home' && (
        <>
          <div id="Title">tilio</div>
          <ButtonUI id="SPButton" onClick={() => selectMode('Practice')}>Practice</ButtonUI>
          <ButtonUI id="MPButton" onClick={() => selectMode('Multiplayer')}>Multiplayer</ButtonUI>
          <ButtonUI id="LBButton" onClick={showLB}>Leaderboards</ButtonUI>
          <ButtonUI id="TutorialButton" onClick={showTutorial}>Tutorial</ButtonUI>
        </>
      )}

      {currentScreen === 'Leaderboards' && (
        <>
          <LeaderboardUI name="High Score" id="scoresLB" fetchData={fetchStaticLeaderboard} />
          <LeaderboardUI name="2048 Winners" id="winnersLB" fetchData={fetchWinners} />
          <ButtonUI id="Back" onClick={goBack}>Back to Menu</ButtonUI>
        </>
      )}

      {currentScreen === 'Multiplayer' && (
        <>
          <BoardUI username={username} mode={"Multiplayer"}/>
          <LeaderboardUI name="Live Leaderboard" id="liveLB" fetchData={fetchLiveLeaderboard} />
          <ButtonUI id="Back" onClick={goBack}>Back to Menu</ButtonUI>
        </>
      )}

      {currentScreen === 'Practice' && (
        <>
          <BoardUI username={username} mode={"Practice"}/>
          <ButtonUI id="Back" onClick={goBack}>Back to Menu</ButtonUI>
        </>
      )}

      {currentScreen === 'Tutorial' && (
        <>
          <TutorialUI />
          <ButtonUI id="Back" onClick={goBack}>Back to Menu</ButtonUI>
        </>
      )}

      {currentScreen !== 'Login' && (
        <>
          <HeaderUI>{currentScreen}</HeaderUI>
          <ButtonUI id="UsernameLabel">{username}</ButtonUI>
        </>
      )}
    </div>
  );

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

}
export default App;
