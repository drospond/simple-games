import signInReducer from './signin';
import {combineReducers} from 'redux';

const allReducers = combineReducers({
    isSignedIn: signInReducer
})

export default allReducers;