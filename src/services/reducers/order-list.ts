import {TGetOrderListActions} from "../actions/order-list";
import {GET_ORDERLIST_REQUEST, GET_ORDERLIST_SUCCESS, GET_ORDERLIST_FAILED}
  from '../constants/order-list';
  import {TOrderList} from '../types/data';

  export type TOrderListState = {
    orderList: TOrderList;
    orderListRequest: boolean;
    orderListFailed: boolean; 
  }

const initialState: TOrderListState = {
    orderList: {} as TOrderList, //список всех полученных ингредиентов
    orderListRequest: false, // состояние во время вызова
    orderListFailed: false, // состояние при отказе
};

export const orderListReducer = (state = initialState, action: TGetOrderListActions) => {
    switch (action.type) {
        case GET_ORDERLIST_REQUEST: {
            return {
                ...state,
                orderListRequest: true,
            };
        }
        case GET_ORDERLIST_SUCCESS: {
            return {
                ...state,
                orderListRequest: false,
                orderListFailed: false,
                orderList: action.orderList,
            };
        }
        case GET_ORDERLIST_FAILED: {
            return {
                ...state,
                orderListFailed: true,
            };
        }
        default: {
            return state;
          }
    }
}