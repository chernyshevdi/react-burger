import React from "react";
import styleApp from "./App.module.css";
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import {getIngredients, order} from "../../utils/api";
import { BurgerContext } from "../../contexts/burger-constructor-context";


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

  const [filtered, setFiltered] = React.useState({bun:[""], other: [""]})

  const[orderData, setOrderData] = React.useState([])

  React.useEffect(() => {
    getIngredients()
    .then((res) => {
      setFiltered({
        bun: res.data.find(item => item.type === "bun"),
        other: res.data.filter(item => item.type !== "bun")
      })
    })
  },[])

  function postOrder(data) {
    order(data)
    .then((res) => {
      setOrderData(res.order)
    })
  }

  const [openIngredient, setOpenIngredient] = React.useState(false);
  const [ing, setIng] = React.useState(); //данные для модальных окон
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
      <BurgerContext.Provider value={{filtered, setFiltered , orderData, setOrderData}}>
        <AppHeader />
        <section className={styleApp.menu}>
          <BurgerIngredients data={ingredients} onClose={closeModal} isOpen={openIngredient} popup={ing} openModal={openModalIgredients}/>
          <BurgerConstructor onClose={closeModal} isOpen={openOrder} openModal={openModalOrder} onUpdateOrder={postOrder}/>
        </section>
      </BurgerContext.Provider>
    </div>
  );
}

export default App;
