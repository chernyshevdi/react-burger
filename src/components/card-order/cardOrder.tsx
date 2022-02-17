import styleCardOrder from "./cardOrder.module.css";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { FC, useEffect } from 'react';
import {TOrders, TIngredient} from '../../services/types/data';
import { useSelector } from "../../services/types/hooks";
import React from "react";
import { Link, useLocation, useRouteMatch } from "react-router-dom";

interface ICardOrder{
    order: TOrders;
    status: boolean;
    onOpen: (item?: object) => void;
    onClose?: () => void;
}

const CardOrder: FC<ICardOrder> = ({order, status, onOpen}) => {

    const { ingredients } = useSelector(state => state.ingredientsReducer);
    const [currentIngredient, setCurrentIngredient] = React.useState<TIngredient[]>([]);
    const [currentPrice, setCurrentPrice] = React.useState<number>();
    const [date, setDate] = React.useState<string>();
    const [isStatus, setIsStatus] = React.useState<boolean>(true);
    const [countIngredients, setCountIngredients] = React.useState<number>();

    useEffect(() => {
        order.ingredients.map((id) => {
            const ingredient = ingredients.filter(i => i._id === id)
            setCurrentIngredient(currentIngredient => [...currentIngredient, ingredient[0]])
        })
    },[ingredients])

    useEffect(() => {
        let sum = currentIngredient.reduce((cur: number, item: TIngredient) => {
            return cur + item.price
        }, 0)
        setCurrentPrice(sum)
    },[currentIngredient])
    
    useEffect(() => {
        setIsStatus(status)
    },[status])

    useEffect(() => {
        const now = new Date();
        const otherDate = new Date(Date.parse(order.createdAt))
        const today = new Date(now.getFullYear(), now.getMonth(), now.getDate()).valueOf()
        const dataCard = Date.parse(order.createdAt).valueOf()

        const time =(`${new Date(Date.parse(order.createdAt)).getHours()}:${new Date(Date.parse(order.createdAt)).getMinutes().toString().length === 1 ? 
        '0'+ new Date(Date.parse(order.createdAt)).getMinutes() : 
        new Date(Date.parse(order.createdAt)).getMinutes()}`)

        if (dataCard < today - 86400000) { 
            const delta=now.getTime()-otherDate.getTime();
            setDate(`${Math.floor(delta/1000/60/60/24)} дня назад, ${time}`)
        } else if (dataCard < today) {
            setDate(`Вчера, ${time}`)
        } else {
            setDate(`Сегодня, ${time}`)
        }
    },[order])

    const { url } = useRouteMatch();
    const location = useLocation(); 
    const [statusOrder, setStatusOrder] = React.useState<string>();

    function handleClick() {
        onOpen(order);
    }

    useEffect(() => {
        if(currentIngredient.length > 6) {
            setCountIngredients(currentIngredient.slice(5, currentIngredient.length-1).length)
        }
    },[currentIngredient])

    useEffect(() => {
        if(order) {
            if(order.status === 'done') {
                setStatusOrder('Выполнен')
            }
            else if(order.status === 'pending') {
                setStatusOrder('Готовится')
            }
            else if(order.status === 'created') {
                setStatusOrder('Создан')
            }
        }
    },[order])

    return(
        <Link className={styleCardOrder.link} to={{
            pathname: `${url}/${order.number}`, // изменить на _id
            state: { background: location },
            }}>
        <div className={styleCardOrder.container} onClick={handleClick}>
            <div className={styleCardOrder.header}>
                <p className={`${styleCardOrder.id}`}>#{order.number}</p>
                <p className={`${styleCardOrder.date}`}>{date} i-GMT+3</p>
            </div>
            <p className={`${styleCardOrder.cardName}text text_type_main-medium ml-6`}>{order.name}</p>
            {isStatus ? 
            <p className={`${styleCardOrder.status}`} style={statusOrder === 'Выполнен' ? {color: '#00CCCC'} : {color: '#F2F2F3'}}>{statusOrder}</p>
            : null}
            <div className={styleCardOrder.footer}>
                <ul className={styleCardOrder.icons}>
                {currentIngredient.map((ingredient, index) => { 

                    if(currentIngredient.length > 6 && index === 5) {
                        return (
                            <li className={styleCardOrder.icon} key={index}>
                                <img className={styleCardOrder.lastPick} src={ingredient.image}></img>
                                <span className={styleCardOrder.count}>{countIngredients}</span>
                            </li>
                        )
                    }
                    else {
                        return(
                        <li className={styleCardOrder.icon} key={index}>
                                <img className={styleCardOrder.pick} src={ingredient.image}></img>
                            </li>
                        )
                    }
                 })}
                </ul>
                <div className={styleCardOrder.price}>
                    <p className={`${styleCardOrder.priceValue}text text_type_digits-default mr-2`}>{currentPrice}</p>
                    <CurrencyIcon type="primary" />
                </div>
            </div>
        </div>
        </Link>
    )
}

export default CardOrder;