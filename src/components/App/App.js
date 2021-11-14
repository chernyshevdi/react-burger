import React, { useEffect } from "react";
import styleApp from "./App.module.css";
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import {getIngredients} from "../../utils/api";

function App() {

  const [ingredients, setIngredients] = React.useState([]);


  
  React.useEffect(() => {
    getIngredients()
    .then((res) => {
      setIngredients(res.data)
    })
    .catch((err) =>{
      console.log(err)
    })
  },[])

  const [openIngredient, setOpenIngredient] = React.useState(false);
  const [ing, setIng] = React.useState();
  const [openOrder, setOpenOrder] = React.useState(false);

  function openModalOrder() {
    setOpenOrder(true)
  }

  function openModalIgredients(item) {
    setIng(item)
    setOpenIngredient(true)
  }

  function closeModal() {
    setOpenIngredient(false)
    setOpenOrder(false)
  }



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
