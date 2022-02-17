import {TUpdateTokenActions} from "../actions/update-token";
import {UPDATE_TOKEN_REQUEST, UPDATE_TOKEN_SUCCESS, UPDATE_TOKEN_FAILED}
from '../constants/update-token';

export type TUpdateTokenState = {
  updateTokenData: {};
  updateTokenRequest: boolean;
  updateTokenFailed: boolean;
  updateTokenSuccess: boolean;
}

const initialState: TUpdateTokenState = {
  updateTokenData: {}, //объект ответа от сервера
  updateTokenRequest: false, // состояние во время вызова
  updateTokenFailed: false, // состояние при отказе
  updateTokenSuccess: false
};

export const updateTokenReducer = (state = initialState, action: TUpdateTokenActions): TUpdateTokenState => {
  switch (action.type) {
    case UPDATE_TOKEN_REQUEST: {
      return {
        ...state,
        updateTokenRequest: true,
      };
    }

    case UPDATE_TOKEN_SUCCESS: {
      return {
        ...state,
        updateTokenRequest: false,
        updateTokenFailed: false,
        updateTokenData: action.updateTokenData,
        updateTokenSuccess: true
      };
    }

    case UPDATE_TOKEN_FAILED: {
      return {
        ...initialState,
        updateTokenRequest: false,
        updateTokenFailed: true,
      };
    }

    default: {
      return state;
    }
  }
};
