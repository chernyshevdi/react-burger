import React from 'react';
import styleIngredient from "../ingredient-details/ingredient-details.module.css";
import ReactDOM from 'react-dom';
import PropTypes from "prop-types";
import { ingredientType } from "../../utils/types";

function IngredientDetails(props) {

    return ((
        <>
     <h2 className={`${styleIngredient.name}text text_type_main-large mt-10 ml-10`}>Детали ингредиента</h2>
     <div className={styleIngredient.description}>
         <img className={styleIngredient.img} src={props.data.image_large} alt={props.data.name}/>
         <p className="text text_type_main-medium mt-4 mb-8">{props.data.name}</p>
         <ul className={`${styleIngredient.stat} mb-15`}>
             <div className={`${styleIngredient.list} mr-5`}>
                 <p className="text text_type_main-default text_color_inactive">Калории,ккал</p>
                 <p className="text text_type_main-default text_color_inactive">{props.data.calories}</p>
             </div>

             <div className={`${styleIngredient.list} mr-5`}>
                 <p className="text text_type_main-default text_color_inactive">Белки, г</p>
                 <p className="text text_type_main-default text_color_inactive">{props.data.proteins}</p>
             </div>

             <div className={`${styleIngredient.list} mr-5`}>
                 <p className="text text_type_main-default text_color_inactive">Жиры, г</p>
                 <p className="text text_type_main-default text_color_inactive">{props.data.fat}</p>
             </div>

             <div className={styleIngredient.list}>
                 <p className="text text_type_main-default text_color_inactive">Углеводы, г</p>
                 <p className="text text_type_main-default text_color_inactive">{props.data.carbohydrates}</p>
             </div>
         </ul>
     </div>
</>
    ))
}

IngredientDetails.propTypes = {
    data: PropTypes.shape(ingredientType).isRequired
  };

export default IngredientDetails;