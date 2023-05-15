import { FC, useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { Context } from "../../../main";
import { toJS } from "mobx";

const OrderProduct : FC = () => {
    const {store} = useContext(Context)
    const orders = toJS(store.order);
    console.log(orders);
    return (
        <>
        {orders.length > 0 ? 
            <Link to="/order/" className="orderClient__fixed">Корзина</Link>
        :
            <></>
        }
        </>

    );
};

export default OrderProduct;