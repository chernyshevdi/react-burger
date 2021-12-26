import { updateToken } from "../../utils/api";
import { setCookie } from "../../utils/constants";

export const UPDATE_TOKEN_REQUEST = "UPDATE_TOKEN_REQUEST";
export const UPDATE_TOKEN_SUCCESS = "UPDATE_TOKEN_SUCCESS";
export const UPDATE_TOKEN_FAILED = "UPDATE_TOKEN_FAILED";

export function postUpdateToken(token) {
  return function (dispatch) {
    dispatch({
      type: UPDATE_TOKEN_REQUEST,
    });
    updateToken(token)
      .then((res) => {
        if (res.success) {
          localStorage.setItem("access", res.accessToken);
          localStorage.setItem("refresh", res.refreshToken);
          dispatch({
            type: UPDATE_TOKEN_SUCCESS,
            updateTokenData: res,
          });
        } else {
          dispatch({
            type: UPDATE_TOKEN_FAILED,
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
}
