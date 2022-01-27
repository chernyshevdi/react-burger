import { getUser } from "../../utils/api";

import {GET_USER_REQUEST, GET_USER_SUCCESS, GET_USER_FAILED}
from '../constants/get-user';

export interface IGetUserRequest {
  readonly type: typeof GET_USER_REQUEST;
}

export interface IGetUserSuccess {
  readonly type: typeof GET_USER_SUCCESS;
}

export interface IGetUserFailed {
  readonly type: typeof GET_USER_FAILED;
}

export type TGetUserActions =
| IGetUserRequest
| IGetUserSuccess
| IGetUserFailed;

export function getUserData(token: string) {
  return function (dispatch: any) {
    dispatch({
      type: GET_USER_REQUEST,
    });
    getUser(token)
      .then((res) => {
        if (res.success) {
          dispatch({
            type: GET_USER_SUCCESS,
            userData: res,
          });
        } else {
          dispatch({
            type: GET_USER_FAILED,
            status: res,
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
}
