import { order } from '../../utils/api'; //вызов данных из апи

export const ADD_INGREDIENT_BURGERCONSTRUCTOR = 'ADD_INGREDIENT_BURGERCONSTRUCTOR';
export const DELETE_INGREDIENT_BURGERCONSTRUCTOR = 'DELETE_INGREDIENT_BURGERCONSTRUCTOR';
export const CHANGE_ORDER_BURGERCONSTRUCTOR = 'CHANGE_ORDER_BURGERCONSTRUCTOR';
export const GET_ORDER_REQUEST = 'GET_ORDER_REQUEST';
export const GET_ORDER_SUCCESS = 'GET_ORDER_SUCCESS';
export const GET_ORDER_FAILED = 'GET_ORDER_FAILED';

export function postOrder(id) {
    return function(dispatch) {
        dispatch({
            type: GET_ORDER_REQUEST
        });
        order(id)
        .then((res) => {
            if(res.success) {
                dispatch({
                    type: GET_ORDER_SUCCESS,
                    createdOrder: res.order
                })
            }
            else {
                dispatch({
                    type: GET_ORDER_FAILED,
                })
            }
        })
        .catch((err) => {
            console.log(err)
        })
    }
}