import {TRecoveryPasswordActions} from "../actions/recovery-password";
import {RECOVERY_PASSWORD_REQUEST, RECOVERY_PASSWORD_SUCCESS, RECOVERY_PASSWORD_FAILED}
from '../constants/recovery-password';
import {TForgotPassword} from '../types/data';

export type TRecoveryPassworState = {
  recoveryPassword: TForgotPassword;
  recoveryPasswordRequest: boolean;
  recoveryPasswordFailed: boolean;
}

const initialState: TRecoveryPassworState = {
  recoveryPassword: {} as TForgotPassword, //объект ответа от сервера
  recoveryPasswordRequest: false, // состояние во время вызова
  recoveryPasswordFailed: false, // состояние при отказе
};

export const recoveryPasswordReducer = (state = initialState, action: TRecoveryPasswordActions): TRecoveryPassworState => {
  switch (action.type) {
    case RECOVERY_PASSWORD_REQUEST: {
      return {
        ...state,
        recoveryPasswordRequest: true,
      };
    }

    case RECOVERY_PASSWORD_SUCCESS: {
      return {
        ...state,
        recoveryPasswordRequest: false,
        recoveryPasswordFailed: false,
        recoveryPassword: action.recoveryPassword,
      };
    }

    case RECOVERY_PASSWORD_FAILED: {
      return {
        ...initialState,
        recoveryPasswordRequest: false,
        recoveryPasswordFailed: true,
      };
    }

    default: {
      return state;
    }
  }
};
