import { register } from "../../utils/api";

import {REGISTER_REQUEST, REGISTER_SUCCESS, REGISTER_FAILED} from '../constants/register';

import { AppDispatch, AppThunk } from '../types';
import {TAuth} from '../types/data';

export interface IRegisterRequest {
  readonly type: typeof REGISTER_REQUEST;
}

export interface IRegisterSuccess {
  readonly type: typeof REGISTER_SUCCESS;
  readonly registerData: TAuth;
}

export interface IRegisterFailed {
  readonly type: typeof REGISTER_FAILED;
}

export type TRegisterActions =
| IRegisterRequest
| IRegisterSuccess
| IRegisterFailed;

export const RegisterRequestAction = (): IRegisterRequest => ({
  type: REGISTER_REQUEST
});

export const RegisterSuccessAction = (registerData: TAuth): IRegisterSuccess => ({
  type: REGISTER_SUCCESS,
  registerData
});

export const RegisterFailedAction = (): IRegisterFailed => ({
  type: REGISTER_FAILED
});

export const postRegister: AppThunk = (email: string, password: string, name: string) => {
  return function (dispatch: AppDispatch) {
    dispatch(RegisterRequestAction());
    register(email, password, name)
      .then((res) => {
        if (res.success) {
          dispatch(RegisterSuccessAction(res));
        } else {
          dispatch(RegisterFailedAction());
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
}
