import { updateUser } from "../../utils/api";

import {UPDATE_USER_REQUEST, UPDATE_USER_SUCCESS, UPDATE_USER_FAILED}
from '../constants/update-user';

import { AppDispatch, AppThunk } from '../types';
import {TUserData, TForgotPassword} from '../types/data';

export interface IUpdateUserRequest {
  readonly type: typeof UPDATE_USER_REQUEST;
}

export interface IUpdateUserSuccess {
  readonly type: typeof UPDATE_USER_SUCCESS;
  readonly updateUser: TUserData;
}

export interface IUpdateUserFailed {
  readonly type: typeof UPDATE_USER_FAILED;
  readonly updatestatus: TForgotPassword;
}

export type TUpdateUserActions =
| IUpdateUserRequest
| IUpdateUserSuccess
| IUpdateUserFailed;

export const UpdateUserRequestAction = (): IUpdateUserRequest => ({
  type: UPDATE_USER_REQUEST
});

export const UpdateUserSuccessAction = (updateUser: TUserData): IUpdateUserSuccess => ({
  type: UPDATE_USER_SUCCESS,
  updateUser
});

export const UpdateUserFailedAction = (updatestatus: TForgotPassword): IUpdateUserFailed => ({
  type: UPDATE_USER_FAILED,
  updatestatus
});

export const updateUserData: AppThunk = (token: string, email: string, password: string, name: string) => {
  return function (dispatch: AppDispatch) {
    dispatch(UpdateUserRequestAction());
    updateUser(token, email, password, name)
      .then((res) => {
        if (res.success) {
          dispatch(UpdateUserSuccessAction(res));
        } else {
          dispatch(UpdateUserFailedAction(res));
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
}
