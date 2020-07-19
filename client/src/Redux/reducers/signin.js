const initialState = {
    isSignedIn: false,
    user: false
}

const signInReducer = (state = initialState, actions) => {
    switch(actions.type){
        case 'SIGNIN':
            return {
                ...state,
                isSignedIn: true
            }
        case 'SIGNOUT':
            return {
                ...state,
                isSignedIn: false
            }
        case 'STORE_USER':
            return{
                ...state,
                user: actions.payload
            }
        default: 
            return state
    }
}

export default signInReducer;