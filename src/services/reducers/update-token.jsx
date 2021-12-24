import {
    UPDATE_TOKEN_REQUEST,
    UPDATE_TOKEN_SUCCESS,
    UPDATE_TOKEN_FAILED
} from '../actions/update-token';

const initialState = {
    updateTokenData: {}, //объект ответа от сервера
    updateTokenRequest: false, // состояние во время вызова
    updateTokenFailed: false, // состояние при отказе
}

export const updateTokenReducer = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_TOKEN_REQUEST: {
            return {
                ...state,
                updateTokenRequest: true
            }
        }
        
        case UPDATE_TOKEN_SUCCESS: {
            return {
                ...state,
                updateTokenRequest: false,
                updateTokenFailed: false,
                updateTokenData: action.updateTokenData
            }
        }
        
        case UPDATE_TOKEN_FAILED: {
            return {
                ...initialState,
                updateTokenRequest: false,
                updateTokenFailed: true,
            }
        }

        default: {
            return state;
          }
    }
}