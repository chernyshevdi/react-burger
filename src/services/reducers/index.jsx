import { combineReducers } from 'redux';
import { ingredientsReducer } from './burger-ingredients';
import { appReducer } from './app';
import { constructorReducer } from './burger-constructor';
import { forgotPasswordReducer } from './forgot-password';
import { recoveryPasswordReducer } from './recovery-password';
import { registerReducer } from './register';
import { loginReducer } from './auth';
import { getUserReducer } from './get-user';
import { updateUserReducer } from './update-user';
import { updateTokenReducer } from './update-token';
import { logoutReducer } from './logout';

//хранилище
export const rootReducer = combineReducers({
    ingredientsReducer,
    appReducer,
    constructorReducer,
    forgotPasswordReducer,
    recoveryPasswordReducer,
    registerReducer,
    loginReducer,
    getUserReducer,
    updateUserReducer,
    updateTokenReducer,
    logoutReducer,
})