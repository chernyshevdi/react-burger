import { order } from "../../utils/api"; //вызов данных из апи

import {ADD_INGREDIENT_BURGERCONSTRUCTOR, DELETE_INGREDIENT_BURGERCONSTRUCTOR,
  CHANGE_ORDER_BURGERCONSTRUCTOR, GET_ORDER_REQUEST, GET_ORDER_SUCCESS, GET_ORDER_FAILED}
  from '../constants/burger-constructor';

import { AppDispatch, AppThunk } from '../types';
import {TIngredient, TOrder} from '../types/data';

export interface IAddIngredientConstructor {
  readonly type: typeof ADD_INGREDIENT_BURGERCONSTRUCTOR;
  readonly item: TIngredient
}

export interface IDeleteIngredientConstructor {
  readonly type: typeof DELETE_INGREDIENT_BURGERCONSTRUCTOR;
  readonly id: string;
}

export interface IChangeIngredientConstructor {
  readonly type: typeof CHANGE_ORDER_BURGERCONSTRUCTOR;
  readonly item: ReadonlyArray<TIngredient>;
  readonly dragIndex: number;
  readonly hoverIndex: number;
}

export interface IGetOrderRequest {
  readonly type: typeof GET_ORDER_REQUEST;
}

export interface IGetOrderSuccess {
  readonly type: typeof GET_ORDER_SUCCESS;
  readonly createdOrder: TOrder;
}

export interface IGetOrderFailed {
  readonly type: typeof GET_ORDER_FAILED;
}

export type TBurgerConstructorActions =
| IAddIngredientConstructor
| IDeleteIngredientConstructor
| IChangeIngredientConstructor
| IGetOrderRequest
| IGetOrderSuccess
|IGetOrderFailed;

export const AddIngredientConstructorAction = (item: TIngredient): IAddIngredientConstructor => ({
  type: ADD_INGREDIENT_BURGERCONSTRUCTOR,
  item
});

export const DeleteIngredientConstructorAction = (id: string): IDeleteIngredientConstructor => ({
  type: DELETE_INGREDIENT_BURGERCONSTRUCTOR,
  id
});

export const ChangeIngredientConstructorAction = (item: ReadonlyArray<TIngredient>, dragIndex: number, hoverIndex: number): IChangeIngredientConstructor => ({
  type: CHANGE_ORDER_BURGERCONSTRUCTOR,
  item,
  dragIndex,
  hoverIndex
});

export const GetOrderRequestAction = (): IGetOrderRequest => ({
  type: GET_ORDER_REQUEST
});

export const GetOrderSuccessAction = (createdOrder: {number: number;}): IGetOrderSuccess => ({
  type: GET_ORDER_SUCCESS,
  createdOrder
});

export const GetOrderFailedAction = (): IGetOrderFailed => ({
  type: GET_ORDER_FAILED
});

export const postOrder: AppThunk = (id: string) => {
  return function (dispatch: AppDispatch) {
    dispatch(GetOrderRequestAction());
    order(id)
      .then((res) => {
        if (res.success) {
          dispatch(GetOrderSuccessAction(res.order));
        } else {
          dispatch(GetOrderFailedAction());
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
} 
