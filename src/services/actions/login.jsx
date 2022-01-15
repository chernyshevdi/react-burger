import { login } from "../../utils/api";

export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILED = "LOGIN_FAILED";

export function postLogin(email, password) {
  return function (dispatch) {
    dispatch({
      type: LOGIN_REQUEST,
    });
    login(email, password)
      .then((res) => {
        if (res.success) {
          localStorage.setItem("access", res.accessToken);
          localStorage.setItem("refresh", res.refreshToken);
          dispatch({
            type: LOGIN_SUCCESS,
            loginData: res, //передаем результат пост запроса
          });
        } else {
          dispatch({
            type: LOGIN_FAILED,
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
}
