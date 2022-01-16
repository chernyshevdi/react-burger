import IngredientDetails from "../ingredient-details/ingredient-details";
import styleIngredient from "../ingredient/ingredient.module.css";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { ADD_MODAL_DATA } from "../../services/actions/app";
import { FC } from 'react';

interface RootState {
  ingredientsReducer: any;
}

const Ingredient: FC = () => {
  const dispatch = useDispatch();
  const { ingredients } = useSelector((state: RootState) => state.ingredientsReducer);
  const [item, setItem] = useState<object>();
  const [currentIngredientId, setCurrentIngredientId] = useState<string>();

  const ingredient =(id: string) => {
    setCurrentIngredientId(id)
  }

  useEffect(() => {
    if(currentIngredientId) {
      setItem(ingredients.find((item: {_id: string}) => item._id === currentIngredientId));
    }
  },[ingredients])

  
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
      <IngredientDetails modal={ingredient}/>
    </div>
  );
}

export default Ingredient;
