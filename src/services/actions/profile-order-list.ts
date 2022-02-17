
import {GET_PROFILE_ORDERLIST_REQUEST, GET_PROFILE_ORDERLIST_SUCCESS, GET_PROFILE_ORDERLIST_FAILED}
  from '../constants/profile-order-list';
import { AppDispatch, AppThunk } from '../types';

export interface IGetProfileOrderListRequest {
    readonly type: typeof GET_PROFILE_ORDERLIST_REQUEST;
  }
  
  export interface IGetProfileOrderListSuccess {
      readonly type: typeof GET_PROFILE_ORDERLIST_SUCCESS,
      readonly profileOrderList: {} //TOrderList 
  }
  
  export interface IGetProfileOrderListFailed {
      readonly type: typeof GET_PROFILE_ORDERLIST_FAILED;
  }

  export type TGetProfileOrderListActions =
| IGetProfileOrderListRequest
| IGetProfileOrderListSuccess
| IGetProfileOrderListFailed;

export const GetProfileOrderListRequestAction = (): IGetProfileOrderListRequest => ({
    type: GET_PROFILE_ORDERLIST_REQUEST
  });
  
export const GetProfileOrderListSuccesAction = (profileOrderList: {}): IGetProfileOrderListSuccess => ({
    type: GET_PROFILE_ORDERLIST_SUCCESS,
    profileOrderList
});
  
export const GetProfileOrderListFailedAction = (): IGetProfileOrderListFailed => ({
    type: GET_PROFILE_ORDERLIST_FAILED
});
