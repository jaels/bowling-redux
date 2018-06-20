import React, { Component } from 'react';
import '../styles/App.css';
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as actions from "../actions/actions";


class PlayerRoll extends Component {
    handleClickOnRoll() {
        let { roll, numOfRounds, round, extraRound, action, currentFrameScore, arrOfPlayers, currentPlayerIndex } = this.props;
        let { updateScore } = this.props;
        action.setStrike(false);
        action.setSpare(false);
        if(roll === 1) {
            var firstRollScore = Math.floor(Math.random() * 11);
            action.setCurrentFrameScore(firstRollScore);
            action.setFirstRollScore(firstRollScore);
            action.setRoll(2);

            if (arrOfPlayers[currentPlayerIndex].doublePointsRolls > 0 && !extraRound) {
                arrOfPlayers[currentPlayerIndex].generalScore += 2 * firstRollScore;
                arrOfPlayers[currentPlayerIndex].doublePointsRolls-=1;
            }
            else {
                arrOfPlayers[currentPlayerIndex].generalScore += firstRollScore;
            }
            action.updateArrOfPlayers(arrOfPlayers);

            if(firstRollScore === 10 && !extraRound) {
                arrOfPlayers[currentPlayerIndex].doublePointsRolls += 2;
                action.updateArrOfPlayers(arrOfPlayers);
                action.setStrike(true);

                if (round === numOfRounds) {
                    arrOfPlayers[currentPlayerIndex].doublePointsRolls = 0;
                    action.updateArrOfPlayers(arrOfPlayers);
                    action.setRoll(1);
                    action.setExtraRound(true);
                }
                else {
                    action.moveToNextPlayer(true);
                    action.setExtraRound(false);
                }
            }
        }
        else {
            let { firstRollScore } = this.props;
            /*checks if the person had a strike in the last frame, got 2 extra rolls, and scrolled a strike. In that case I assumed the person gets a new set of cones to roll another last roll*/
            let secondRollScore = firstRollScore === 10 && extraRound ? Math.floor(Math.random() * 11) : Math.floor(Math.random() * (11 - firstRollScore));
            if (arrOfPlayers[currentPlayerIndex].doublePointsRolls > 0 && !extraRound) {
                arrOfPlayers[currentPlayerIndex].generalScore += 2 * secondRollScore;
                arrOfPlayers[currentPlayerIndex].doublePointsRolls-=1;
            }
            else {
                arrOfPlayers[currentPlayerIndex].generalScore += secondRollScore;
            }
            action.updateArrOfPlayers(arrOfPlayers);
            action.setCurrentFrameScore(currentFrameScore+secondRollScore);
            action.moveToNextPlayer(true);
            action.setExtraRound(false);
            if(firstRollScore + secondRollScore === 10 && !extraRound) {
                action.setSpare(true);
                if(round === numOfRounds) {
                    arrOfPlayers[currentPlayerIndex].doublePointsRolls = 0;
                    action.updateArrOfPlayers(arrOfPlayers);
                    action.moveToNextPlayer(false);
                    action.setExtraRound(true);
                }
                else {
                    arrOfPlayers[currentPlayerIndex].doublePointsRolls += 1;
                    action.updateArrOfPlayers(arrOfPlayers);
                    action.moveToNextPlayer(true);
                    action.setExtraRound(false);
                }
            }
        }
    }

    handleClickOnNext () {
        let { action } = this.props;
        action.setRoll(1);
        action.setFirstRollScore(0);
        action.setCurrentFrameScore(0);
        action.moveToNextPlayer(false);
        action.setSpare(false);
        action.setStrike(false);

        this.props.nextPlayer();
    }

    render() {
        let { currentFrameScore, roll, moveToNextPlayer, currentPlayerIndex, arrOfPlayers, strike, spare, firstRollScore } = this.props;
        return (
            <div>
                <h3> Player {arrOfPlayers[currentPlayerIndex].player} </h3>
                <h2> Current Frame Total Score: {currentFrameScore}</h2>
                <h2 className={strike ? "" : "noDisplay"}>Strike!!!</h2>
                <h2 className={spare ? "" : "noDisplay"}>Spare!!!</h2>
                <button type="button" className={moveToNextPlayer ? "noDisplay" : "roll-button"} onClick={this.handleClickOnRoll.bind(this)}>Roll {roll}</button>
                <button type="button" className={moveToNextPlayer ? "next-button" : "noDisplay" } onClick={this.handleClickOnNext.bind(this)}>Next Player</button>

            </div>
        )
    }
}

function mapStateToProps(state, prop) {
    return {
        arrOfPlayers: state.arrOfPlayers,
        currentPlayerIndex: state.currentPlayerIndex,
        currentPlayerInfo: state.currentPlayerInfo,
        currentFrameScore: state.currentFrameScore,
        roll: state.roll,
        firstRollScore: state.firstRollScore,
        moveToNextPlayer: state.moveToNextPlayer,
        strike: state.strike,
        spare: state.spare,
        extraRound: state.extraRound,
        round: state.round,
        numOfRounds: state.numOfRounds
    }
}

function mapDispatchToProps(dispatch) {
    return {
        action: bindActionCreators(actions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PlayerRoll);
