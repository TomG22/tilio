/**
 * Authors:     Tom Giallanza
 * File:        React.jsx
 * Description: Frontend HTML and JS code that holds all React GUI components and handle's 
 *              user events.
 */

import './React.css';
import BoardUI from './BoardUI'
import React, {useState, useRef, useEffect} from 'react';


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
          <div id="Title">tilio</div>
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
