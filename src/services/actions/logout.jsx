import { logout } from '../../utils/api'; 


export const LOGOUT_REQUEST = 'LOGOUT_REQUEST';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOGOUT_FAILED = 'LOGOUT_FAILED';

export function postLogout(token) {

    return function(dispatch) {
        dispatch({
            type: LOGOUT_REQUEST
        });
        logout(token)
        .then((res) => {
            if(res.success) {
                localStorage.removeItem('access');
                localStorage.removeItem('refresh');
                dispatch({
                    type: LOGOUT_SUCCESS,
                    logoutData: res //передаем результат пост запроса
                })
            }
            else {
                dispatch({
                    type: LOGOUT_FAILED,
                })
            }
        })
        .catch((err) => {
            console.log(err)
        })
    }
}