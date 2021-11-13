import React, { useEffect } from "react";
import styleApp from "./App.module.css";
import AppHeader from "../AppHeader/AppHeader";
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";
import { data } from "../../utils/data";

function App() {

  const IngredientsData = 'https://norma.nomoreparties.space/api/ingredients';

  const [ingredients, setIngredients] = React.useState([]);

  const getIngredients = () => {
    return fetch(IngredientsData)
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        return Promise.reject(`Ошибка: ${res.status}`);
      }
    });
  }
  
  React.useEffect(() => {
    getIngredients()
    .then((res) => {
      setIngredients(res.data)
    })
    .catch((err) =>{
      console.log(err)
    })
  },[])

  const [openIngredient, setOpenopenIngredient] = React.useState(false);
  const [ing, setIng] = React.useState();
  const [openOrder, setopenOrder] = React.useState(false);

  function openModalOrder() {
    setopenOrder(true)
  }

  function openModalIgredients(item) {
    setIng(item)
    setOpenopenIngredient(true)
  }

  function closeModal() {
    setOpenopenIngredient(false)
    setopenOrder(false)
  }

  function escClose(event){
    if(event.keyCode === 27) {
      closeModal()
    }
  }

  useEffect(() => {
    document.addEventListener("keydown", escClose);
  })

  return (
    <div className={styleApp.page}>
      <AppHeader />
      <section className={styleApp.menu}>
        <BurgerIngredients data={ingredients} onClose={closeModal} isOpen={openIngredient} popup={ing} openModal={openModalIgredients}/>
        <BurgerConstructor data={ingredients} onClose={closeModal} isOpen={openOrder} openModal={openModalOrder}/>
      </section>
      
    </div>
  );
}

export default App;
