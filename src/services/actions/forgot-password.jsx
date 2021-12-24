import { forgotPassword } from '../../utils/api'; 

export const FORGOT_PASSWORD_REQUEST = 'FORGOT_PASSWORD_REQUEST';
export const FORGOT_PASSWORD_SUCCESS = 'FORGOT_PASSWORD_SUCCESS';
export const FORGOT_PASSWORD_FAILED = 'FORGOT_PASSWORD_FAILED';

export function postForgotPassword(email) {
    return function(dispatch) {
        dispatch({
            type: FORGOT_PASSWORD_REQUEST
        });
        forgotPassword(email)
        .then((res) => {
            if(res.success) {
                dispatch({
                    type: FORGOT_PASSWORD_SUCCESS,
                    forgotPassword: res //передаем результат пост запроса
                })
            }
            else {
                dispatch({
                    type: FORGOT_PASSWORD_FAILED,
                })
            }
        })
        .catch((err) => {
            console.log(err)
        })
    }
}