import { updateUser } from '../../utils/api'; 

export const UPDATE_USER_REQUEST = 'UPDATE_USER_REQUEST';
export const UPDATE_USER_SUCCESS = 'UPDATE_USER_SUCCESS';
export const UPDATE_USER_FAILED = 'UPDATE_USER_FAILED';

export function updateUserData(token, email, password, name) {

    return function(dispatch) {
        dispatch({
            type: UPDATE_USER_REQUEST
        });
        updateUser(token, email, password, name)
        .then((res) => {
            if(res.success) {
                dispatch({
                    type: UPDATE_USER_SUCCESS,
                    updateUser: res
                })
            }
            else {
                dispatch({
                    type: UPDATE_USER_FAILED,
                    updatestatus: res
                })
            }
        })
        .catch((err) => {
            console.log(err)
        })
    }
}