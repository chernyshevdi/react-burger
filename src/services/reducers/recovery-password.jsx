import {
    RECOVERY_PASSWORD_REQUEST,
    RECOVERY_PASSWORD_SUCCESS,
    RECOVERY_PASSWORD_FAILED
} from '../actions/recovery-password';

const initialState = {
    recoveryPassword: {}, //объект ответа от сервера
    recoveryPasswordRequest: false, // состояние во время вызова
    recoveryPasswordFailed: false, // состояние при отказе
}

export const recoveryPasswordReducer = (state = initialState, action) => {
    switch (action.type) {
        case RECOVERY_PASSWORD_REQUEST: {
            return {
                ...state,
                recoveryPasswordRequest: true
            }
        }
        
        case RECOVERY_PASSWORD_SUCCESS: {
            return {
                ...state,
                recoveryPasswordRequest: false,
                recoveryPasswordFailed: false,
                recoveryPassword: action.recoveryPassword
            }
        }
        
        case RECOVERY_PASSWORD_FAILED: {
            return {
                ...initialState,
                recoveryPasswordRequest: false,
                recoveryPasswordFailed: true,
            }
        }

        default: {
            return state;
          }
    }
}