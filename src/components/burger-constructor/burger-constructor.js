import styleConstructor from "../burger-constructor/burger-constructor.module.css";
import {
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import React, { useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import ModalOverlay from "../changemodalname/modal-overlay";
import Modal from "../changemodalname/modal";
import OrderDetails from "../order-details/order-details";
import { useDispatch, useSelector } from 'react-redux';
import { 
  GET_BURGERCONSTRUCTOR_DATA, 
  DELETE_BURGERCONSTRUCTOR_DATA, 
  UPDATE_BURGERCONSTRUCTOR_DATA } 
from '../../services/actions/burger-constructor';
import ProductConstructorItem from '../product-constructor-item/product-constructor-item';
import { useDrop } from 'react-dnd';
import { postOrder } from '../../services/actions/burger-constructor';

function BurgerConstructor(props) {
  
  const [price, setPrice] = React.useState(0);

  //список ингредиентов для конструктора бургера 
  const { ingredientsInBurgerConstructor } = useSelector(state => state.constructorReducer);

  const dispatch = useDispatch();

  useEffect(()=> {
   const sumResult = ingredientsInBurgerConstructor.other.reduce((cur, item) => { 
      return item.price + cur
    }, 0)
    setPrice((ingredientsInBurgerConstructor.bun[0] ? ingredientsInBurgerConstructor.bun[0].price * 2 : null) + sumResult )
  },[ingredientsInBurgerConstructor]) 


  function handleSubmit(e) {
    e.preventDefault()
    const selectedIngredients = ingredientsInBurgerConstructor.other.map((item) => { 
        return item._id
      })
    selectedIngredients.push(ingredientsInBurgerConstructor.bun[0]._id) 
      
    dispatch(postOrder(selectedIngredients))
  }  

  const [{ isHover } , Refdrop] = useDrop({
    accept: "items",
    collect: monitor => ({
        isHover: monitor.isOver(),
    }),
    drop(item) {
      dispatch({
        type: GET_BURGERCONSTRUCTOR_DATA,
        ...item  
      })
    }, 
});

const deleteIngredient = (id) => {
  dispatch({
    type: DELETE_BURGERCONSTRUCTOR_DATA,
    id
  })
}

const borderColor = isHover ? 'lightgreen' : 'transparent';


function debounce(func, wait, immediate) {
  let timeout;

  return function executedFunction() {
    const context = this;
    const args = arguments;

    const later = function() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };

    const callNow = immediate && !timeout;

    clearTimeout(timeout);

    timeout = setTimeout(later, wait);

    if (callNow) func.apply(context, args);
  };
};

  const moveIngredientsItem = useCallback( (dragIndex, hoverIndex) => {
    const dragItem = ingredientsInBurgerConstructor.other[dragIndex]; //перетаскиваемый элемент
    ingredientsInBurgerConstructor.other.splice(dragIndex, 1)
    ingredientsInBurgerConstructor.other.splice(hoverIndex, 0, dragItem)
    dispatch({
      type: UPDATE_BURGERCONSTRUCTOR_DATA,
      item: ingredientsInBurgerConstructor.other
    })
   
},[ingredientsInBurgerConstructor.other, dispatch])

const moveIngredientsConstructor = debounce(moveIngredientsItem)


  return (
    <section className={`${styleConstructor.block} mt-25`}>

         <ul className={`${styleConstructor.list}`} style={{borderColor}} ref={Refdrop} >
           {ingredientsInBurgerConstructor.bun ? ingredientsInBurgerConstructor.bun.map((item, index) => {
            return(
            <ProductConstructorItem 
              key={String(item._id) + index} 
              handleClose ={()=>{deleteIngredient(String(item._id) + index)}}
              type='top'
              isLocked={true}
              item={item}
            />
            )
          }) : null }  

          <div className={styleConstructor.container} >
            {ingredientsInBurgerConstructor.other ? ingredientsInBurgerConstructor.other.map((item, index) => {
              return (
                <ProductConstructorItem 
                key={String(item._id) + index} 
                handleClose ={()=>{deleteIngredient(String(item._id) + index)}}
                index={index}
                moveListItem={moveIngredientsConstructor}
                item={item}
                />
              )
            }) : null }
          </div>

          {ingredientsInBurgerConstructor.bun? ingredientsInBurgerConstructor.bun.map((item, index) => {
            return(
              <ProductConstructorItem 
              key={String(item._id) + index} 
              handleClose ={()=>{deleteIngredient(String(item._id) + index)}}
              type='bottom'
              isLocked={true}
              item={item}
            />)
        }) : null }         
        </ul> 

      <div className={`${styleConstructor.total} mt-10`}>
        <div className={`${styleConstructor.sum} mr-10`}>
          <p
            className={`${styleConstructor.sumText} mr-2 text text_type_digits-medium`}
          >{price ? price : 0}</p>
          <CurrencyIcon />
        </div>
        <form  onSubmit={handleSubmit} > 
          <Button type="primary" size="large" onClick={props.openModal} disabled={ingredientsInBurgerConstructor.other.length === 0 || ingredientsInBurgerConstructor.bun.length === 0}>
            Оформить заказ
          </Button>
        </form>
      </div>
      {
        <Modal onClose={props.onClose} isOpen={props.isOpen}>
          <OrderDetails />
          <ModalOverlay onClose={props.onClose} isOpen={props.isOpen} />
        </Modal>
      }
    </section>
  );
}

BurgerConstructor.propTypes = {
  openModal: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default BurgerConstructor;
