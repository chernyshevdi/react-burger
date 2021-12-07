import React from "react";
import styleApp from "./app.module.css";
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import { BurgerContext } from "../../contexts/burger-constructor-context";
import { useDispatch } from 'react-redux';
import { ADD_MODAL_DATA } from '../../services/actions/app';
import { DELETE_MODAL_DATA } from '../../services/actions/app';

import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd'

function App() {

  const[orderData, setOrderData] = React.useState([]) 

  const [openIngredient, setOpenIngredient] = React.useState(false);
  const [openOrder, setOpenOrder] = React.useState(false);

  function openModalOrder() {
    setOpenOrder(true)
  }

  const dispatch = useDispatch();

  const openModalIgredients = (item) => {
    setOpenIngredient(true)
    dispatch({
      type: ADD_MODAL_DATA,
      item, //отправляем экшен с данными карточки
    })
  }

  function closeModal() {
    setOpenIngredient(false)
    setOpenOrder(false)
    dispatch({
      type: DELETE_MODAL_DATA //при закрытии отправляю экшен с пустым обьектом на место данных карточки
    })
  }

  return (
    <div className={styleApp.page}>
      <BurgerContext.Provider value={{ orderData, setOrderData}}>
        <AppHeader />
        <section className={styleApp.menu}>
        <DndProvider backend={HTML5Backend}>
          <BurgerIngredients  onClose={closeModal} isOpen={openIngredient} openModal={openModalIgredients} />
          <BurgerConstructor onClose={closeModal} isOpen={openOrder} openModal={openModalOrder}/>
        </DndProvider>
        </section>
      </BurgerContext.Provider>
    </div>
  );
}

export default App;
