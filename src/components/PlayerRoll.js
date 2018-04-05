import React, { Component } from 'react';
import '../styles/App.css';


class PlayerRoll extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentPlayerInfo: this.props.currentPlayerInfo,
            gameOver: this.props.gameOver,
            round: this.props.round,
            numOfRounds: this.props.numOfRounds,
            currentFrameScore: 0,
            roll: 1,
            firstRollScore: 0,
            SecondRollScoreL: 0,
            moveToNextPlayer: false,
            strike: false,
            spare: false
        }
    }

    componentWillReceiveProps(nextProps) {
      this.setState({
          currentPlayerInfo: nextProps.currentPlayerInfo,
          round: nextProps.round
      })
    }


    handleClickOnRoll() {
        let { roll, currentPlayerInfo, numOfRounds, round } = this.state;
        let { updateScore } = this.props;
        this.setState({strike: false, spare: false});
        if(roll === 1) {
            var firstRollScore = Math.floor(Math.random() * 11);
            this.setState({currentFrameScore : firstRollScore, firstRollScore: firstRollScore, roll: 2});
            console.log("roll 1 is");
            console.log(firstRollScore);
            if (currentPlayerInfo.bonusRolesLeft > 0) {
                currentPlayerInfo.generalScore += 2 * firstRollScore;
                currentPlayerInfo.bonusRolesLeft-=1;
            }
            else {
                currentPlayerInfo.generalScore += firstRollScore;
            }

            this.setState({
                currentPlayerInfo: currentPlayerInfo
            })

            updateScore(currentPlayerInfo.generalScore);

            if(firstRollScore === 10) {
                currentPlayerInfo.bonusRolesLeft += 2;
                this.setState({
                    currentPlayerInfo : currentPlayerInfo,
                    strike: true,
                    moveToNextPlayer: true
                })
            }
        }
        else {
            let { firstRollScore } = this.state;
            let secondRollScore = Math.floor(Math.random() * (11 - firstRollScore));
            console.log("roll 2 is");
            console.log(secondRollScore);
            if (currentPlayerInfo.bonusRolesLeft > 0) {
                currentPlayerInfo.generalScore += 2 * secondRollScore;
                currentPlayerInfo.bonusRolesLeft-=1;
            }
            else {
                currentPlayerInfo.generalScore += secondRollScore;
            }
            this.setState({
                currentPlayerInfo: currentPlayerInfo,
                currentFrameScore: this.state.currentFrameScore + secondRollScore,
                moveToNextPlayer: true,
                extraRound: false
            })

            updateScore(currentPlayerInfo.generalScore);

            if(firstRollScore + secondRollScore === 10) {
                    currentPlayerInfo.bonusRolesLeft += 1;
                    this.setState({
                        spare: true,
                        currentPlayerInfo: currentPlayerInfo,
                        moveToNextPlayer: true
                    })
            }
        }
    }

    handleClickOnNext () {
        let { currentPlayerInfo } = this.state;
        this.setState({
        roll: 1,
        firstRollScore: 0,
        SecondRollScoreL: 0,
        currentFrameScore: 0,
        moveToNextPlayer: false,
        strike: false,
        spare: false
    })
        this.props.nextPlayer(currentPlayerInfo);
    }

    render() {
        let { currentFrameScore, roll, moveToNextPlayer, currentPlayerInfo, gameOver } = this.state;
        return (
            <div>
                <h3> Player {currentPlayerInfo.player} </h3>
                <h2> Current Roll Score: {currentFrameScore}</h2>
                <h2 className={this.state.strike ? "" : "noDisplay"}>Strike!!!</h2>
                <h2 className={this.state.spare ? "" : "noDisplay"}>Spare!!!</h2>
                <button type="button" className={moveToNextPlayer ? "noDisplay" : "roll-button"} onClick={this.handleClickOnRoll.bind(this)}>Roll {roll}</button>

                <button type="button" className={moveToNextPlayer ? "next-button" : "noDisplay" } onClick={this.handleClickOnNext.bind(this)}>{gameOver ? "Game Over" : "Next Player"}</button>
            </div>
        )
    }
}

export default PlayerRoll;
