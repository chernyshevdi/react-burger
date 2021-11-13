import React from 'react';
import styleOrder from "../OrderDetails/OrderDetails.module.css";

function OrderDetails() {
    return((
    <div className={styleOrder.container}>
        <p className="text text_type_digits-large mt-30 mb-8">034536</p>
        <p className="text text_type_main-medium mb-15">идентификатор заказа</p>
        <div className={`${styleOrder.done} mb-15`}></div>
        <p className="text text_type_main-default mb-2">Ваш заказ начали готовить</p>
        <p className={"text text_type_main-default text_color_inactive mb-30"}>Дождитесь готовности на орбитальной станции</p>
    </div>
    ))
}

export default OrderDetails;