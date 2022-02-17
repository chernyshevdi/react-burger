import { forgotPassword } from "../../utils/api";

import {FORGOT_PASSWORD_REQUEST, FORGOT_PASSWORD_SUCCESS, FORGOT_PASSWORD_FAILED}
  from '../constants/forgot-password';

import { AppDispatch, AppThunk } from '../types';
import {TForgotPassword} from '../types/data';

export interface IForgotPasswordRequest {
  readonly type: typeof FORGOT_PASSWORD_REQUEST;
}

export interface IForgotPasswordSuccess {
  readonly type: typeof FORGOT_PASSWORD_SUCCESS;
  readonly forgotPassword: TForgotPassword;
}

export interface IForgotPasswordFailed {
  readonly type: typeof FORGOT_PASSWORD_FAILED;
}

export type TForgotPasswordActions =
| IForgotPasswordRequest
| IForgotPasswordSuccess
| IForgotPasswordFailed;

export const ForgotPasswordRequestAction = (): IForgotPasswordRequest => ({
  type: FORGOT_PASSWORD_REQUEST
});

export const ForgotPasswordSuccessAction = (forgotPassword: TForgotPassword): IForgotPasswordSuccess => ({
  type: FORGOT_PASSWORD_SUCCESS,
  forgotPassword
});

export const ForgotPasswordFailedAction = (): IForgotPasswordFailed => ({
  type: FORGOT_PASSWORD_FAILED
});

export const postForgotPassword: AppThunk = (email: string) => {
  return function (dispatch: AppDispatch) {
    dispatch(ForgotPasswordRequestAction());
    forgotPassword(email)
      .then((res) => {
        if (res.success) {
          dispatch(ForgotPasswordSuccessAction(res));
        } else {
          dispatch(ForgotPasswordFailedAction());
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
}
