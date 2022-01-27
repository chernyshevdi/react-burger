import {ADD_MODAL_DATA, DELETE_MODAL_DATA} from '../constants/app';
import {TIngredient} from '../types/data';

export interface IAddModalData {
    readonly type: typeof ADD_MODAL_DATA;
    readonly item: TIngredient;
}

export interface IDeleteModalData {
    readonly type: typeof DELETE_MODAL_DATA;
}

export type TAppActions =
| IAddModalData
| IDeleteModalData;

export const AddModalDataAction = (item: TIngredient): IAddModalData => ({
    type: ADD_MODAL_DATA,
    item
});

export const DeleteModalDataAction = (): IDeleteModalData => ({
    type: DELETE_MODAL_DATA
  });