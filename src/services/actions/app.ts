import {ADD_MODAL_DATA, DELETE_MODAL_DATA, ADD_MODAL_PROFILE} from '../constants/app';
import {TIngredient, TOrders} from '../types/data';

export interface IAddModalData {
    readonly type: typeof ADD_MODAL_DATA;
    readonly item?: TIngredient;
}

export interface IDeleteModalData {
    readonly type: typeof DELETE_MODAL_DATA;
}

export interface IAddModalProfile {
    readonly type: typeof ADD_MODAL_PROFILE;
    readonly order?: TOrders;
}

export type TAppActions =
| IAddModalData
|IAddModalProfile
| IDeleteModalData;

export const AddModalDataAction = (item?: TIngredient): IAddModalData => ({
    type: ADD_MODAL_DATA,
    item
});

export const AddModalProfileAction = (order?: TOrders): IAddModalProfile => ({
    type: ADD_MODAL_PROFILE,
    order
});

export const DeleteModalDataAction = (): IDeleteModalData => ({
    type: DELETE_MODAL_DATA
  });