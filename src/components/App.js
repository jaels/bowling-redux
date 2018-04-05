import React, {Component} from 'react';
import '../styles/App.css';
import PlayerRoll from './PlayerRoll';
import ScoreState from './ScoreState';
import GameOver from './GameOver';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentPlayerIndex: 0,
            numOfPlayers: '',
            arrOfPlayers: [],
            gameStarted: false,
            currentPlayerInfo: {},
            round: 1,
            numOfRounds: 2,
            gameOver: false,
            whoWon: 0
        }
    }

    handleClickOnStart() {
        let {numOfPlayers, currentPlayerIndex} = this.state;
        if (numOfPlayers) {
            let arrOfPlayers = [];
            for (let i = 0; i < numOfPlayers; i++) {
                arrOfPlayers.push({
                    player: i + 1,
                    doublePointsRolls: 0,
                    generalScore: 0
                })
            }
            this.setState({arrOfPlayers: arrOfPlayers, gameStarted: true, currentPlayerInfo: arrOfPlayers[currentPlayerIndex]})
        }

    }
    updateInputValue(e) {
        this.setState({numOfPlayers: e.target.value})
    }

    nextPlayer(info) {
        let {arrOfPlayers, currentPlayerIndex, numOfPlayers, round, numOfRounds} = this.state;
        arrOfPlayers[currentPlayerIndex] = info;
        if (round === numOfRounds && currentPlayerIndex === numOfPlayers - 1) {
            this.setState({
                gameOver: true,
                whoWon: numOfPlayers == 1
                    ? 1
                    : arrOfPlayers.reduce((prev, current) => (prev.generalScore > current.generalScore)
                        ? prev.player
                        : current.player)
            })
        } else {
            if (currentPlayerIndex === numOfPlayers - 1) {
                currentPlayerIndex = 0;
                this.setState({
                    round: round + 1
                })
            } else {
                currentPlayerIndex += 1
            }

            this.setState({arrOfPlayers: arrOfPlayers, currentPlayerIndex: currentPlayerIndex, currentPlayerInfo: arrOfPlayers[currentPlayerIndex]})
        }
    }

    updateScore(score) {
        let {arrOfPlayers, currentPlayerIndex, currentPlayerInfo} = this.state;
        currentPlayerInfo.generalScore = score;
        arrOfPlayers[currentPlayerIndex].generalScore = score;
        this.setState({arrOfPlayers: arrOfPlayers, currentPlayerInfo: currentPlayerInfo})
    }

    startOver() {
        this.setState({
            currentPlayerIndex: 0,
            numOfPlayers: '',
            arrOfPlayers: [],
            gameStarted: false,
            currentPlayerInfo: {},
            round: 1,
            gameOver: false,
            whoWon: 0
        })
    }

    render() {
        let {
            gameStarted,
            arrOfPlayers,
            currentPlayerInfo,
            round,
            currentPlayerIndex,
            gameOver,
            whoWon,
            numOfRounds
        } = this.state;
        const whatToRender = () => {
            if (gameOver) {
                return (<GameOver whoWon={whoWon} startOver={this.startOver.bind(this)}/>)
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
                                <input id="num-of-players" type="number" onChange={this.updateInputValue.bind(this)} value={this.state.inputValue}/>
                                <button type="button" id="start-button" onClick={this.handleClickOnStart.bind(this)}>Start Game</button>
                            </div>
                        </div>
                    )
                } else
                    return (
                            <div className="play-area">
                                <ScoreState arrOfPlayers={arrOfPlayers} currentPlayerIndex={currentPlayerIndex}/>
                                <h2>Round {round}</h2>
                                <PlayerRoll currentPlayerInfo={currentPlayerInfo} gameOver={gameOver} round={round} numOfRounds={numOfRounds} nextPlayer={this.nextPlayer.bind(this)} updateScore={this.updateScore.bind(this)}/>
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

export default App;
