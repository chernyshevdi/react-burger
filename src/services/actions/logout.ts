import { logout } from '../../utils/api'; 

import {LOGOUT_REQUEST, LOGOUT_SUCCESS, LOGOUT_FAILED} from '../constants/logout';

export interface ILogoutRequest {
    readonly type: typeof LOGOUT_REQUEST;
  }

  export interface ILogoutSuccess {
    readonly type: typeof LOGOUT_SUCCESS;
  }

  export interface ILogoutFailed {
    readonly type: typeof LOGOUT_FAILED;
  }

  export type TLogoutActions =
  | ILogoutRequest
  | ILogoutSuccess
  | ILogoutFailed;

export function postLogout(token: string) {
    return function(dispatch: any) {
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