import {TAppActions} from '../actions/app';
import {ADD_MODAL_DATA, DELETE_MODAL_DATA} from '../constants/app';
import {TIngredient} from '../types/data';

export type TAppInitialState =  {
  currentIngredient: TIngredient 
}

const initialState: TAppInitialState = {
  currentIngredient: {} as TIngredient //объект текущего просматриваемого ингредиента
};

export const appReducer = (state = initialState, action: TAppActions): TAppInitialState => {
  switch (action.type) {
    case ADD_MODAL_DATA: {
      return {
        currentIngredient: action.item,
      };
    }

    case DELETE_MODAL_DATA: {
      return {
        ...initialState,
        currentIngredient: {} as TIngredient,
      };
    }

    default: {
      return state;
    }
  }
};
