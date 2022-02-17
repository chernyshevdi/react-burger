import {TGetProfileOrderListActions} from "../actions/profile-order-list";
import {GET_PROFILE_ORDERLIST_REQUEST, GET_PROFILE_ORDERLIST_SUCCESS, GET_PROFILE_ORDERLIST_FAILED}
  from '../constants/profile-order-list';

  const initialState = {
    profileOrderList: {}, //список всех полученных ингредиентов
    profileOrderRequest: false, // состояние во время вызова
    profileOrderFailed: false, // состояние при отказе
};

export const profileOrderListReducer = (state = initialState, action: TGetProfileOrderListActions) => {
    switch (action.type) {
        case GET_PROFILE_ORDERLIST_REQUEST: {
            return {
                ...state,
                profileOrderRequest: true,
            };
        }
        case GET_PROFILE_ORDERLIST_SUCCESS: {
            return {
                ...state,
                profileOrderRequest: false,
                profileOrderFailed: false,
                orderList: action.profileOrderList,
            };
        }
        case GET_PROFILE_ORDERLIST_FAILED: {
            return {
                ...state,
                profileOrderFailed: true,
            };
        }
        default: {
            return state;
          }
    }
}
