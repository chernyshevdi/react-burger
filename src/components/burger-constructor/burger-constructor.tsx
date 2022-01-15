import styleConstructor from "../burger-constructor/burger-constructor.module.css";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import React, { useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";
import { useDispatch, useSelector } from "react-redux";
import {
  ADD_INGREDIENT_BURGERCONSTRUCTOR,
  DELETE_INGREDIENT_BURGERCONSTRUCTOR,
  CHANGE_ORDER_BURGERCONSTRUCTOR,
} from "../../services/actions/burger-constructor";
import ProductConstructorItem from "../product-constructor-item/product-constructor-item";
import { useDrop } from "react-dnd";
import { postOrder } from "../../services/actions/burger-constructor";
import { useHistory } from "react-router-dom";
import { FC } from 'react';

interface IBurgerConstructor {
  openModal: () => void;  
  onClose: () => void;
  onOpen: boolean;
}

interface RootState {
  constructorReducer: any;
}

type TItem = { 
  type: string;
  _id?: string;
  image: string;
  name: string;
  price: number;
}

const BurgerConstructor: FC<IBurgerConstructor> =({openModal, onClose, onOpen}) => {
  const [price, setPrice] = React.useState<number>(0);

  //список ингредиентов для конструктора бургера
  const { ingredientsInBurgerConstructor } = useSelector(
    (state: RootState) => state.constructorReducer
  );

  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    const sumResult = ingredientsInBurgerConstructor.other.reduce(
      (cur: number, item:{price: number}) => {
        return item.price + cur;
      },
      0
    );
    setPrice(
      (ingredientsInBurgerConstructor.bun[0]
        ? ingredientsInBurgerConstructor.bun[0].price * 2
        : 0) + sumResult
    );
  }, [ingredientsInBurgerConstructor]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void =>  {
    e.preventDefault();
    if (login) {
      
        if(ingredientsInBurgerConstructor.other.length !== 0 && ingredientsInBurgerConstructor.bun.length !== 0) {
          const selectedIngredients = ingredientsInBurgerConstructor.other.map(
            (item: {_id: string}) => {
              return item._id;
            }
          );
          selectedIngredients.push(ingredientsInBurgerConstructor.bun[0]._id);
          dispatch(postOrder(selectedIngredients));
        }
        else {
          history.replace({ pathname: "/" });
        }
    } else {
      history.replace({ pathname: "/login" });
    }
  }

  const [{ isHover }, Refdrop] = useDrop({
    accept: "items",
    collect: (monitor) => ({
      isHover: monitor.isOver(), 
    }),
    drop(item:{}) {
      dispatch({
        type: ADD_INGREDIENT_BURGERCONSTRUCTOR,
        ...item,
      });
    },
  });

  const deleteIngredient = (id: string) => {
    dispatch({
      type: DELETE_INGREDIENT_BURGERCONSTRUCTOR,
      id,
    });
  };

  const borderColor = isHover ? "lightgreen" : "transparent";

  function debounce(func: () => void, wait?:number, immediate?: string) { 
    let timeout: any;

    return function executedFunction(this:any, ...args: []) {
      const context = this;

      const later = function () {
        timeout = null;
        if (!immediate) func.apply(context, args);
      };

      const callNow = immediate && !timeout;

      clearTimeout(timeout);

      timeout = setTimeout(later, wait);

      if (callNow) func.apply(context, args);
    };
  }

  const moveIngredientsItem: (dragIndex?: number, hoverIndex?: number) => void  = useCallback(
    (dragIndex, hoverIndex) => {
      dispatch({
        type: CHANGE_ORDER_BURGERCONSTRUCTOR,
        item: ingredientsInBurgerConstructor.other,
        dragIndex,
        hoverIndex,
      });
    },
    [ingredientsInBurgerConstructor.other, dispatch]
  );

  const moveIngredientsConstructor = debounce(moveIngredientsItem);

  const { login } = useSelector((state: any) => state.loginReducer);

  return (
    <section className={`${styleConstructor.block} mt-25`}>
      <ul
        className={`${styleConstructor.list}`}
        style={{ borderColor }}
        ref={Refdrop}
      >
        {ingredientsInBurgerConstructor.bun.map((item: TItem, index: number) => {
          return (
            <ProductConstructorItem
              key={String(item._id) + index}
              handleClose={() => {
                deleteIngredient(String(item._id) + index);
              }}
              type="top"
              isLocked
              item={item}
            />
          );
        })}

        <div className={styleConstructor.container}>
          {ingredientsInBurgerConstructor.other.map((item: TItem, index: number) => {
            return (
              <ProductConstructorItem
                key={String(item._id) + index}
                handleClose={() => {
                  deleteIngredient(String(item._id) + index);
                }}
                index={index}
                moveListItem={moveIngredientsConstructor}
                item={item}
                type={undefined}
              />
            );
          })}
        </div>

        {ingredientsInBurgerConstructor.bun.map((item: TItem, index: number) => {
          return (
            <ProductConstructorItem
              key={String(item._id) + index}
              handleClose={() => {
                deleteIngredient(String(item._id) + index);
              }}
              type="bottom"
              isLocked
              item={item}
            />
          );
        })}
      </ul>

      <div className={`${styleConstructor.total} mt-10`}>
        <div className={`${styleConstructor.sum} mr-10`}>
          <p
            className={`${styleConstructor.sumText} mr-2 text text_type_digits-medium`}
          >
            {price ? price : 0}
          </p>
          <CurrencyIcon type="primary" />
        </div>
        <form onSubmit={handleSubmit}>
          <Button
            type="primary"
            size="large"
            onClick={login && ingredientsInBurgerConstructor.other.length !== 0 && ingredientsInBurgerConstructor.bun.length !== 0 ? openModal : undefined}
          >
            Оформить заказ
          </Button>
        </form>
      </div>
      {
        <Modal onClose={onClose} onOpen={onOpen}>
          <OrderDetails />
        </Modal>
      }
    </section>
  );
}

BurgerConstructor.propTypes = {
  openModal: PropTypes.func.isRequired,
  onOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default BurgerConstructor;
