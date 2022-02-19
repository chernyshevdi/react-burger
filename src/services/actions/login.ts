import { login } from "../../utils/api";
import { logout } from '../../utils/api'; 
import { getUser } from "../../utils/api";
import { AppDispatch, AppThunk } from '../types';

import {LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILED, LOGOUT_REQUEST, LOGOUT_SUCCESS, LOGOUT_FAILED, GET_USER_REQUEST, GET_USER_SUCCESS, GET_USER_FAILED} from '../constants/login';
import {TAuth, TUserData} from '../types/data';

export interface ILoginRequest {
  readonly type: typeof LOGIN_REQUEST;
}

export interface ILoginSuccess {
  readonly type: typeof LOGIN_SUCCESS;
  readonly loginData: TAuth;
}

export interface ILoginFailed {
  readonly type: typeof LOGIN_FAILED;
}

export interface ILogoutRequest {
  readonly type: typeof LOGOUT_REQUEST;
}

export interface ILogoutSuccess {
  readonly type: typeof LOGOUT_SUCCESS;
  readonly logoutData: {
    message: string;
    success: boolean} 
}

export interface ILogoutFailed {
  readonly type: typeof LOGOUT_FAILED;
}

export interface IGetUserRequest {
  readonly type: typeof GET_USER_REQUEST;
}

export interface IGetUserSuccess {
  readonly type: typeof GET_USER_SUCCESS;
  readonly userData: TUserData
}

export interface IGetUserFailed {
  readonly type: typeof GET_USER_FAILED;
  readonly status: {} //!!
}

export type TLoginActions =
| ILoginRequest
| ILoginSuccess
| ILoginFailed
| ILogoutRequest
| ILogoutSuccess
| ILogoutFailed
| IGetUserRequest
| IGetUserSuccess
| IGetUserFailed;

export const LoginRequestAction = (): ILoginRequest => ({
  type: LOGIN_REQUEST,
});

export const LoginSuccessAction = (loginData: TAuth): ILoginSuccess => ({
  type: LOGIN_SUCCESS,
  loginData,
});

export const LoginFailedAction = (): ILoginFailed => ({
  type: LOGIN_FAILED,
});

export const LogoutRequestAction = (): ILogoutRequest => ({
  type: LOGOUT_REQUEST
});

export const LogoutSuccessAction = (logoutData: {message: string, success: boolean}): ILogoutSuccess => ({
  type: LOGOUT_SUCCESS,
  logoutData
});

export const LogoutFailedAction = (): ILogoutFailed => ({
  type: LOGOUT_FAILED
});

export const GetUserRequestAction = (): IGetUserRequest => ({
  type: GET_USER_REQUEST
});

export const GetUserSuccessAction = (userData: TUserData): IGetUserSuccess => ({
  type: GET_USER_SUCCESS,
  userData
});

export const GetUserFailedAction = (status: {}): IGetUserFailed => ({
  type: GET_USER_FAILED,
  status
});

export const postLogin: AppThunk = (email: string, password: string) => {
  return function (dispatch: AppDispatch) {
    dispatch(LoginRequestAction());
    return login(email, password)
      .then((res) => {
        if (res.success) {
          localStorage.setItem("access", res.accessToken);
          localStorage.setItem("refresh", res.refreshToken);
          dispatch(LoginSuccessAction(res));
        } else {
          dispatch(LoginFailedAction());
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
}

export const postLogout: AppThunk = (token: string) => {
  return function(dispatch: AppDispatch) {
      dispatch(LogoutRequestAction());
      logout(token)
      .then((res) => {
          if(res.success) {
              localStorage.removeItem('access');
              localStorage.removeItem('refresh');
              dispatch(LogoutSuccessAction(res))
          }
          else {
              dispatch(LogoutFailedAction())
          }
      })
      .catch((err) => {
          console.log(err)
      })
  }
}

export const getUserData: AppThunk = (token: string) => {
  return function (dispatch: AppDispatch) {
    dispatch(GetUserRequestAction());
    getUser(token)
      .then((res) => {
        if (res.success) {
          dispatch(GetUserSuccessAction(res));
        } else {
          dispatch(GetUserFailedAction(res));
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
}
