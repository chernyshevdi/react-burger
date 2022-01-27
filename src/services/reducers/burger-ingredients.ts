import {TGetIngredientsActions} from "../actions/burger-ingredients";
import {GET_INGREDIENTS_REQUEST, GET_INGREDIENTS_SUCCESS, GET_INGREDIENTS_FAILED} 
from '../constants/burger-ingredients';
import {TIngredient} from '../types/data';

export type TIngredientsState = {
  ingredients: ReadonlyArray<TIngredient>;
  ingredientsRequest: boolean;
  ingredientsFailed: boolean; 
}

const initialState: TIngredientsState = {
  ingredients: [], //список всех полученных ингредиентов
  ingredientsRequest: false, // состояние во время вызова
  ingredientsFailed: false, // состояние при отказе
};

export const ingredientsReducer = (state = initialState, action: TGetIngredientsActions):
 TIngredientsState => {
  switch (action.type) {
    case GET_INGREDIENTS_REQUEST: {
      return {
        ...state,
        ingredientsRequest: true,
      };
    }

    case GET_INGREDIENTS_SUCCESS: {
      return {
        ...state,
        ingredientsFailed: false,
        ingredientsRequest: false,
        ingredients: action.ingredients,
      };
    }

    case GET_INGREDIENTS_FAILED: {
      return {
        ...initialState,
        ingredientsFailed: true,
      };
    }

    default: {
      return state;
    }
  }
};
