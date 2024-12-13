import React from 'react';
import './React.css';

function TutorialUI() {
    return (
        <div className="Tutorial">
            <h1>How to Play Tilio</h1>
            <p>Tilio is a multiplayer version of the classic 2048 game. Here’s how you play:</p>
            <ul>
                <li>
                    <strong>Move Tiles:</strong> Use arrow keys to move tiles. When two tiles with the same number touch, they merge into one.
                </li>
                <li>
                    <strong>Score Points:</strong> Your score increases as you merge tiles.
                </li>
                <li>
                    <strong>Multiplayer Attacks:</strong> Earn points to send attacks to other players! Starting at 2000, each attack will be sent each time you double your score! (i.e. 4000, 8000, ...).
                    Attacks freeze the second-highest tile of the player above you for 30 seconds.
                </li>
                <li>
                    <strong>Objective:</strong> Reach the 2048 tile and beyond. Compete to get the highest score or the fastest 2048!
                </li>
            </ul>
            <p>Practice in single-player mode or compete against others in multiplayer mode. Good luck!</p>
        </div>
    );
}

export default TutorialUI;