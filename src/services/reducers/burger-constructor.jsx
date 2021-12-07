import {
    GET_ORDER_REQUEST,
    GET_ORDER_SUCCESS,
    GET_ORDER_FAILED,
    GET_BURGERCONSTRUCTOR_DATA, 
    DELETE_BURGERCONSTRUCTOR_DATA, 
    UPDATE_BURGERCONSTRUCTOR_DATA 
} from '../actions/burger-constructor';

const initialState = {
    ingredientsInBurgerConstructor: {bun:[], other:[]}, //список всех ингредиентов в текущем конструкторе бургера
    createdOrder: {}, //объект созданного заказа
    orderRequest: false, // состояние во время вызова
    orderFailed: false, // состояние при отказе
}

export const constructorReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ORDER_REQUEST: {
            return {
                ...state,
                orderRequest: true
            }
        }
        
        case GET_ORDER_SUCCESS: {
            return {
                ...state,
                orderRequest: false,
                orderFailed: false,
                createdOrder: action.createdOrder
            }
        }
        
        case GET_ORDER_FAILED: {
            return {
                ...state,
                orderRequest: false,
                orderFailed: true,
            }
        }

        case  GET_BURGERCONSTRUCTOR_DATA: {
            return {
                ...state,
                ingredientsInBurgerConstructor: action.item.type === 'bun' ?  {
                     bun: [action.item],
                     other:[...state.ingredientsInBurgerConstructor.other]
                } 
                :  {
                    bun: [...state.ingredientsInBurgerConstructor.bun],
                    other:[...state.ingredientsInBurgerConstructor.other, action.item]
                } 
            }
        }

        case UPDATE_BURGERCONSTRUCTOR_DATA: {
            return {
                ...state,
                ingredientsInBurgerConstructor: {
                    bun: [...state.ingredientsInBurgerConstructor.bun],
                    other: action.item
                }
            }
        }

        case DELETE_BURGERCONSTRUCTOR_DATA: { 
            return {
                ...state,
                ingredientsInBurgerConstructor: {
                    bun: [...state.ingredientsInBurgerConstructor.bun],
                    other:[...state.ingredientsInBurgerConstructor.other.filter((item, index) => item._id + index  !== action.id ) ]
                }
            }
        }

        default: {
            return state;
          }
    }
}