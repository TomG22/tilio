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
                    <strong>Multiplayer Attacks:</strong> Earn points to send attacks to other players! Attacks freeze their tiles for a limited time.
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