import { store } from '../../index';
import { TAppActions } from '../actions/app';
import { TBurgerConstructorActions } from '../actions/burger-constructor';
import { TGetIngredientsActions } from '../actions/burger-ingredients';
import { TForgotPasswordActions } from '../actions/forgot-password';
import { TLoginActions } from '../actions/login';
import { TRecoveryPasswordActions } from '../actions/recovery-password';
import { TRegisterActions } from '../actions/register';
import { TUpdateTokenActions } from '../actions/update-token';
import { TUpdateUserActions } from '../actions/update-user';
import { TGetOrderListActions } from '../actions/order-list';
import { TGetProfileOrderListActions } from '../actions/profile-order-list';
import { TWSoketActions } from '../actions/wsAction';
import { Action, ActionCreator } from 'redux';
import { ThunkAction } from 'redux-thunk';

export type RootState = ReturnType<typeof store.getState>;

// Типизация всех экшенов приложения
type TApplicationActions = TAppActions 
| TBurgerConstructorActions 
| TGetIngredientsActions
| TForgotPasswordActions
| TLoginActions
| TRecoveryPasswordActions
| TRegisterActions
| TUpdateTokenActions
| TUpdateUserActions
| TGetOrderListActions
| TGetProfileOrderListActions
| TWSoketActions;

export type AppThunk<TReturn = void> = ActionCreator<
  ThunkAction<TReturn, Action, RootState, TApplicationActions>
>; 
export type AppDispatch = typeof store.dispatch; 