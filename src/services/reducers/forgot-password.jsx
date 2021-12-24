import {
    FORGOT_PASSWORD_REQUEST,
    FORGOT_PASSWORD_SUCCESS,
    FORGOT_PASSWORD_FAILED
} from '../actions/forgot-password';

const initialState = {
    forgotPassword: {}, //объект ответа от сервера
    forgotPasswordRequest: false, // состояние во время вызова
    forgotPasswordFailed: false, // состояние при отказе
}

export const forgotPasswordReducer = (state = initialState, action) => {
    switch (action.type) {
        case FORGOT_PASSWORD_REQUEST: {
            return {
                ...state,
                forgotPasswordRequest: true
            }
        }
        
        case FORGOT_PASSWORD_SUCCESS: {
            return {
                ...state,
                forgotPasswordRequest: false,
                forgotPasswordFailed: false,
                forgotPassword: action.forgotPassword
            }
        }
        
        case FORGOT_PASSWORD_FAILED: {
            return {
                ...initialState,
                forgotPasswordRequest: false,
                forgotPasswordFailed: true,
            }
        }

        default: {
            return state;
          }
    }
}