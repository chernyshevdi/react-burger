import styleOrderFeed from "./orderFeed.module.css";
import ListOrder from '../../components/list-order/listOrder';
import StatusOrder from '../../components/statusOrder/statusOrder';
import { FC } from 'react';

interface IOrderFeed {
  openModal: () => void;
  onClose: () => void;
}

const OrderFeed: FC<IOrderFeed> = ({openModal, onClose}) => {
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