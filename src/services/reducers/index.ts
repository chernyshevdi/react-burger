import { combineReducers } from 'redux';
import { ingredientsReducer } from './burger-ingredients';
import { appReducer } from './app';
import { constructorReducer } from './burger-constructor';
import { forgotPasswordReducer } from './forgot-password';
import { recoveryPasswordReducer } from './recovery-password';
import { registerReducer } from './register';
import { loginReducer } from './auth';
import { updateUserReducer } from './update-user';
import { updateTokenReducer } from './update-token';
import { orderListReducer } from './order-list';
//import { profileOrderListReducer } from './profile-order-list';
import { wsReducer } from './wsReducer';

//хранилище
export const rootReducer = combineReducers({
    ingredientsReducer,
    appReducer,
    constructorReducer,
    forgotPasswordReducer,
    recoveryPasswordReducer,
    registerReducer,
    loginReducer,
    updateUserReducer,
    updateTokenReducer,
    orderListReducer,
    //profileOrderListReducer,
    wsReducer
})