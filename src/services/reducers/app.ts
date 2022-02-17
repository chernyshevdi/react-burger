import {TAppActions} from '../actions/app';
import {ADD_MODAL_DATA, DELETE_MODAL_DATA, ADD_MODAL_PROFILE} from '../constants/app';
import {TIngredient, TOrders} from '../types/data';

export type TAppInitialState =  {
  currentIngredient?: TIngredient;
  currentOrder?: TOrders;
}

const initialState: TAppInitialState = {
  currentIngredient: {} as TIngredient,   //объект текущего просматриваемого ингредиента
  currentOrder: {} as TOrders
};

export const appReducer = (state = initialState, action: TAppActions): TAppInitialState => {
  switch (action.type) {
    case ADD_MODAL_DATA: {
      return {
        currentIngredient: action.item,
      };
    }

    case ADD_MODAL_PROFILE: {
      return {
        currentOrder: action.order,
      };
    }

    case DELETE_MODAL_DATA: {
      return {
        ...initialState,
        currentIngredient: {} as TIngredient,
        currentOrder: {} as TOrders
      };
    }

    default: {
      return state;
    }
  }
};
