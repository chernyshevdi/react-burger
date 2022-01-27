import IngredientDetails from "../ingredient-details/ingredient-details";
import styleIngredient from "../ingredient/ingredient.module.css";
import { useDispatch, useSelector } from "../../services/types/hooks";
import { useEffect, useState } from "react";
import { ADD_MODAL_DATA } from "../../services/constants/app";
import { FC } from 'react';
import { AddModalDataAction } from "../../services/actions/app";
import {TIngredient} from '../../services/types/data';

const Ingredient: FC = () => {
  const dispatch = useDispatch();
  const { ingredients } = useSelector(state => state.ingredientsReducer);
  const [item, setItem] = useState<TIngredient>();
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
      dispatch(AddModalDataAction(item));
    }
  }, [item, dispatch]);

  return (
    <div className={styleIngredient.container}>
      <IngredientDetails modal={ingredient}/>
    </div>
  );
}

export default Ingredient;
