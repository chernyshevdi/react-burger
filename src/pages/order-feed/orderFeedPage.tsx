import styleOrderFeed from "./orderFeed.module.css";
import ListOrder from '../../components/list-order/listOrder';
import StatusOrder from '../../components/statusOrder/statusOrder';
import { FC, useEffect } from 'react';
import { useDispatch } from "../../services/types/hooks";
import {wsConnectionStartAction, wsConnectionClosedAction} from '../../services/actions/wsAction';

interface IOrderFeed {
  openModal: () => void;
  onClose: () => void;
}

const OrderFeed: FC<IOrderFeed> = ({openModal, onClose}) => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(wsConnectionStartAction())
        return () => {
            dispatch(wsConnectionClosedAction())
        }
      },[dispatch])

    return(
        <section className={styleOrderFeed.block}>
            <ListOrder 
                openModal={openModal}
                onClose={onClose}
            />
            <StatusOrder/>
        </section>
    )
}
export default OrderFeed;