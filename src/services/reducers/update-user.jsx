import {
    UPDATE_USER_REQUEST,
    UPDATE_USER_SUCCESS,
    UPDATE_USER_FAILED
} from '../actions/update-user';

const initialState = {
    updateUser: {}, //объект ответа от сервера
    updateUserRequest: false, // состояние во время вызова
    updateUserFailed: false, // состояние при отказе
    updatestatus: {},
}

export const updateUserReducer = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_USER_REQUEST: {
            return {
                ...state,
                updateUserRequest: true
            }
        }
        
        case UPDATE_USER_SUCCESS: {
            return {
                ...state,
                updateUserRequest: false,
                updateUserFailed: false,
                updateUser: action.updateUser
            }
        }
        
        case UPDATE_USER_FAILED: {
            return {
                ...initialState,
                updateUserRequest: false,
                updateUserFailed: true,
                updatestatus: action.updatestatus
            }
        }

        default: {
            return state;
          }
    }
}