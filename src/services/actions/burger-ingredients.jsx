import { getIngredients } from '../../utils/api'; //вызов данных из апи

export const GET_INGREDIENTS_REQUEST = 'GET_INGREDIENTS_REQUEST';
export const GET_INGREDIENTS_SUCCESS = 'GET_INGREDIENTS_SUCCESS';
export const GET_INGREDIENTS_FAILED = 'GET_INGREDIENTS_FAILED';

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
        .catch((err) => {
            console.log(err)
        })
    }
}