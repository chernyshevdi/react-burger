import React, { useRef } from "react";
import styleIngredients from "../burger-ingredients/burger-ingredients.module.css";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import ProductItem from "../product-item/product-item";
import { useSelector } from "react-redux";
import { FC } from 'react';

interface IBurgerIngredients {
  openModal: () => void;
  onClose: () => void;
}

interface RootState {
  ingredientsReducer: any;
}

type TItem = { 
    type?: string;
    _id: string;
    image: string;
    name: string;
    price: number;
}

const BurgerIngredients: FC<IBurgerIngredients> = ({openModal, onClose}) => {

  //данные ингредиентов из хранилища
  const { ingredients } = useSelector((state: RootState) => state.ingredientsReducer);
  
  const [current, setCurrent] = React.useState<string>("bun");
  
  const bunRef = useRef<HTMLDivElement>(null);
  const sauceRef = useRef<HTMLDivElement>(null);
  const mainRef = useRef<HTMLDivElement>(null);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>): void => {
    if(bunRef.current) {
      if ((e.target as HTMLDivElement).scrollTop >= bunRef.current.offsetTop / 2) {
        setCurrent("bun");
      }
    }
    if(sauceRef.current) {
      if ((e.target as HTMLDivElement).scrollTop >= sauceRef.current.offsetTop / 2) {
        setCurrent("sauces");
      }
    }
    if(mainRef.current) {
      if ((e.target as HTMLDivElement).scrollTop >= mainRef.current.offsetTop / 2) {
        setCurrent("main");
      }
    }
  };

  const hanldeScrollTab = () => {
    if(bunRef.current) {
      setCurrent("bun");
      bunRef.current.scrollIntoView({behavior: "smooth"})
    }
  }

  const hanldeScrollSauce = () => {
    if(sauceRef.current) {
      setCurrent("sauces");
      sauceRef.current.scrollIntoView({behavior: "smooth"})
    }
  }

  const hanldeScrollMain = () => {
    if(mainRef.current) {
      setCurrent("main");
      mainRef.current.scrollIntoView({behavior: "smooth"})
    }
  }

  return (
    <section className={styleIngredients.block}>
      <h2 className="text text_type_main-large mb-5 mt-10">
        {"Соберите бургер"}
      </h2>
      <nav
        className={`${styleIngredients.nav} text text_type_main-default mb-10`}
      >
        <Tab value="bun" active={current === "bun"} onClick={hanldeScrollTab}>
          Булки
        </Tab>
        <Tab value="sauces" active={current === "sauces"} onClick={hanldeScrollSauce}>
          Соусы
        </Tab>
        <Tab value="main" active={current === "main"} onClick={hanldeScrollMain}>
          Начинки
        </Tab>
      </nav>

      <section className={styleIngredients.mainMenu} onScroll={handleScroll}>
        <div className={styleIngredients.mainMenu2} ref={bunRef}>
          <h2 className="text text_type_main-medium mb-6">Булки</h2>
          <ul className={styleIngredients.item}>
            {ingredients.map((item: TItem) => {
              if (item.type === "bun") {
                return (
                  <ProductItem
                    item={item}
                    key={item._id}
                    onOpen={openModal}
                    onClose={onClose}
                    id={item._id}
                  />
                );
              }
            })}
          </ul>
        </div>

        <div className={styleIngredients.mainMenu2} ref={sauceRef}>
          <h2 className="text text_type_main-medium mb-6">{"Соусы"}</h2>
          <ul className={styleIngredients.item}>
            {ingredients.map((item: TItem) => {
              if (item.type === "sauce") {
                return (
                  <ProductItem
                    card={item}
                    key={item._id}
                    onOpen={openModal}
                    id={item._id}
                    item={item}
                  />
                );
              }
            })}
          </ul>
        </div>

        <div ref={mainRef}>
          <h2 className="text text_type_main-medium mb-6">{"Начинки"}</h2>
          <ul className={styleIngredients.item}>
            {ingredients.map((item: TItem) => {
              if (item.type === "main") {
                return (
                  <ProductItem
                    card={item}
                    key={item._id}
                    onOpen={openModal}
                    id={item._id}
                    item={item}
                  />
                );
              }
            })}
          </ul>
        </div>
      </section>
    </section>
  );
}

export default BurgerIngredients;
