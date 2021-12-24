import {
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  GET_USER_FAILED,
} from "../actions/get-user";

const initialState = {
  userData: {},
  userRequest: false, // состояние во время вызова
  userFailed: false, // состояние при отказе
  status: {},
  loggedIn: false,
};

export const getUserReducer = (state = initialState, action) => {
  switch (action.type) {
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
        loggedIn: true,
      };
    }

    case GET_USER_FAILED: {
      return {
        ...initialState,
        userRequest: false,
        userFailed: true,
        status: action.status,
        loggedIn: false,
      };
    }

    default: {
      return state;
    }
  }
};
