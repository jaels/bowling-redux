import React, {Component} from 'react';
import '../styles/App.css';


const GameOver = (props) => {
        return (
            <div>
                <h1>GAME OVER</h1>
                <h2> The winner is {props.whoWon} </h2>
                <button type="button" className="start-again-btn" onClick={props.startOver}>Start Over</button>
                    <img src="simpsons.jpg" alt="track" style={{
                        marginTop: "30px", width: "100%"
                    }}/>
            </div>
        )
}

export default GameOver;
