import React, { Component } from 'react';
import '../styles/App.css';


class PlayerRoll extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentPlayerInfo: this.props.currentPlayerInfo,
            round: this.props.round,
            numOfRounds: this.props.numOfRounds,
            currentFrameScore: 0,
            roll: 1,
            firstRollScore: 0,
            SecondRollScoreL: 0,
            moveToNextPlayer: false,
            strike: false,
            spare: false,
            extraRound: false
        }
    }

    componentWillReceiveProps(nextProps) {
      this.setState({
          currentPlayerInfo: nextProps.currentPlayerInfo,
          round: nextProps.round
      })
    }

    handleClickOnRoll() {
        let { roll, currentPlayerInfo, numOfRounds, round, extraRound } = this.state;
        let { updateScore } = this.props;
        this.setState({strike: false, spare: false});
        if(roll === 1) {
            var firstRollScore = Math.floor(Math.random() * 11);
            this.setState({currentFrameScore : firstRollScore, firstRollScore: firstRollScore, roll: 2});
            /*console.log("roll 1 is");
            console.log(firstRollScore);*/
            if (currentPlayerInfo.doublePointsRolls > 0 && !extraRound) {
                currentPlayerInfo.generalScore += 2 * firstRollScore;
                currentPlayerInfo.doublePointsRolls-=1;
            }
            else {
                currentPlayerInfo.generalScore += firstRollScore;
            }

            this.setState({
                currentPlayerInfo: currentPlayerInfo
            })

            updateScore(currentPlayerInfo.generalScore);

            if(firstRollScore === 10 && !extraRound) {
                currentPlayerInfo.doublePointsRolls += 2;
                this.setState({
                    currentPlayerInfo : currentPlayerInfo,
                    strike: true
                })
                if (round === numOfRounds) {
                    currentPlayerInfo.doublePointsRolls = 0;
                    this.setState({
                        roll: 1,
                        currentPlayerInfo : currentPlayerInfo,
                        extraRound: true
                    })
                }
                else {
                    this.setState({
                        moveToNextPlayer: true,
                        extraRound: false
                    })
                }
            }
        }
        else {
            let { firstRollScore } = this.state;
            /*checks if the person had a strike in the last frame, got 2 extra rolls, and scrolled a strike. In that case I assumed the person gets a new set of cones to roll another last roll*/
            let secondRollScore = firstRollScore === 10 && extraRound ? Math.floor(Math.random() * 11) : Math.floor(Math.random() * (11 - firstRollScore));
            /*console.log("roll 2 is");
            console.log(secondRollScore);*/
            if (currentPlayerInfo.doublePointsRolls > 0 && !extraRound) {
                currentPlayerInfo.generalScore += 2 * secondRollScore;
                currentPlayerInfo.doublePointsRolls-=1;
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

            if(firstRollScore + secondRollScore === 10 && !extraRound) {
                if(round === numOfRounds) {
                    currentPlayerInfo.doublePointsRolls = 0;
                    this.setState({
                        moveToNextPlayer: false,
                        spare: true,
                        currentPlayerInfo: currentPlayerInfo,
                        extraRound: true
                    })
                }
                else {
                    currentPlayerInfo.doublePointsRolls += 1;
                    this.setState({
                        spare: true,
                        currentPlayerInfo: currentPlayerInfo,
                        moveToNextPlayer: true,
                        extraRound: false
                    })
                }
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
        let { currentFrameScore, roll, moveToNextPlayer, currentPlayerInfo } = this.state;
        return (
            <div>
                <h3> Player {currentPlayerInfo.player} </h3>
                <h2> Current Roll Score: {currentFrameScore}</h2>
                <h2 className={this.state.strike ? "" : "noDisplay"}>Strike!!!</h2>
                <h2 className={this.state.spare ? "" : "noDisplay"}>Spare!!!</h2>
                <button type="button" className={moveToNextPlayer ? "noDisplay" : "roll-button"} onClick={this.handleClickOnRoll.bind(this)}>Roll {roll}</button>

                <button type="button" className={moveToNextPlayer ? "next-button" : "noDisplay" } onClick={this.handleClickOnNext.bind(this)}>Next Player</button>
            </div>
        )
    }
}

export default PlayerRoll;
