import styleConstructor from "../burger-constructor/burger-constructor.module.css";
import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import {
  CurrencyIcon,
  LockIcon,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { ingredientType } from "../../utils/types";
import ModalOverlay from '../modal/modal-overlay';
import Modal from '../modal/modal';
import OrderDetails from "../order-details/order-details"

function BurgerConstructor(props) {

  return (
    <section className={`${styleConstructor.block} mt-25`}>
      <ul className={`${styleConstructor.list}`}>
        <li className={styleConstructor.item}>
          <ConstructorElement
            type="top"
            isLocked={true}
            text="Краторная булка N-200i (верх)"
            price={200}
            thumbnail={"https://code.s3.yandex.net/react/code/bun-02.png"}
          />
        </li>
        <div className={styleConstructor.container}>
          {props.data.map((item) => {
            if (item.type !== "bun") {
              return ((
                <li className={styleConstructor.item} key={item._id}>
                  <DragIcon />
                  <ConstructorElement
                    text={item.name}
                    price={item.price}
                    thumbnail={item.image}
                  />
                </li>
              ));
            }
          })}
        </div>

        <li className={styleConstructor.item}>
          <ConstructorElement
            type="bottom"
            isLocked={true}
            text="Краторная булка N-200i (низ)"
            price={200}
            thumbnail={"https://code.s3.yandex.net/react/code/bun-02.png"}
          />
        </li>
      </ul>
      <div className={`${styleConstructor.total} mt-10`}>
        <div className={`${styleConstructor.sum} mr-10`}>
          <p
            className={`${styleConstructor.sumText} mr-2 text text_type_digits-medium`}
          >
            610
          </p>
          <CurrencyIcon />
        </div>
        <Button type="primary" size="large" onClick={props.openModal}>
          Оформить заказ
        </Button>
      </div>
      {
      <Modal onClose={props.onClose} isOpen={props.isOpen}>
        <OrderDetails />
        <ModalOverlay onClose={props.onClose} isOpen={props.isOpen}/>
      </Modal>}
    </section>
  );
}

BurgerConstructor.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape(ingredientType)).isRequired,
  openModal: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired
  
};

export default BurgerConstructor;
