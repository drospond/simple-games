import signInReducer from './signin';
import roomCodeReducer from './roomCode'
import {combineReducers} from 'redux';

const allReducers = combineReducers({
    signInState: signInReducer,
    roomCode: roomCodeReducer
})

export default allReducers;