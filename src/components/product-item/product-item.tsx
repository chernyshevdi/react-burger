import styleCard from "../product-item/product-item.module.css";
import {
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useDrag } from "react-dnd";
import { useSelector } from "../../services/types/hooks";
import { Link, useLocation } from "react-router-dom";
import { FunctionComponent } from 'react';

interface IProductItem {
  item: { 
    type?: string;
    _id: string;
    image: string;
    name: string;
    price: number;
  };
  onOpen: (item?: object) => void;
  id: string;
  onClose?: () => void;
  card?: {}
}

const ProductItem: FunctionComponent<IProductItem> = ({ item, onOpen, id }) => {
  const { ingredientsInBurgerConstructor } = useSelector(state => state.constructorReducer
  );

  function handleClick() {
    onOpen(item);
  }

  const [{ opacity }, dragRef] = useDrag({
    //добавляю ф-ть перетаскивания
    type: "items", //Это строка, благодаря которой целевой элемент понимает, какие элементы в него можно перетащить
    item: item, //Это данные о перетаскиваемом элементе.
    collect: (monitor) => ({
      opacity: monitor.isDragging() ? 0.5 : 1,
    }),
  });

  const count = () => { 
    if (item.type === "bun") {
      return ingredientsInBurgerConstructor.bun.filter(
        (item: { _id?: string }) => item._id === id
      ).length !== 0
        ? ingredientsInBurgerConstructor.bun.filter((item: { _id?: string }) => item._id === id)
            .length + 1
        : 0;
    } else {
      return ingredientsInBurgerConstructor.other.filter(
        (item: { _id?: string }) => item._id === id
      ).length;
    }
  };

  const location = useLocation(); 

  return (
    <section
      className={`${styleCard.card} ml-4 mb-10`}
      style={{ opacity }}
      ref={dragRef}
    >
      <div className={styleCard.count}>
        <Counter count={count()} size="default" />
      </div>
      <Link
        to={{
          pathname: `/ingredients/${item._id}`,
          state: { background: location },
        }}
      >
        <img
          className={`${styleCard.image} mb-1 ml-4 mr-4`} //product-item_image__308nZ mb-1 ml-4 mr-4
          src={item.image}
          onClick={handleClick}
          alt={item.name}
        />
      </Link>
      <div className={`${styleCard.price} mb-1`}>
        <p className="text text_type_digits-default mr-2">{item.price}</p>
        <CurrencyIcon type="primary" />
      </div>
      <p className={`${styleCard.name} text text_type_main-default`}>
        {item.name}
      </p>
    </section>
  );
}

export default ProductItem;