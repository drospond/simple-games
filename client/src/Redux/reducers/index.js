import signInReducer from './signin';
import roomCodeReducer from './roomCode'
import {combineReducers} from 'redux';
import playerNumberReducer from './playerNumber';

const allReducers = combineReducers({
    signInState: signInReducer,
    roomCode: roomCodeReducer,
    playerNumber: playerNumberReducer
})

export default allReducers;