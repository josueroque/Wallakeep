import { combineReducers } from 'redux';
import adsReducer from './adsReducer';
import tagsReducer from './tagsReducer';
//import validacionReducer from './validacionReducer';

export default combineReducers({
    ads: adsReducer,
    tags: tagsReducer,
//    error: validacionReducer
});