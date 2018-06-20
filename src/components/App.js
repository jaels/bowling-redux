import React, {Component} from 'react';
import '../styles/App.css';
import PlayerRoll from './PlayerRoll';
import ScoreState from './ScoreState';
import GameOver from './GameOver';
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import * as actions from "../actions/actions";

class App extends Component {
    handleClickOnStart() {
        let {arrOfPlayers, numOfPlayers, action} = this.props;
        if (numOfPlayers) {
            action.setArrOfPlayers(numOfPlayers);
            action.toggleGameStarted();
        }
    }
    updateInputValue(e) {
        this.props.action.setNumberOfPlayers(e.target.value);
    }

    nextPlayer() {
        let {
            arrOfPlayers,
            currentPlayerIndex,
            numOfPlayers,
            round,
            numOfRounds,
            action
        } = this.props;
        if (round === numOfRounds && currentPlayerIndex === numOfPlayers - 1) {
            action.setGameOver(true);
            if (numOfPlayers === 1) {
                action.setWhoWon(1)
            } else {
                let winner = arrOfPlayers.reduce((prev, current) => (prev.generalScore > current.generalScore)
                    ? prev.player
                    : current.player)
                action.setWhoWon(winner);
            }
        } else {
            let nextPlayer;
            if (currentPlayerIndex === numOfPlayers - 1) {
                nextPlayer = 0;
                action.setRound(round + 1);
            } else {
                nextPlayer = currentPlayerIndex + 1;
            }
            action.setCurrentPlayerIndex(nextPlayer);
        }
    }

    updateArrOfPlayers(arrOfPlayers) {
        this.props.action.updateArrOfPlayers(arrOfPlayers);
    }

    startOver() {
        let { action } = this.props;
        action.setCurrentPlayerIndex(0);
        action.setNumberOfPlayers("");
        action.setArrOfPlayers([]);
        action.toggleGameStarted();
        action.setRound(1);
        action.setGameOver(false);
        action.setWhoWon(0);
    }

    render() {
        let {
            gameStarted,
            arrOfPlayers,
            round,
            currentPlayerIndex,
            gameOver,
            whoWon,
            numOfRounds,
            numOfPlayers
        } = this.props;
        const whatToRender = () => {
            if (gameOver) {
                return (
                    <GameOver whoWon={whoWon} startOver={this.startOver.bind(this)}/>
                )
            } else {
                if (!gameStarted) {
                    return (
                        <div>
                            <header className="App-header">
                                <h1 className="App-title">BOWLING WITHOUT MOVING</h1>
                                <img src="bowling_img.jpeg" alt="bowling"/>
                            </header>
                            <div>
                                <p className="App-intro">
                                    Please choose number of players
                                </p>
                                <input id="num-of-players" type="number" onChange={this.updateInputValue.bind(this)}/>
                                <button type="button" id="start-button" onClick={this.handleClickOnStart.bind(this)}>Start Game</button>
                            </div>
                        </div>
                    )
                } else
                    return (
                        <div style={{
                            backgroundColor: "#DEB887"
                        }}>
                            <div className="play-area">
                                <ScoreState arrOfPlayers={arrOfPlayers}
                                currentPlayerIndex={currentPlayerIndex}/>
                                <h2>Round {round}</h2>
                                <PlayerRoll nextPlayer={this.nextPlayer.bind(this)}
                                updateArrOfPlayers={this.updateArrOfPlayers.bind(this)}/>
                            </div>
                            <img src="bigLebowski.jpg" alt="track" style={{
                                marginTop: "30px",
                                width: "100%"
                            }}/>
                        </div>
                    )
            }
        }
        return (
            <div className="App">
                {whatToRender()}
            </div>
        );
    }
}

function mapStateToProps(state, prop) {
    return {
        arrOfPlayers: state.arrOfPlayers,
        currentPlayerIndex: state.currentPlayerIndex,
        numOfPlayers: state.numOfPlayers,
        gameStarted: state.gameStarted,
        round: state.round,
        numOfRounds: state.numOfRounds,
        gameOver: state.gameOver,
        whoWon: state.whoWon
    }
}

function mapDispatchToProps(dispatch) {
    return {
        action: bindActionCreators(actions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
