import { TBurgerConstructorActions } from "../actions/burger-constructor";
import {ADD_INGREDIENT_BURGERCONSTRUCTOR, DELETE_INGREDIENT_BURGERCONSTRUCTOR,
  CHANGE_ORDER_BURGERCONSTRUCTOR, GET_ORDER_REQUEST, GET_ORDER_SUCCESS, GET_ORDER_FAILED, GET_ORDER_CLOSE}
  from '../constants/burger-constructor';
import update from "immutability-helper";
import {TIngredient, TOrder} from '../types/data';

export type TBurgerConstructorState = {
  ingredientsInBurgerConstructor: { bun: TIngredient[], other: TIngredient[] } 
  createdOrder: TOrder;
  orderRequest: boolean;
  orderFailed: boolean;
}

const initialState: TBurgerConstructorState = {
  ingredientsInBurgerConstructor: { bun: [], other: [] }, //список всех ингредиентов в текущем конструкторе бургера
  createdOrder: {} as TOrder, //объект созданного заказа
  orderRequest: false, // состояние во время вызова
  orderFailed: false, // состояние при отказе
};

export const constructorReducer = (state = initialState, action: TBurgerConstructorActions):
 TBurgerConstructorState => {
  switch (action.type) {
    case GET_ORDER_REQUEST: {
      return {
        ...state,
        orderRequest: true,
      };
    }

    case GET_ORDER_SUCCESS: {
      return {
        ...state,
        orderRequest: false,
        orderFailed: false,
        createdOrder: action.createdOrder,
      };
    }

    case GET_ORDER_FAILED: {
      return {
        ...initialState,
        orderRequest: false,
        orderFailed: true,
      };
    }

    case GET_ORDER_CLOSE: {
      return {
        ...state,
        orderRequest: false,
        orderFailed: false,
        createdOrder: {} as TOrder
      };
    }

    case ADD_INGREDIENT_BURGERCONSTRUCTOR: {
      return {
        ...state,
        ingredientsInBurgerConstructor:
          action.item.type === "bun"
            ? {
                bun: [action.item],
                other: [...state.ingredientsInBurgerConstructor.other],
              }
            : {
                bun: [...state.ingredientsInBurgerConstructor.bun],
                other: [
                  ...state.ingredientsInBurgerConstructor.other,
                  action.item,
                ],
              },
      };
    }

    case CHANGE_ORDER_BURGERCONSTRUCTOR: {
      const deleteElement = update(state.ingredientsInBurgerConstructor.other, {
        $splice: [[action.dragIndex, 1]],
      });
      const newArrayConstructor = update(deleteElement, {
        $splice: [
          [
            action.hoverIndex,
            0,
            state.ingredientsInBurgerConstructor.other[action.dragIndex],
          ],
        ],
      });

      return {
        ...state,

        ingredientsInBurgerConstructor: {
          ...state.ingredientsInBurgerConstructor,
          bun: [...state.ingredientsInBurgerConstructor.bun],
          other: newArrayConstructor,
        },
      };
    }

    case DELETE_INGREDIENT_BURGERCONSTRUCTOR: {
      return {
        ...state,
        ingredientsInBurgerConstructor: {
          bun: [...state.ingredientsInBurgerConstructor.bun],
          other: [
            ...state.ingredientsInBurgerConstructor.other.filter(
              (item: {_id: string}, index) => item._id + index !== action.id
            ),
          ],
        },
      };
    }

    default: {
      return state;
    }
  }
};
