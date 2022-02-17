import { getIngredients } from "../../utils/api"; //вызов данных из апи

import {GET_INGREDIENTS_REQUEST, GET_INGREDIENTS_SUCCESS, GET_INGREDIENTS_FAILED}
  from '../constants/burger-ingredients';

import { AppDispatch, AppThunk } from '../types';
import {TIngredient} from '../types/data';

export interface IGetIngredientsRequest {
  readonly type: typeof GET_INGREDIENTS_REQUEST;
}

export interface IGetIngredientsSucces {
  readonly type: typeof GET_INGREDIENTS_SUCCESS;
  readonly ingredients: ReadonlyArray<TIngredient>;
}

export interface IGetIngredientsFailed {
  readonly type: typeof GET_INGREDIENTS_FAILED;
}

export type TGetIngredientsActions =
| IGetIngredientsRequest
| IGetIngredientsSucces
| IGetIngredientsFailed;

export const GetIngredientsRequestAction = (): IGetIngredientsRequest => ({
  type: GET_INGREDIENTS_REQUEST
});

export const GetIngredientsSuccesAction = (ingredients: ReadonlyArray<TIngredient>): IGetIngredientsSucces => ({
  type: GET_INGREDIENTS_SUCCESS,
  ingredients
});

export const GetIngredientsFailedAction = (): IGetIngredientsFailed => ({
  type: GET_INGREDIENTS_FAILED
});

//усилитель для вывода асинхронных данных из апи
export const getItems: AppThunk = () => 
   (dispatch: AppDispatch) => {
    dispatch(GetIngredientsRequestAction());
    getIngredients()
      .then((res) => {
        if (res.success) {
          dispatch(GetIngredientsSuccesAction(res.data));
        } else {
          dispatch(GetIngredientsFailedAction());
        }
      })
      .catch((err) => {
        dispatch(GetIngredientsFailedAction());
        console.log(err);
      });
  };

