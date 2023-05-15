import { FC, useEffect, useState } from "react";
import orderService from '../services/orderService'
import { IOrder } from "../models/IOrder";
import toast from "react-hot-toast";
import Loading from "../components/loading";
// import { Link } from "react-router-dom";
import OrderItem from "../components/order";

const Order : FC = () => {
    const [orders, setOrders] = useState<IOrder[]>([])
    const [loading, setLoading] = useState<boolean>(true)

    useEffect(() => {
        getOrders();
    }, [])

    async function getOrders() {
        try {
            const response = await orderService.fetchEvent()
            setOrders(response.data);
            setLoading(false);
        } catch (error: any) {
            toast.error('Ошибка: ' + error?.response?.data?.massage)
        }
    }
    const deleteOrder = async (id:string) => {
        try {
            await orderService.deleteOrder(id)
            getOrders();
            toast.success('Успешно удалено')
            
        } catch (error: any) {
            toast.error('Ошибка: ' + error?.response?.data?.massage)
        }
    }
    console.log(orders);
    return (
        <>
        {/* <div className="users__form">
            <Link className='users__add' to={'/orders/create'}>Добавить заказ</Link>
        </div> */}
        {loading ?
            <Loading />
        :
            <ul className="order__list">
                <li className="order__item titleList">
                    <span>ID</span>
                    <span>ID пользователя</span>
                    <span>Дата</span>
                    <span>Сумма</span>
                    <span>Товары</span>
                    <span>Стол</span>
                    <span></span>
                </li>
                {orders?.map(order => 
                    <OrderItem key={order.id} value={order} deleteOrder={deleteOrder}/>
                )}
            </ul>
        }
        </> 
    );
};

export default Order;