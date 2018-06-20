
export var setNumberOfPlayers = (item) => {
    return {
        type: "SET_NUMBER_OF_PLAYERS",
        item
    }
}

export var setArrOfPlayers = (item) => {
    return {
        type: "SET_ARR_OF_PLAYERS",
        item
    }
}


export var updateArrOfPlayers = (item) => {
    return {
        type: "UPDATE_ARR_OF_PLAYERS",
        item
    }
}


export var toggleGameStarted = () => {
    return {
        type: "TOGGLE_GAME_STARTED"
    }
}


export var setStrike = (item) => {
    return {
        type: "SET_STRIKE",
        item
    }
}

export var setSpare = (item) => {
    return {
        type: "SET_SPARE",
        item
    }
}

export var setCurrentFrameScore = (item) => {
    return {
        type: "SET_CURRENT_FRAME_SCORE",
        item
    }
}


export var setFirstRollScore = (item) => {
    return {
        type: "SET_FIRST_ROLL_SCORE",
        item
    }
}

export var setRoll = (item) => {
    return {
        type: "SET_ROLL",
        item
    }
}

export var setExtraRound = (item) => {
    return {
        type: "SET_EXTRA_ROUND",
        item
    }
}

export var moveToNextPlayer = (item) => {
    return {
        type: "MOVE_TO_NEXT_PLAYER",
        item
    }
}

export var setGameOver = (item) => {
    return {
        type: "SET_GAME_OVER",
        item
    }
}

export var setWhoWon = (item) => {
    return {
        type: "SET_WHO_WON",
        item
    }
}


export var setCurrentPlayerIndex = (item) => {
    return {
        type: "SET_CURRENT_PLAYER_INDEX",
        item
    }
}

export var setRound = (item) => {
    return {
        type: "SET_ROUND",
        item
    }
}
