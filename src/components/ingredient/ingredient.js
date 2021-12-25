import IngredientDetails from "../ingredient-details/ingredient-details";
import styleIngredient from "../ingredient/ingredient.module.css";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { ADD_MODAL_DATA } from "../../services/actions/app";

function Ingredient() {
  const dispatch = useDispatch();
  const { ingredients } = useSelector((state) => state.ingredientsReducer);
  const { id } = useParams();
  const [item, setItem] = useState(null);

  useEffect(() => {
    if (id) {
      setItem(ingredients.find((item) => item._id === id));
    }
  }, [ingredients, id]);

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
      <IngredientDetails />
    </div>
  );
}

export default Ingredient;
