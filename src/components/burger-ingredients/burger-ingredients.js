import React, { useEffect, useRef } from "react";
import styleIngredients from "../burger-ingredients/burger-ingredients.module.css";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import ProductItem from "../product-item/product-item";
import PropTypes from "prop-types";
import { ingredientType } from "../../utils/types";
import ModalOverlay from '../modal/modal-overlay';
import Modal from '../modal/modal';
import IngredientDetails from '../ingredient-details/ingredient-details';
import { useDispatch, useSelector } from 'react-redux';
import { getItems } from '../../services/actions/burger-ingredients';


function BurgerIngredients(props) {

  const dispatch = useDispatch(); // ф-ия отправляет экшены

  //данные ингредиентов из хранилища
  const { ingredients } = useSelector(state => state.ingredientsReducer); 

  //отправляем запрос к апи
  useEffect(() => {
    dispatch(getItems())
  },[dispatch])

  const [current, setCurrent] = React.useState('bun');

  const bunRef = useRef(null);
  const sauceRef = useRef(null);
  const mainRef = useRef(null);

  const handleScroll = (e) => {

    if(e.target.scrollTop >= (bunRef.current.offsetTop / 2)) {
      setCurrent('bun')
    }
    if(e.target.scrollTop >= (sauceRef.current.offsetTop / 2)) {
      setCurrent('sauces')
      
    }
    if(e.target.scrollTop >= (mainRef.current.offsetTop / 2)) {
      setCurrent('main')
    }
  };

  return (
    <section className={styleIngredients.block}>
      <h2 className="text text_type_main-large mb-5 mt-10">
        {"Соберите бургер"}
      </h2>
      <nav
        className={`${styleIngredients.nav} text text_type_main-default mb-10`} 
      >
        <Tab value="bun" active={current === "bun"} onClick={setCurrent}>
          Булки
        </Tab>
        <Tab value="sauces" active={current === "sauces"} onClick={setCurrent}>
          Соусы
        </Tab>
        <Tab value="main" active={current === "main"} onClick={setCurrent}>
          Начинки
        </Tab>
      </nav>

      <section className={styleIngredients.mainMenu} onScroll={handleScroll} >
        <div className={styleIngredients.mainMenu2} ref={bunRef}>
          <h2 className="text text_type_main-medium mb-6">Булки</h2>
          <ul className={styleIngredients.item}>
            {ingredients.map((item) => {
              if (item.type === "bun") { 
                return  <ProductItem  item={item} key={item._id} onOpen={props.openModal}  
                onClose={props.onClose} id={item._id} />                      
              }
            })}
          </ul>
        </div>

        <div className={styleIngredients.mainMenu2} ref={sauceRef}>
          <h2 className="text text_type_main-medium mb-6">{"Соусы"}</h2>
          <ul className={styleIngredients.item}>
            {ingredients.map((item) => {
              if (item.type === "sauce") {
                return <ProductItem card={item} key={item._id} onOpen={props.openModal} id={item._id} item={item}/>
              }
            })}
          </ul>
        </div>

        <div ref={mainRef}>
          <h2 className="text text_type_main-medium mb-6">{"Начинки"}</h2>
          <ul className={styleIngredients.item}>
            {ingredients.map((item) => {
              if (item.type === "main") {
                return <ProductItem card={item} key={item._id} onOpen={props.openModal} id={item._id} item={item}/>;
              }
            })}
          </ul>
        </div>
      </section>
    {
      <Modal onClose={props.onClose} onOpen={props.onOpen}>
        <IngredientDetails data={props.popup}/>
        <ModalOverlay onClose={props.onClose} onOpen={props.onOpen}/>
      </Modal>}
    </section>
  );
  
}

BurgerIngredients.propTypes = {
  openModal: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  onOpen: PropTypes.bool.isRequired,
  popup: PropTypes.shape(ingredientType)
};

export default BurgerIngredients;
