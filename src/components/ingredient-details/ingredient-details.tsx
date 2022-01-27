import { useEffect } from "react";
import styleIngredient from "../ingredient-details/ingredient-details.module.css";
import { useSelector } from "../../services/types/hooks";
import { useParams } from "react-router-dom";
import { FC } from 'react';

interface IIngredientDetails {
  modal: (id: string) => void;
}

const IngredientDetails: FC<IIngredientDetails> = ({modal}) => {
  const { currentIngredient } = useSelector(state => state.appReducer); //данные полученные из хранилища
  const { id } = useParams<{id?: string}>();

  useEffect(() => {
    if(id) {
      modal(id)
    }
  },[id])

  return (
    <div className={styleIngredient.container}>
      <h2
        className={`${styleIngredient.name}text text_type_main-large mt-10 ml-10`}
      >
        Детали ингредиента
      </h2>
      <div className={styleIngredient.description}>
        <img
          className={styleIngredient.img}
          src={currentIngredient.image_large}
          alt={currentIngredient.name}
        />
        <p className="text text_type_main-medium mt-4 mb-8">
          {currentIngredient.name}
        </p>
        <ul className={`${styleIngredient.stat} mb-15`}>
          <div className={`${styleIngredient.list} mr-5`}>
            <p className="text text_type_main-default text_color_inactive">
              Калории,ккал
            </p>
            <p className="text text_type_main-default text_color_inactive">
              {currentIngredient.calories}
            </p>
          </div>

          <div className={`${styleIngredient.list} mr-5`}>
            <p className="text text_type_main-default text_color_inactive">
              Белки, г
            </p>
            <p className="text text_type_main-default text_color_inactive">
              {currentIngredient.proteins}
            </p>
          </div>

          <div className={`${styleIngredient.list} mr-5`}>
            <p className="text text_type_main-default text_color_inactive">
              Жиры, г
            </p>
            <p className="text text_type_main-default text_color_inactive">
              {currentIngredient.fat}
            </p>
          </div>

          <div className={styleIngredient.list}>
            <p className="text text_type_main-default text_color_inactive">
              Углеводы, г
            </p>
            <p className="text text_type_main-default text_color_inactive">
              {currentIngredient.carbohydrates}
            </p>
          </div>
        </ul>
      </div>
    </div>
  );
}

export default IngredientDetails;
