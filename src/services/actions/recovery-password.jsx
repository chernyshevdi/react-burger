import { resetPassword } from '../../utils/api'; 

export const RECOVERY_PASSWORD_REQUEST = 'RECOVERY_PASSWORD_REQUEST';
export const RECOVERY_PASSWORD_SUCCESS = 'RECOVERY_PASSWORD_SUCCESS';
export const RECOVERY_PASSWORD_FAILED = 'RECOVERY_PASSWORD_FAILED';

export function postRecoveryPassword(password, token) {
    return function(dispatch) {
        dispatch({
            type: RECOVERY_PASSWORD_REQUEST
        });
        resetPassword(password, token)
        .then((res) => {
            if(res.success) {
                dispatch({
                    type: RECOVERY_PASSWORD_SUCCESS,
                    recoveryPassword: res //передаем результат пост запроса
                })
            }
            else {
                dispatch({
                    type: RECOVERY_PASSWORD_FAILED,
                })
            }
        })
        .catch((err) => {
            console.log(err)
        })
    }
}