//import { getOrderList } from "../../utils/api";
import {GET_ORDERLIST_REQUEST, GET_ORDERLIST_SUCCESS, GET_ORDERLIST_FAILED}
  from '../constants/order-list';
import { AppDispatch, AppThunk } from '../types';
import {TOrderList} from '../types/data';

export interface IGetOrderListRequest {
  readonly type: typeof GET_ORDERLIST_REQUEST;
}

export interface IGetOrderListSuccess {
    readonly type: typeof GET_ORDERLIST_SUCCESS,
    readonly orderList: TOrderList 
}

export interface IGetOrderListFailed {
    readonly type: typeof GET_ORDERLIST_FAILED;
}

export type TGetOrderListActions =
| IGetOrderListRequest
| IGetOrderListSuccess
| IGetOrderListFailed;

export const GetOrderListRequestAction = (): IGetOrderListRequest => ({
    type: GET_ORDERLIST_REQUEST
  });
  
  export const GetOrderListSuccesAction = (orderList: TOrderList): IGetOrderListSuccess => ({
    type: GET_ORDERLIST_SUCCESS,
    orderList
  });
  
  export const GetOrderListFailedAction = (): IGetOrderListFailed => ({
    type: GET_ORDERLIST_FAILED
  });
/*
  export const getOrders: AppThunk = () => 
  (dispatch: AppDispatch) => {
   dispatch(GetOrderListRequestAction());
   getOrderList()
     .then((res) => {
       if (res.success) {
         dispatch(GetOrderListSuccesAction(res));
       } else {
         dispatch(GetOrderListFailedAction());
       }
     })
     .catch((err) => {
       dispatch(GetOrderListFailedAction());
       console.log(err);
     });
 };
*/