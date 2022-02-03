import styleStatusOrder from "./statusOrder.module.css";
import { useSelector } from "../../services/types/hooks";
import { useEffect, useState } from "react";
import {TOrders} from '../../services/types/data';

function StatusOrder() {
    const { messages } = useSelector(state => state.wsReducer);
    const [isOrder, setIsOrder] = useState<TOrders[]>()

    useEffect(() => {
        if(messages) {
            if(messages.orders) {
                setIsOrder(messages.orders)
            }
        }
    }, [messages])

    return(
        <div className={styleStatusOrder.container}>
            <div className={styleStatusOrder.readiness}>
                <div className={styleStatusOrder.statusBlock}>
                    <h3 className="text text_type_main-medium">Готовы:</h3>
                    <ul className={styleStatusOrder.statusList}>
                        {isOrder ? isOrder.map((item, index: number) => {
                            if(item.status === 'done') {
                                return (
                                    <li className={styleStatusOrder.idReady} key={index}>{item.number}</li>
                                )
                            }
                        }) : null}
                    </ul>
                </div>
                <div className={styleStatusOrder.statusBlock}>
                    <h3 className="text text_type_main-medium">В работе:</h3>
                    <ul className={styleStatusOrder.statusList}>
                    {isOrder ? isOrder.map((item, index: number) => {
                            if(item.status === 'pending') {
                                return (
                                    <li className={styleStatusOrder.idWork} key={index}>{item.number}</li>
                                )
                            }
                        }) : null}
                    </ul>
                </div>
            </div>
            <p className="text text_type_main-medium">Выполнено за все время:</p>
            <p className="text text_type_digits-large mb-15">{messages.total}</p>
            <p className="text text_type_main-medium">Выполнено за сегодня:</p>
            <p className="text text_type_digits-large">{messages.totalToday}</p>
        </div>
    )
}
export default StatusOrder;