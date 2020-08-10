const roomCodeReducer = (state = "", actions) => {
    switch(actions.type){
        case 'JOINROOM':
            return actions.payload
        default: 
            return state
    }
}

export default roomCodeReducer;