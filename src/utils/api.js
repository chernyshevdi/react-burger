import {IngredientsData , orderData} from '../utils/constants.js';

  const getIngredients = () => {
    return fetch(IngredientsData)
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        return Promise.reject(`Ошибка: ${res.status}`);
      }
    });
  }

  const order = (id) => {
    return(fetch(orderData, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        ingredients: id
      })
    }))
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        return Promise.reject(`Ошибка: ${res.status}`);
      }
    });
  }

  export {getIngredients, order}