import styleOrderPage from "./order-page.module.css";
import OrderInformation from '../order-information/orderInformation';
import { useSelector, useDispatch } from "../../services/types/hooks";
import React, { useEffect } from "react";
import { AddModalProfileAction } from "../../services/actions/app";
import {TOrders} from '../../services/types/data';
import {wsConnectionStartAction, wsConnectionClosedAction} from '../../services/actions/wsAction';

function OrderPage() {

    const dispatch = useDispatch();
    const [currentProfileOrderId, setCurrentProfileOrderId] = React.useState<string>();
    const [currentProfileOrderItem, setCurrentProfileOrderItem] = React.useState<TOrders>();
    const { messages } = useSelector(state => state.wsReducer);
    const [isOrder, setIsOrder] = React.useState<TOrders[]>()
    const order = (id: string) => {
        setCurrentProfileOrderId(id)
      };

    useEffect(() => {
        dispatch(wsConnectionStartAction())
      },[dispatch])

      useEffect(() => {
        if(messages) {
          if(messages.orders) {
            setIsOrder(messages.orders)
          }
        }
    }, [dispatch, messages])
    
    useEffect(() => {
        if(currentProfileOrderId) {
          if(isOrder) {
            setCurrentProfileOrderItem(isOrder.find(order => order.number.toString() === currentProfileOrderId));
          }
        }
      },[dispatch, currentProfileOrderId, isOrder])
    
      useEffect(() => {
        if(currentProfileOrderItem) {
          const order = currentProfileOrderItem;
          dispatch(AddModalProfileAction(order));
        }
      }, [currentProfileOrderItem, dispatch])

    return(
        <div className={styleOrderPage.container}>
            <OrderInformation modal={order} />
        </div>
    )
}

export default OrderPage;