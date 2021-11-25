import styleConstructor from "../burger-constructor/burger-constructor.module.css";
import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import {
  CurrencyIcon,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import React, { useEffect } from "react";
import PropTypes from "prop-types";
import ModalOverlay from "../modal/modal-overlay";
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";
import { BurgerContext } from "../../contexts/burger-constructor-context";

function BurgerConstructor(props) {

  const { filtered } = React.useContext(BurgerContext);
  const [price, setPrice] = React.useState(0);
  
  useEffect(()=> {
   let q = filtered.other.reduce((cur, item) => {
      return item.price + cur
    }, 0)
    setPrice((filtered.bun.price * 2) + q)
  },[filtered])

  function handleSubmit(e) {
  e.preventDefault()

    let selectedIngredients = filtered.other.map((item) => {
        return item._id
      })
      selectedIngredients.push(filtered.bun._id)

    props.onUpdateOrder(
      selectedIngredients
    )
  }

  return (
    <section className={`${styleConstructor.block} mt-25`}>
      <ul className={`${styleConstructor.list}`}>
        
          <li className={styleConstructor.item} key={filtered.bun._id}>
          <ConstructorElement
            text={`${filtered.bun.name} (верх)`}
            price={filtered.bun.price}
            thumbnail={filtered.bun.image}
          />
        </li>
        

        <div className={styleConstructor.container}>
          {filtered.other.map((item) => {
            return (
              <li className={styleConstructor.item} key={item._id}>
                <DragIcon />
                <ConstructorElement
                  text={item.name}
                  price={item.price}
                  thumbnail={item.image}
                />
              </li>
            );
          })}
        </div>

        <li className={styleConstructor.item} key={filtered.bun._id}>
          <ConstructorElement
            text={`${filtered.bun.name} (низ)`}
            price={filtered.bun.price}
            thumbnail={filtered.bun.image}
          />
        </li>

      </ul>

      <div className={`${styleConstructor.total} mt-10`}>
        <div className={`${styleConstructor.sum} mr-10`}>
          <p
            className={`${styleConstructor.sumText} mr-2 text text_type_digits-medium`}
          >{price}</p>
          <CurrencyIcon />
        </div>
        <form onSubmit={handleSubmit}>
          <Button type="primary" size="large" onClick={props.openModal}>
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
  onUpdateOrder: PropTypes.func.isRequired
};

export default BurgerConstructor;
