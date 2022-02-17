import {TUpdateUserActions} from "../actions/update-user";
import {UPDATE_USER_REQUEST, UPDATE_USER_SUCCESS, UPDATE_USER_FAILED}
from '../constants/update-user';
import {TUserData} from '../types/data';

export type TUpdateUserState = {
  updateUser: TUserData; 
  updateUserRequest: boolean;
  updateUserFailed: boolean;
  updatestatus: {},
}

const initialState: TUpdateUserState = {
  updateUser: {} as TUserData, //объект ответа от сервера
  updateUserRequest: false, // состояние во время вызова
  updateUserFailed: false, // состояние при отказе
  updatestatus: {},
};

export const updateUserReducer = (state = initialState, action: TUpdateUserActions): TUpdateUserState => {
  switch (action.type) {
    case UPDATE_USER_REQUEST: {
      return {
        ...state,
        updateUserRequest: true,
      };
    }

    case UPDATE_USER_SUCCESS: {
      return {
        ...state,
        updateUserRequest: false,
        updateUserFailed: false,
        updateUser: action.updateUser,
      };
    }

    case UPDATE_USER_FAILED: {
      return {
        ...initialState,
        updateUserRequest: false,
        updateUserFailed: true,
        updatestatus: action.updatestatus,
      };
    }

    default: {
      return state;
    }
  }
};
