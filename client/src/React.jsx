/**
 * Authors:     Tom Giallanza
 * File:        React.jsx
 * Description: Frontend HTML and JS code that holds all React GUI components and handle's 
 *              user events.
 */

import './React.css';
import BoardUI from './BoardUI';
import React, {useState, useRef, useEffect} from 'react';
import TutorialUI from './TutorialUI';


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
  const [currentScreen, setCurrentScreen] = useState('Login');
  const [username, setUsername] = useState('');


  const goBack = () => {
    if (username === '') {
      setCurrentScreen('Login');
    } else {
      setCurrentScreen('Home');
    }
  }
  const showHome = () => setCurrentScreen('Home');
  const showLB = () => setCurrentScreen('Leaderboards');
  const showMP = () => setCurrentScreen('Multiplayer');
  const showPractice = () => setCurrentScreen('Practice');
  const showTutorial = () => setCurrentScreen('Tutorial');

  const login = (event) => {
    let inputText = document.getElementById("LoginField").value;
    if (inputText != "") {
      setUsername(inputText);
      showHome();
    }
  }

  const selectMode = async (mode) => {
    try {
      const user = await createUser(username);

      setCurrentScreen(mode);
    } catch (error) {
      console.error("Error selecting mode: ", error);
    }
  };

  const handleUsernameChange = (event) => {
    setUsername(event.target.value); // Update the username state with input value
  };

  async function createUser({username}) {
    let startTime = Date.now();
  
    const payload = {
      username,
      startTime
    };
  
    try {
      const response = await fetch('http://localhost:3000/createuser', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
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
          <LeaderboardUI name="High Score" id="scoresLB" />
          <LeaderboardUI name="Fastest 2048" id="timesLB" />
          <ButtonUI id="Back" onClick={goBack}>Back to Menu</ButtonUI>
        </>
      )}

      {currentScreen === 'Multiplayer' && (
        <>
          <BoardUI />
          <LeaderboardUI name="Live Leaderboard" id="liveLB" />
          <ButtonUI id="Back" onClick={goBack}>Back to Menu</ButtonUI>
        </>
      )}

      {currentScreen === 'Practice' && (
        <>
          <BoardUI />
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
}

export default App;
