import React, { useEffect } from 'react';
import { render } from "@testing-library/react";
import styleIngredients from '../BurgerIngredients/BurgerIngredients.module.css';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import ProductItem from '../ProductItem/ProductItem';
import PropTypes from 'prop-types';

function BurgerIngredients(props) {

    const [current, setCurrent] = React.useState('bun')

    return(
        <section className={styleIngredients.block}>
            <h2 className='text text_type_main-large mb-5 mt-10'>{'Соберите бургер'}</h2>
            <nav className={`${styleIngredients.nav} text text_type_main-default mb-10`}>
                <Tab value="bun" active={current === 'bun'} onClick={setCurrent}> Булки </Tab>
                <Tab value="sauces" active={current === 'sauces'} onClick={setCurrent}> Соусы </Tab>
                <Tab value="toppings" active={current === 'toppings'} onClick={setCurrent}> Начинки </Tab>
            </nav>
            
                <main className={styleIngredients.mainMenu}>
                    <div>
                        <h2 className='text text_type_main-medium mb-6'>{'Булки'}</h2>
                        <ul className={styleIngredients.item}>
                            {props.data.map((item)=>{
                                if(item.type === "bun") {
                                   return <ProductItem card={item} key={item._id}/>
                                }
                            })}
                        </ul>
                    </div>

                    <div>
                        <h2 className='text text_type_main-medium mb-6'>{'Соусы'}</h2>
                        <ul className={styleIngredients.item}>
                            {props.data.map((item)=>{
                                if(item.type === "sauce") {
                                    return <ProductItem card={item} key={item._id}/>
                                }
                            })}
                        </ul>
                    </div>

                    <div>
                        <h2 className='text text_type_main-medium mb-6'>{'Начинки'}</h2>
                        <ul className={styleIngredients.item}>
                            {props.data.map((item)=>{
                                if(item.type === "topping") {
                                    return <ProductItem card={item} key={item._id}/>
                                }
                            })}
                        </ul>
                    </div>
                </main>
            
        </section>
    )
}

BurgerIngredients.propTypes = {
    data: PropTypes.arrayOf(PropTypes.shape({
        _id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        type: PropTypes.string.isRequired,
        proteins: PropTypes.number.isRequired,
        fat: PropTypes.number.isRequired,
        carbohydrates: PropTypes.number.isRequired,
        calories: PropTypes.number.isRequired,
        price: PropTypes.number.isRequired,
        image: PropTypes.string.isRequired,
        image_mobile: PropTypes.string.isRequired,
        image_large: PropTypes.string.isRequired,
        __v: PropTypes.number.isRequired
      }))
  }; 

export default BurgerIngredients;
