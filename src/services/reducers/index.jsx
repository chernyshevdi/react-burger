import { combineReducers } from 'redux';
import { ingredientsReducer } from './burger-ingredients';
import { appReducer } from './app';
import { constructorReducer } from './burger-constructor';

//хранилище
export const rootReducer = combineReducers({
    ingredientsReducer,
    appReducer,
    constructorReducer,
    
})