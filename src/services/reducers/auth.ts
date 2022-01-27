import { TLoginActions } from "../actions/login";
import {LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILED} from '../constants/login';
import {LOGOUT_REQUEST, LOGOUT_SUCCESS, LOGOUT_FAILED} from '../constants/logout';
import {GET_USER_REQUEST, GET_USER_SUCCESS, GET_USER_FAILED} from '../constants/get-user';
import {TAuth, TUserData} from '../types/data';

export type TAuthInitialState = {
  loginData: TAuth; 
  loginRequest: boolean;
  loginFailed: boolean;

  logoutData: {}; 
  logoutRequest: boolean;
  logoutFailed: boolean;
  login: boolean;

  userData: TUserData; 
  userRequest: boolean;
  userFailed: boolean;
  status: {}; 
}

const initialState: TAuthInitialState = {
  loginData: {} as TAuth, //объект ответа от сервера
  loginRequest: false, // состояние во время вызова
  loginFailed: false, // состояние при отказе

  logoutData: {}, //объект ответа от сервера
  logoutRequest: false, // состояние во время вызова
  logoutFailed: false, // состояние при отказе
  login: false,

  userData: {} as TUserData,
  userRequest: false, // состояние во время вызова
  userFailed: false, // состояние при отказе
  status: {},
};

export const loginReducer = (state = initialState, action: TLoginActions): TAuthInitialState => {
  switch (action.type) {
    case LOGIN_REQUEST: {
      return {
        ...state,
        loginRequest: true,
      };
    }

    case LOGIN_SUCCESS: {
      return {
        ...state,
        loginRequest: false,
        loginFailed: false,
        loginData: action.loginData,
        login: true,
      };
    }

    case LOGIN_FAILED: {
      return {
        ...initialState,
        loginRequest: false,
        loginFailed: true,
        login: false,
      };
    }

    case LOGOUT_REQUEST: {
      return {
        ...state,
        logoutRequest: true,
      };
    }

    case LOGOUT_SUCCESS: {
      return {
        ...state,
        logoutRequest: false,
        logoutFailed: false,
        logoutData: action.logoutData,
        login: false,
      };
    }

    case LOGOUT_FAILED: {
      return {
        ...initialState,
        logoutRequest: false,
        logoutFailed: true,
        login: true,
      };
    }

    case GET_USER_REQUEST: {
      return {
        ...state,
        userRequest: true,
      };
    }

    case GET_USER_SUCCESS: {
      return {
        ...state,
        userRequest: false,
        userFailed: false,
        userData: action.userData,
        login: true,
      };
    }

    case GET_USER_FAILED: {
      return {
        ...initialState,
        userRequest: false,
        userFailed: true,
        status: action.status,
      };
    }

    default: {
      return state;
    }
  }
};
