import { combineReducers } from 'redux';
import adsReducer from './adsReducer';
import tagsReducer from './tagsReducer';
import userReducer from './userReducer';
//import validacionReducer from './validacionReducer';

export default combineReducers({
    ads: adsReducer,
    tags: tagsReducer,
    user:userReducer
//    error: validacionReducer
});