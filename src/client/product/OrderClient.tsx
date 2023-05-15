import { FC, useState } from "react";
import SidebarProduct from "./component/menu";
import { useContext } from "react";
import { toJS } from "mobx";
import { Context } from "../../main";
import OrderProductOne from "./component/orderItem";
import { observer } from "mobx-react-lite";
import orderService from "../../services/orderService";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const OrderClient : FC = () => {
    const {store} = useContext(Context)
    const [table_id, setTable] = useState<any>('')
    const orders = toJS(store.order);
    console.log(orders);
    var cost = 0;
    orders.forEach(value => {
        cost += value.price * value.count;
    })

    let navigate = useNavigate();
    const orderCreate = async (userId: string, orders:any, table_id:string) => {
        try {
            const formData = new FormData();
            formData.append("userId", userId);
            formData.append("products", JSON.stringify(orders));
            formData.append("table_id", table_id);
            await orderService.createOrder(formData);
            toast.success('Успешно заказан');
            store.clearOrder();
            return navigate("/menu/");
        } catch (error:any) {
            toast.error('Ошибка: ' + error?.response?.data?.massage)
        }
    }
    if(orders.length == 0){
        navigate("/menu/");
    }
    return (
        <div className="client">
            <SidebarProduct />
            <div className="orderClient__list">
                {orders?.map((order, index)=> 
                    <OrderProductOne key={order.id} index={index} value={order}/> 
                )}
            </div>
            <div className="orderClient__info">
                <div className="two">
                    <input
                        name={'table_id'}
                        className='input__style'
                        onChange={e => setTable(e.target.value)}
                        value={table_id}
                        type="number"
                        placeholder={'Номер стола'}
                    />
                    <span className="allCost">
                    Всего: {cost} руб.
                    </span>
                </div>
                <button className='users__add' onClick={() => orderCreate(toJS(store.user.id), orders, table_id)}>Заказать</button>
            </div>
            
        </div>
    );
};

export default observer(OrderClient);