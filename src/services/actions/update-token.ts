import { updateToken } from "../../utils/api";

import {UPDATE_TOKEN_REQUEST, UPDATE_TOKEN_SUCCESS, UPDATE_TOKEN_FAILED}
from '../constants/update-token';

import { AppDispatch, AppThunk } from '../types';
import {TUpdateToken} from '../types/data';

export interface IUpdateTokenRequest {
  readonly type: typeof UPDATE_TOKEN_REQUEST;
}

export interface IUpdateTokenSuccess {
  readonly type: typeof UPDATE_TOKEN_SUCCESS;
  readonly updateTokenData: TUpdateToken;
}

export interface IUpdateTokenFailed {
  readonly type: typeof UPDATE_TOKEN_FAILED;
}

export type TUpdateTokenActions =
| IUpdateTokenRequest
| IUpdateTokenSuccess
| IUpdateTokenFailed;

export const UpdateTokenRequestAction = (): IUpdateTokenRequest => ({
  type: UPDATE_TOKEN_REQUEST
});

export const UpdateTokenSuccessAction = (updateTokenData: TUpdateToken): IUpdateTokenSuccess => ({
  type: UPDATE_TOKEN_SUCCESS,
  updateTokenData
});

export const UpdateTokenFailedAction = (): IUpdateTokenFailed => ({
  type: UPDATE_TOKEN_FAILED
});

export const postUpdateToken: AppThunk = (token: string) => {
  return function (dispatch: AppDispatch) {
    dispatch(UpdateTokenRequestAction());
    updateToken(token)
      .then((res) => {
        if (res.success) {
          localStorage.setItem("access", res.accessToken);
          localStorage.setItem("refresh", res.refreshToken);
          dispatch(UpdateTokenSuccessAction(res));
        } else {
          dispatch(UpdateTokenFailedAction());
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
}
