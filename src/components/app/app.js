import React from "react";
import styleApp from "./app.module.css";
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import { useDispatch } from 'react-redux';
import { ADD_MODAL_DATA } from '../../services/actions/app';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd'

function App() {

  const [isIngredientModalOpen, setIsIngredientModalOpen] = React.useState(false);
  const [isOrderModalOpen, setIsOrderModalOpen] = React.useState(false);

  function openModalOrder() {
    setIsOrderModalOpen(true)
  }

  const dispatch = useDispatch();

  const openModalIgredients = (item) => {
    dispatch({
      type: ADD_MODAL_DATA,
      item, //отправляем экшен с данными карточки
    })

    setIsIngredientModalOpen(true)
  }

  function closeModal() {
    setIsIngredientModalOpen(false)
    setIsOrderModalOpen(false)
  }

  return (
    <div className={styleApp.page}>

        <AppHeader />
        <section className={styleApp.menu}>
        <DndProvider backend={HTML5Backend}>
          <BurgerIngredients  onClose={closeModal} onOpen={isIngredientModalOpen} openModal={openModalIgredients} />
          <BurgerConstructor onClose={closeModal} onOpen={isOrderModalOpen} openModal={openModalOrder}/>
        </DndProvider>
        </section>

    </div>
  );
}

export default App;
