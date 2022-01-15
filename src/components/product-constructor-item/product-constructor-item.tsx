import { useDrag } from "react-dnd";
import { useDrop } from "react-dnd";
import { useSelector } from "react-redux";
import { useRef } from "react";
import styleConstructor from "../burger-constructor/burger-constructor.module.css";
import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import { DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { FC } from 'react';

interface IProductConstructorItem {
  handleClose: () => void | undefined;
  moveListItem?: (dragIndex?: number, hoverIndex?: number) => void;
  index?: number | undefined;
  item: {
    type: string;
    _id?: string;
    image: string;
    name: string;
    price: number;
  }
  type: "top" | "bottom" | undefined;
  isLocked?: boolean;
  key?: string
}

interface RootState {
  constructorReducer: any;
}

const ProductConstructorItem: FC<IProductConstructorItem> = ({
  handleClose, 
  moveListItem, 
  index, 
  item, 
  type, 
  isLocked, 
}) => {
  const { ingredientsInBurgerConstructor } = useSelector(
    (state: RootState) => state.constructorReducer
  );
  const dragDropRef = useRef<HTMLLIElement>(null);

  const [, drag] = useDrag({
    //добавляю ф-ть перетаскивания
    type: "item", //Это строка, благодаря которой целевой элемент понимает, какие элементы в него можно перетащить
    item: item, //Это данные о перетаскиваемом элементе.
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [{ opacity }, drop] = useDrop({
    accept: "item",
    hover: (item: {_id: string}) => {
      const dragIndex = ingredientsInBurgerConstructor.other.findIndex(
        (elem:{_id: string}) => elem._id === item._id
      );
      const hoverIndex = index;
      moveListItem!(dragIndex, hoverIndex);
    },
    collect: (monitor) => ({
      opacity: monitor.isOver() ? 0.2 : 1,
    }),
  });

  drag(drop(dragDropRef));

  return item.type === "bun" ? (
    <li className={styleConstructor.bun} style={{ opacity }}>
      <ConstructorElement
        text={
          type === "top"
            ? `${item.name} (верх)`
            : type === "bottom"
            ? `${item.name} (низ)`
            : item.name
        }
        price={item.price}
        thumbnail={item.image}
        handleClose={handleClose}
        type={type}
        isLocked={isLocked}
      />
    </li>
  ) : (
    <li className={styleConstructor.item} style={{ opacity }} ref={dragDropRef}>
      <DragIcon type="secondary" />
      <ConstructorElement
        text={item.name}
        price={item.price}
        thumbnail={item.image}
        handleClose={handleClose}
        type={type}
        isLocked={isLocked}
      />
    </li>
  );
}

export default ProductConstructorItem;
