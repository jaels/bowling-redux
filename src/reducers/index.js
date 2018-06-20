import {currentPlayerIndexReducer, numOfPlayersReducer, arrOfPlayersReducer, gameStartedReducer, currentPlayerInfoReducer, roundReducer, numOfRoundsReducer, gameOverReducer, whoWonReducer, currentFrameScoreReducer,currentRollScoreReducer, firstRollScoreReducer, SecondRollScoreReducer, rollReducer, moveToNextPlayerReducer, strikeReducer, spareReducer, extraRoundReducer } from "./reducers";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
    currentPlayerIndex: currentPlayerIndexReducer,
    numOfPlayers: numOfPlayersReducer,
    arrOfPlayers: arrOfPlayersReducer,
    gameStarted: gameStartedReducer,
    round: roundReducer,
    numOfRounds: numOfRoundsReducer,
    gameOver: gameOverReducer,
    whoWon: whoWonReducer,
    currentFrameScore: currentFrameScoreReducer,
    roll: rollReducer,
    firstRollScore: firstRollScoreReducer,
    moveToNextPlayer: moveToNextPlayerReducer,
    strike: strikeReducer,
    spare: spareReducer,
    extraRound: extraRoundReducer

});

export default rootReducer;
