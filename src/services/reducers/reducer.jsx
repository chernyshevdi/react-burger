import { getIngredients } from '../../utils/api'; //вызов данных из апи

const GET_INGREDIENTS_REQUEST = 'GET_INGREDIENTS_REQUEST';
const GET_INGREDIENTS_SUCCESS = 'GET_INGREDIENTS_SUCCESS';
const GET_INGREDIENTS_FAILED = 'GET_INGREDIENTS_FAILED';

//начальное состояние хранилища
const initialState = {
    ingredients: [], //список всех полученных ингредиентов
    ingredientsInBurgerConstructor: [], //список всех ингредиентов в текущем конструкторе бургера
    currentIngredient: {}, //объект текущего просматриваемого ингредиента
    createdOrder: {}, //объект созданного заказа
    ingredientsRequest: false, // состояние во время вызова
    ingredientsFailed: false, // состаяние при отказе
}

//усилитель для вывода асинхронных данных из апи
export function getItems() {
    return function (dispatch) {
        dispatch({
            type: GET_INGREDIENTS_REQUEST
        });
        getIngredients()
        .then((res) => {
            if(res) {
                dispatch({
                    type: GET_INGREDIENTS_SUCCESS,
                    ingredients: res.data
                })
            }
            else {
                dispatch({
                    type: GET_INGREDIENTS_FAILED,
                })
            }
        })
    }
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

        default: {
            return state;
          }
    }
}

