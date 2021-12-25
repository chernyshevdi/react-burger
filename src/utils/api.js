import { IngredientsData, orderData, authUrl, checkResponse } from "../utils/constants.js";

const getIngredients = () => {
  return fetch(IngredientsData).then(checkResponse)
};

const order = (id) => {
  return fetch(orderData, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ingredients: id,
    }),
  }).then(checkResponse)
};

const forgotPassword = (email) => {
  return fetch(authUrl + '/password-reset', {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email,
    }),
  }).then(checkResponse)
};

const resetPassword = (password, token) => {
  return fetch(authUrl + "/password-reset/reset", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      password: password,
      token: token,
    }),
  }).then(checkResponse)
};

const register = (email, password, name) => {
  return fetch(authUrl + "/auth/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email,
      password: password,
      name: name,
    }),
  }).then(checkResponse)
};

const login = (email, password) => {
  return fetch(authUrl + "/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email,
      password: password,
    }),
  }).then(checkResponse)
};

const updateToken = (refreshToken) => {
  return fetch(authUrl + "/auth/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      token: refreshToken,
    }),
  }).then((res) => {
    return res.json();
  });
};

const logout = (token) => {
  return fetch(authUrl + "/auth/logout", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      token: token,
    }),
  }).then(checkResponse) 
};

const getUser = (token) => {
  return fetch(authUrl + "/auth/user", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
  }).then((res) => {
    return res.json();
  });
};

const updateUser = (token, email, password, name) => {
  return fetch(authUrl + "/auth/user", {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify({
      email: email,
      password: password,
      name: name,
    }),
  }).then((res) => {
    return res.json();
  });
};

export {
  getIngredients,
  order,
  forgotPassword,
  resetPassword,
  register,
  login,
  updateToken,
  logout,
  getUser,
  updateUser,
};
