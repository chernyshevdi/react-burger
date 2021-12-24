import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAILED
} from '../actions/login';
import {
    LOGOUT_REQUEST,
    LOGOUT_SUCCESS,
    LOGOUT_FAILED
} from '../actions/logout';

import {
    GET_USER_REQUEST,
    GET_USER_SUCCESS,
    GET_USER_FAILED
} from '../actions/get-user';

const initialState = {
    loginData: {}, //объект ответа от сервера
    loginRequest: false, // состояние во время вызова
    loginFailed: false, // состояние при отказе

    logoutData: {}, //объект ответа от сервера
    logoutRequest: false, // состояние во время вызова
    logoutFailed: false, // состояние при отказе
    login: false,

    userData: {}, 
    userRequest: false, // состояние во время вызова
    userFailed: false, // состояние при отказе
    status: {},
}

export const loginReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_REQUEST: {
            return {
                ...state,
                loginRequest: true,
            }
        }
        
        case LOGIN_SUCCESS: {
            return {
                ...state,
                loginRequest: false,
                loginFailed: false,
                loginData: action.loginData,
                login: true
            }
        }
        
        case LOGIN_FAILED: {
            return {
                ...initialState,
                loginRequest: false,
                loginFailed: true,
            }
        }

        case LOGOUT_REQUEST: {
            return {
                ...state,
                logoutRequest: true
            }
        }
        
        case LOGOUT_SUCCESS: {
            return {
                ...state,
                logoutRequest: false,
                logoutFailed: false,
                logoutData: action.logoutData,
                login: false
            }
        }
        
        case LOGOUT_FAILED: {
            return {
                ...initialState,
                logoutRequest: false,
                logoutFailed: true,

            }
        }

        case GET_USER_REQUEST: {
            return {
                ...state,
                userRequest: true
            }
        }
        
        case GET_USER_SUCCESS: {
            return {
                ...state,
                userRequest: false,
                userFailed: false,
                userData: action.userData,
                login: true,
            }
        }
        
        case GET_USER_FAILED: {
            return {
                ...initialState,
                userRequest: false,
                userFailed: true,
                status: action.status,
            }
        }

        default: {
            return state;
          }
    }
}