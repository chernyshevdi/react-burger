import {TRegisterActions} from "../actions/register";
import {REGISTER_REQUEST, REGISTER_SUCCESS, REGISTER_FAILED} from '../constants/register';
import {TAuth} from '../types/data';

export type TRegisterState = {
  registerData: TAuth; 
  registerRequest: boolean;
  registerFailed: boolean;
}

const initialState: TRegisterState = {
  registerData: {} as TAuth, //объект ответа от сервера
  registerRequest: false, // состояние во время вызова
  registerFailed: false, // состояние при отказе
};

export const registerReducer = (state = initialState, action: TRegisterActions): TRegisterState => {
  switch (action.type) {
    case REGISTER_REQUEST: {
      return {
        ...state,
        registerRequest: true,
      };
    }

    case REGISTER_SUCCESS: {
      return {
        ...state,
        registerRequest: false,
        registerFailed: false,
        registerData: action.registerData,
      };
    }

    case REGISTER_FAILED: {
      return {
        ...initialState,
        registerRequest: false,
        registerFailed: true,
      };
    }

    default: {
      return state;
    }
  }
};
