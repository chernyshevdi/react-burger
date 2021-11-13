import React from 'react';
import styleIngredient from "../IngredientDetails/IngredientDetails.module.css";
import ReactDOM from 'react-dom';
import PropTypes from "prop-types";
import { types } from "../../../utils/types";

function IngredientDetails(props) {

    return ((
        <>
     <h2 className={`${styleIngredient.name}text text_type_main-large mt-10 ml-10`}>Детали ингредиента</h2>
     <div className={styleIngredient.description}>
         <img className={styleIngredient.img} src={props.data.image_large}/>
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
    data: PropTypes.shape(types)
  };

export default IngredientDetails;