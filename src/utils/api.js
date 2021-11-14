import {IngredientsData} from '../utils/constants.js';

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

  export {getIngredients}