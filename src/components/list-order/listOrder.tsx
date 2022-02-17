import styleListOrder from "./listOrder.module.css";
import CardOrder from '../card-order/cardOrder';
import { useSelector } from "../../services/types/hooks";
import { FC, useEffect, useState } from 'react';
import {TOrders} from '../../services/types/data';

interface IListOrder{
  openModal: () => void;
  onClose: () => void;
}

const ListOrder: FC<IListOrder> = ({openModal, onClose}) => {
    const [isOrder, setIsOrder] = useState<TOrders[]>()
    const { messages } = useSelector(state => state.wsReducer);
    
    useEffect(() => {
        if(messages) {
            if(messages.orders) {
                setIsOrder(messages.orders)
            }
        }
    }, [messages])

    return(
        <section className={styleListOrder.block}>
            <h2 className={`${styleListOrder.title}text text_type_main-large mb-5 mt-10`}>
            Лента заказов
            </h2>
            <div className={styleListOrder.container}>
                {isOrder ? isOrder.map((item: any) => {
                    return (
                        <CardOrder
                            order={item}
                            key={item._id}
                            status={false}
                            onOpen={openModal}
                            onClose={onClose}
                        />
                    )
                }) : null}
            </div>
        </section>
    )
}

export default ListOrder