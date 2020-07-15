const signInReducer = (state = false, actions) => {
    switch(actions.type){
        case 'SIGNIN':
            return !state
        case 'SIGNOUT':
            return !state
        default: 
            return state
    }
}

export default signInReducer;