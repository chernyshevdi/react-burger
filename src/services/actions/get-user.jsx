import { getUser } from '../../utils/api'; 

export const GET_USER_REQUEST = 'GET_USER_REQUEST';
export const GET_USER_SUCCESS = 'GET_USER_SUCCESS';
export const GET_USER_FAILED = 'GET_USER_FAILED';

export function getUserData(token) {

    return function(dispatch) {
        dispatch({
            type: GET_USER_REQUEST
        });
        getUser(token)
        .then((res) => {
            if(res.success) {
                dispatch({
                    type: GET_USER_SUCCESS,
                    userData: res
                })
            }
            else {
                dispatch({
                    type: GET_USER_FAILED,
                    status: res
                })
            }
        })
        .catch((err) => {
            console.log(err)
        })
    }
}