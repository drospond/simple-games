const playerNumberReducer = (state = "", actions) => {
    switch(actions.type){
        case 'ASSIGN_PLAYER_NUMBER':
            return actions.payload
        default: 
            return state
    }
}

export default playerNumberReducer;