import { register } from "../../utils/api";

export const REGISTER_REQUEST = "REGISTER_REQUEST";
export const REGISTER_SUCCESS = "REGISTER_SUCCESS";
export const REGISTER_FAILED = "REGISTER_FAILED";

export function postRegister(email, password, name) {
  return function (dispatch) {
    dispatch({
      type: REGISTER_REQUEST,
    });
    register(email, password, name)
      .then((res) => {
        if (res.success) {
          dispatch({
            type: REGISTER_SUCCESS,
            registerData: res, //передаем результат пост запроса
          });
        } else {
          dispatch({
            type: REGISTER_FAILED,
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
}
