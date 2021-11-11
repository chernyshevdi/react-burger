import React from "react";
import styleApp from "./App.module.css";
import AppHeader from "../AppHeader/AppHeader";
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";
import { data } from "../../utils/data";

function App() {
  return (
    <div className={styleApp.page}>
      <AppHeader />
      <section className={styleApp.menu}>
        <BurgerIngredients data={data} />
        <BurgerConstructor data={data} />
      </section>
    </div>
  );
}

export default App;
