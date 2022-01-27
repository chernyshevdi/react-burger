/*import {
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  LOGOUT_FAILED,
} from "../actions/logout";

const initialState = {
  logoutData: {}, //объект ответа от сервера
  logoutRequest: false, // состояние во время вызова
  logoutFailed: false, // состояние при отказе
};

export const logoutReducer = (state = initialState, action) => {
  switch (action.type) {
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
      };
    }

    case LOGOUT_FAILED: {
      return {
        ...initialState,
        logoutRequest: false,
        logoutFailed: true,
      };
    }

    default: {
      return state;
    }
  }
};
*/