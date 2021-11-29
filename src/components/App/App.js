import React from "react";
import styleApp from "./app.module.css";
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

  const [selectedIngredients, setSelectedIngredients] = React.useState({bun:[""], other: [""]}); // сделать лучше

  const[orderData, setOrderData] = React.useState([]) 

  React.useEffect(() => {
    getIngredients()
    .then((res) => {
      setSelectedIngredients({
        bun: res.data.find(item => item.type === "bun"),
        other: res.data.filter(item => item.type !== "bun")
      })
    })
    .catch((error) => {
      console.log(error)
    })
  },[])

  function postOrder(data) { //также не обрабатываешь, то, что промис в блок then может вобще не зайти
    order(data)
    .then((res) => {
      setOrderData(res.order)
    })
    .catch((error) => {
      console.log(error)
    })
  }

  const [openIngredient, setOpenIngredient] = React.useState(false);
  const [ingredientsDataForModal, setIngredientsDataForModal] = React.useState(); //данные для модальных окон
  const [openOrder, setOpenOrder] = React.useState(false);

  function openModalOrder() {
    setOpenOrder(true)
  }

  function openModalIgredients(item) {
    setIngredientsDataForModal(item)
    setOpenIngredient(true)
  }

  function closeModal() {
    setOpenIngredient(false)
    setOpenOrder(false)
  }

  return (
    <div className={styleApp.page}>
      <BurgerContext.Provider value={{selectedIngredients, setSelectedIngredients , orderData, setOrderData}}>
        <AppHeader />
        <section className={styleApp.menu}>
          <BurgerIngredients data={ingredients} onClose={closeModal} isOpen={openIngredient} popup={ingredientsDataForModal} openModal={openModalIgredients}/>
          <BurgerConstructor onClose={closeModal} isOpen={openOrder} openModal={openModalOrder} onUpdateOrder={postOrder}/>
        </section>
      </BurgerContext.Provider>
    </div>
  );
}

export default App;
