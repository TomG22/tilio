import React from 'react';
import './React.css';

function TutorialUI() {
    return (
        <div className="Tutorial">
            <h1>How to Play Tilio</h1>
            <ul>
                <li>
                    <strong>Move Tiles:</strong>
                    <p>Use arrow keys to move tiles. When two tiles with the same number touch, they merge into one.</p>
                </li>
                <li>
                    <strong>Score Points:</strong>
                    <p>Your score increases as you merge tiles.</p>
                </li>
                <li>
                    <strong>Multiplayer Attacks:</strong>
                    <p>Earn points to send attacks to other players! Starting at 2000, each attack will be sent each time you double your score! (i.e. 4000, 8000, ...).
                    Attacks freeze the second-highest tile of the player above you for 30 seconds.</p>
                </li>
                <li>
                    <strong>Objective:</strong>
                    <p>Reach the 2048 tile and beyond. Compete to get the highest score or the fastest 2048!</p>
                </li>
            </ul>
            <normal>Practice in single-player mode or compete against others in multiplayer mode. Good luck!</normal>
        </div>
    );
}

export default TutorialUI;