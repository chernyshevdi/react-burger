import styleOrderInformation from "./orderInformation.module.css";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useSelector } from "../../services/types/hooks";
import React, { useEffect } from 'react';
import {TIngredient} from '../../services/types/data';
import { FC } from 'react';
import { useParams } from "react-router-dom";

interface IOrderInformation {
    modal: (id: string) => void;
  }

const OrderInformation: FC<IOrderInformation> = ({modal}) =>  {
    const { id } = useParams<{id?: string}>();

    useEffect(() => {
      if(id) {
        modal(id)
      }
    },[id])

    const { currentOrder } = useSelector(state => state.appReducer);
    const { ingredients } = useSelector(state => state.ingredientsReducer);
    const [currentIngredient, setCurrentIngredient] = React.useState<TIngredient[]>([]);
    const [date, setDate] = React.useState<string>();
    const [currentPrice, setCurrentPrice] = React.useState<number>();
    const [statusOrder, setStatusOrder] = React.useState<string>();

    useEffect(() => {
        if(currentOrder!.ingredients) {
            const order: TIngredient[] = [];
            currentOrder!.ingredients.map((id) => {
                const ingredient = ingredients.filter(i => i._id === id)
                order.push(ingredient[0])
            }) 
            setCurrentIngredient(order)
        }
    },[currentOrder])

    useEffect(() => {
        const now = new Date();
        const otherDate = new Date(Date.parse(currentOrder!.createdAt))
        const today = new Date(now.getFullYear(), now.getMonth(), now.getDate()).valueOf()
        const dataCard = Date.parse(currentOrder!.createdAt).valueOf()

        const time =(`${new Date(Date.parse(currentOrder!.createdAt)).getHours()}:${new Date(Date.parse(currentOrder!.createdAt)).getMinutes().toString().length === 1 ? 
        '0'+ new Date(Date.parse(currentOrder!.createdAt)).getMinutes() : 
        new Date(Date.parse(currentOrder!.createdAt)).getMinutes()}`)

        if (dataCard < today - 86400000) { 
            const delta=now.getTime()-otherDate.getTime();
            setDate(`${Math.floor(delta/1000/60/60/24)} дня назад, ${time}`)
        } else if (dataCard < today) {
            setDate(`Вчера, ${time}`)
        } else {
            setDate(`Сегодня, ${time}`)
        }
    },[currentOrder!])

    useEffect(() => {
        const sum = currentIngredient.reduce((cur: number, item: TIngredient) => {
            return (cur + item.price);
        }, 0)
            setCurrentPrice(sum)
    },[currentIngredient])

    const uniqueIngredient = Array.from(new Set(currentIngredient))

    useEffect(() => {
        if(currentOrder) {
            if(currentOrder.status === 'done') {
                setStatusOrder('Выполнен')
            }
            else if(currentOrder.status === 'pending') {
                setStatusOrder('Готовится')
            }
            else if(currentOrder.status === 'created') {
                setStatusOrder('Создан')
            }
        }
    },[currentOrder])

    return(
        <section className={styleOrderInformation.container}>
            <p className={styleOrderInformation.id}>#{currentOrder!.number}</p>
            <h2 className="text text_type_main-medium">{currentOrder!.name}</h2>
            <p className={styleOrderInformation.status} style={statusOrder === 'Выполнен' ? {color: '#00CCCC'} : {color: '#F2F2F3'}}>{statusOrder}</p>
            <p className="text text_type_main-medium mb-6">Состав:</p>
            <div className={styleOrderInformation.orderList}>
                <ul className={styleOrderInformation.list}>
                    {uniqueIngredient.map((elem, index) => {
                        
                        const repeat = currentIngredient.filter(item => item._id === elem._id).length;
                        
                        return(
                            <li className={styleOrderInformation.ingredient} key={index}>
                                <div className={styleOrderInformation.icon}>
                                    <img className={styleOrderInformation.img} src={elem.image}></img>
                                </div>
                                <p className={styleOrderInformation.name}>{elem.name}</p>
                                <div className={styleOrderInformation.price}>
                                    <p className={styleOrderInformation.priceValue}>{repeat} x {elem.price}</p>
                                    <CurrencyIcon type="primary" />
                                </div>
                            </li>
                        )
                    })}
                </ul>
            </div>
            <div className={styleOrderInformation.footer}>
                <p className={styleOrderInformation.date}>{date} i-GMT+3</p>
                <div className={styleOrderInformation.resultPrice}>
                    <p className="text text_type_digits-default mr-2">{currentPrice}</p>
                    <CurrencyIcon type="primary" />
                </div>
            </div>
        </section>
    )
}

export default OrderInformation;