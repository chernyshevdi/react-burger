import styleCard from "../product-item/product-item.module.css";
import {
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import { useDrag } from 'react-dnd';
import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';

function ProductItem({item, onOpen, id}) {

  const { ingredientsInBurgerConstructor } = useSelector(state => state.constructorReducer);
  
  function handleClick() {
    onOpen(item);
  }

  const [{opacity}, dragRef] = useDrag({ //добавляю ф-ть перетаскивания
    type: 'items', //Это строка, благодаря которой целевой элемент понимает, какие элементы в него можно перетащить
    item: {item}, //Это данные о перетаскиваемом элементе.
    collect: monitor => ({
      opacity: monitor.isDragging() ? 0.5 : 1,
    }),
  })

  const count = () => {
    if(item.type === 'bun') {
      return ingredientsInBurgerConstructor.bun.filter((item) => item._id === id).length !== 0 ? 
      ingredientsInBurgerConstructor.bun.filter((item) => item._id === id).length + 1 : 0
    }
    else {
      return ingredientsInBurgerConstructor.other.filter((item) => item._id === id).length
    }
  }

  const location = useLocation();

  return (
    <section className={`${styleCard.card} ml-4 mb-10`} style={{opacity}} ref={dragRef}>
      <div className={styleCard.count}>
        <Counter count={count()} size="default" />
      </div>
      <Link
        key={item._id}
        to={{pathname:`/ingredients/${item._id}`,
        state: { background: location }
        }}>
      <img
        className={`${styleCard.image} mb-1 ml-4 mr-4`}
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

ProductItem.propTypes = {
  card: PropTypes.shape({
    image: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
  }),
  onOpen: PropTypes.func.isRequired
};

export default ProductItem;
