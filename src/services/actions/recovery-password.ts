import { resetPassword } from "../../utils/api";

import {RECOVERY_PASSWORD_REQUEST, RECOVERY_PASSWORD_SUCCESS, RECOVERY_PASSWORD_FAILED}
from '../constants/recovery-password';

import { AppDispatch, AppThunk } from '../types';
import {TForgotPassword} from '../types/data';

export interface IRecoveryPasswordRequest {
  readonly type: typeof RECOVERY_PASSWORD_REQUEST;
}

export interface IRecoveryPasswordSuccess {
  readonly type: typeof RECOVERY_PASSWORD_SUCCESS;
  readonly recoveryPassword: TForgotPassword
}

export interface IRecoveryPasswordFailed {
  readonly type: typeof RECOVERY_PASSWORD_FAILED;
}

export type TRecoveryPasswordActions =
| IRecoveryPasswordRequest
| IRecoveryPasswordSuccess
| IRecoveryPasswordFailed;

export const RecoveryPasswordRequestAction = (): IRecoveryPasswordRequest => ({
  type: RECOVERY_PASSWORD_REQUEST
});

export const RecoveryPasswordSuccessAction = (recoveryPassword: TForgotPassword): IRecoveryPasswordSuccess => ({
  type: RECOVERY_PASSWORD_SUCCESS,
  recoveryPassword
});

export const RecoveryPasswordFailedAction = (): IRecoveryPasswordFailed => ({
  type: RECOVERY_PASSWORD_FAILED
});

export const postRecoveryPassword: AppThunk = (password: string, token: string) => {
  return function (dispatch: AppDispatch) {
    dispatch(RecoveryPasswordRequestAction());
    resetPassword(password, token)
      .then((res) => {
        if (res.success) {
          dispatch(RecoveryPasswordSuccessAction(res));
        } else {
          dispatch(RecoveryPasswordFailedAction());
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
}
