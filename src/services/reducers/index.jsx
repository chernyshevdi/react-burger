import { combineReducers } from 'redux';
import { ingredientsReducer } from './reducer';

//хранилище
export const rootReducer = combineReducers({ingredientsReducer})