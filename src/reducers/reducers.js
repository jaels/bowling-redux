

exports.numOfRoundsReducer =  function(state=2, action) {
    switch(action.type) {
        default:
        return state;
    }
}

exports.currentPlayerIndexReducer =  function(state=0, action) {
    switch(action.type) {
        case "SET_CURRENT_PLAYER_INDEX":
        return action.item;
        default:
        return state;
    }
}

exports.numOfPlayersReducer =  function(state=0, action) {
    switch(action.type) {
        case "SET_NUMBER_OF_PLAYERS":
        return action.item;
        default:
        return state;
    }
}

exports.arrOfPlayersReducer =  function(state=[], action) {
    switch(action.type) {
        case "SET_ARR_OF_PLAYERS":
        var newArr = [];
        for (let i = 0; i < action.item; i++) {
            newArr.push({
                player: i + 1,
                doublePointsRolls: 0,
                generalScore: 0
            })
        }
        return newArr;
        case "UPDATE_ARR_OF_PLAYERS":
        return action.item;
        default:
        return state;
    }
}


exports.gameStartedReducer =  function(state=false, action) {
    switch(action.type) {
        case "TOGGLE_GAME_STARTED":
        return !state;
        default:
        return state;
    }
}

exports.currentPlayerInfoReducer =  function(state={}, action) {
    switch(action.type) {
        case "SET_CURRENT_PLAYER_INFO":
        return action.item;
        default:
        return state;
    }
}

exports.roundReducer =  function(state=1, action) {
    switch(action.type) {
        case "SET_ROUND":
        return action.item;
        default:
        return state;
    }
}


exports.gameOverReducer =  function(state=false, action) {
    switch(action.type) {
        case "SET_GAME_OVER":
        return action.item;
        default:
        return state;
    }
}

exports.whoWonReducer =  function(state=0, action) {
    switch(action.type) {
        case "SET_WHO_WON":
        return action.item;
        default:
        return state;
    }
}


exports.currentFrameScoreReducer =  function(state=0, action) {
    switch(action.type) {
        case "SET_CURRENT_FRAME_SCORE":
        return action.item;
        default:
        return state;
    }
}


exports.rollReducer =  function(state=1, action) {
    switch(action.type) {
        case "SET_ROLL":
        return action.item;
        default:
        return state;
    }
}

exports.firstRollScoreReducer =  function(state=0, action) {
    switch(action.type) {
        case "SET_FIRST_ROLL_SCORE":
        return action.item;
        default:
        return state;
    }
}


exports.moveToNextPlayerReducer =  function(state=false, action) {
    switch(action.type) {
        case "MOVE_TO_NEXT_PLAYER":
        return action.item;
        default:
        return state;
    }
}

exports.strikeReducer =  function(state=false, action) {
    switch(action.type) {
        case "SET_STRIKE":
        return action.item;
        default:
        return state;
    }
}

exports.spareReducer =  function(state=false, action) {
    switch(action.type) {
        case "SET_SPARE":
        return action.item;
        default:
        return state;
    }
}

exports.extraRoundReducer =  function(state=false, action) {
    switch(action.type) {
        case "SET_EXTRA_ROUND":
        return action.item;
        default:
        return state;
    }
}
