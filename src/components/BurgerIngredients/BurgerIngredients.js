import React, { useEffect } from "react";
import { render } from "@testing-library/react";
import styleIngredients from "../BurgerIngredients/BurgerIngredients.module.css";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import ProductItem from "../ProductItem/ProductItem";
import PropTypes from "prop-types";
import { types } from "../../utils/types";
import ModalOverlay from '../Modal/ModalOverlay';
import Modal from '../Modal/Modal';
import IngredientDetails from '../Modal/IngredientDetails/IngredientDetails';

function BurgerIngredients(props) {

  const [current, setCurrent] = React.useState("bun");
  /*const [open, setOpen] = React.useState(false);
  const [ing, setIng] = React.useState();

  function openModal(item) {
    setIng(item)
    setOpen(true)
  }

  function closeModal() {
    setOpen(false)
  }*/

  return (
    <section className={styleIngredients.block}>
      <h2 className="text text_type_main-large mb-5 mt-10">
        {"Соберите бургер"}
      </h2>
      <nav
        className={`${styleIngredients.nav} text text_type_main-default mb-10`}
      >
        <Tab value="bun" active={current === "bun"} onClick={setCurrent}>
          {" "}
          Булки{" "}
        </Tab>
        <Tab value="sauces" active={current === "sauces"} onClick={setCurrent}>
          {" "}
          Соусы{" "}
        </Tab>
        <Tab value="main" active={current === "main"} onClick={setCurrent}>
          {" "}
          Начинки{" "}
        </Tab>
      </nav>

      <section className={styleIngredients.mainMenu}>
        <div>
          <h2 className="text text_type_main-medium mb-6">{"Булки"}</h2>
          <ul className={styleIngredients.item}>
            {props.data.map((item) => {
              if (item.type === "bun") {
                return <ProductItem card={item} key={item._id} onOpen={props.openModal} onClose={props.onClose} isOpen={props.isOpen}/>                        
              }
            })}
          </ul>
        </div>

        <div>
          <h2 className="text text_type_main-medium mb-6">{"Соусы"}</h2>
          <ul className={styleIngredients.item}>
            {props.data.map((item) => {
              if (item.type === "sauce") {
                return <ProductItem card={item} key={item._id} onOpen={props.openModal}/>;
              }
            })}
          </ul>
        </div>

        <div>
          <h2 className="text text_type_main-medium mb-6">{"Начинки"}</h2>
          <ul className={styleIngredients.item}>
            {props.data.map((item) => {
              if (item.type === "main") {
                return <ProductItem card={item} key={item._id} onOpen={props.openModal}/>;
              }
            })}
          </ul>
        </div>
      </section>
    {
      <Modal onClose={props.onClose} isOpen={props.isOpen}>
        <IngredientDetails data={props.popup}/>
        <ModalOverlay onClose={props.onClose} isOpen={props.isOpen}/>
      </Modal>}
    </section>
  );
  
}

BurgerIngredients.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape(types)).isRequired,
};

export default BurgerIngredients;
