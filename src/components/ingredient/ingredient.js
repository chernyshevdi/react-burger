import IngredientDetails from "../ingredient-details/ingredient-details";
import styleIngredient from "../ingredient/ingredient.module.css";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { ADD_MODAL_DATA } from "../../services/actions/app";

function Ingredient() {
  const dispatch = useDispatch();
  const { ingredients } = useSelector((state) => state.ingredientsReducer);
  const [item, setItem] = useState(null);
  const [currentIngredientId, setCurrentIngredientId] = useState(null);

  const ingredient =(id) => {
    setCurrentIngredientId(id)
  }

  useEffect(() => {
    if(currentIngredientId) {
      setItem(ingredients.find((item) => item._id === currentIngredientId));
    }
  },[setItem, ingredients ])

  
  useEffect(() => {
    if (item) {
      dispatch({
        type: ADD_MODAL_DATA,
        item, //отправляем экшен с данными карточки
      });
    }
  }, [item, dispatch]);

  return (
    <div className={styleIngredient.container}>
      <IngredientDetails  modal={ingredient}/>
    </div>
  );
}

export default Ingredient;
