import { 
    ADD_MODAL_DATA,
    DELETE_MODAL_DATA } 
from '../actions/app';

const initialState = {
    currentIngredient: {}, //объект текущего просматриваемого ингредиента
}

export const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_MODAL_DATA: {
            return {
                ...state,
                currentIngredient: action.item,
            }
        }

        case DELETE_MODAL_DATA: {
            return {
                ...state,
                currentIngredient: {}
            }
        }

        default: {
            return state;
          }
    }
}