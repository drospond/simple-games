import signInReducer from './signin';
import {combineReducers} from 'redux';

const allReducers = combineReducers({
    signInState: signInReducer
})

export default allReducers;