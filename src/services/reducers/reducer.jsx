






/*
//начальное состояние хранилища
const initialState = {
    ingredients: [], //список всех полученных ингредиентов
    ingredientsInBurgerConstructor: {bun:[], other:[]}, //список всех ингредиентов в текущем конструкторе бургера
    currentIngredient: {}, //объект текущего просматриваемого ингредиента
    createdOrder: {}, //объект созданного заказа
    ingredientsRequest: false, // состояние во время вызова
    ingredientsFailed: false, // состояние при отказе
    orderRequest: false, // состояние во время вызова
    orderFailed: false, // состояние при отказе
}

//редьюсер ингредиентов
export const ingredientsReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_INGREDIENTS_REQUEST: {
            return {
                ...state,
                ingredientsRequest: true
            }
        }

        case GET_INGREDIENTS_SUCCESS: {
            return {
                ...state,
                ingredientsFailed: false,
                ingredientsRequest: false,
                ingredients: action.ingredients
            }
        }

        case GET_INGREDIENTS_FAILED: {
            return {
                ...state,
                ingredientsFailed: true,
                ingredientsRequest: false
            }
        }

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

*/