import { IngredientsData, orderData, authUrl, checkResponse } from "./constants";

const getIngredients = () => {
  return fetch(IngredientsData).then(checkResponse)
};

const order = (id: string) => {
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

const forgotPassword = (email: string) => {
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

const resetPassword = (password: string, token: string) => {
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

const register = (email: string, password: string, name: string) => {
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

const login = (email: string, password: string) => {
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

const updateToken = (refreshToken: string) => {
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

const logout = (token: string) => {
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

const getUser = (token: string) => {
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

const updateUser = (token: string, email: string, password: string, name: string) => {
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
