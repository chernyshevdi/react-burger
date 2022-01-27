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
| TUpdateUserActions;

export type AppThunk<TReturn = void> = ActionCreator<
  ThunkAction<TReturn, Action, RootState, TApplicationActions>
>; 
export type AppDispatch = typeof store.dispatch; 