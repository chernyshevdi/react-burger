import styleCard from '../ProductItem/ProductItem.module.css';
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';

function ProductItem(props) {
    
return(
    <section className={`${styleCard.card} ml-4 mb-10`}>
        <div className={styleCard.count}>
            <Counter count={1} size="default" />
        </div>
        <img className={`${styleCard.image} mb-1 ml-4 mr-4`} src={props.card.image}/>
        <div className={`${styleCard.price} mb-1`}>
            
            <p className='text text_type_digits-default mr-2'>{props.card.price}</p>
            <CurrencyIcon type="primary" />
        </div>
        <p className={`${styleCard.name} text text_type_main-default`}>{props.card.name}</p>
    </section>
)    
}

export default ProductItem;    