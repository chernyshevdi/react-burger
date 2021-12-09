import { order } from '../../utils/api'; //вызов данных из апи

export const GET_BURGERCONSTRUCTOR_DATA = 'GET_BURGERCONSTRUCTOR_DATA';
export const DELETE_BURGERCONSTRUCTOR_DATA = 'DELETE_BURGERCONSTRUCTOR_DATA';
export const UPDATE_BURGERCONSTRUCTOR_DATA = 'UPDATE_BURGERCONSTRUCTOR_DATA';
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