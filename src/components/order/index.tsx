import { FC, useEffect, useState } from "react";
import { IOrder } from '../../models/IOrder'
import { ReactSVG } from "react-svg";

import orderService from "../../services/orderService";
import toast from "react-hot-toast";

interface OrderItem{
    value: IOrder;
    deleteOrder: Function;
}
interface Product{
    id:string;
    name: string;
    price: string;
}

const OrderItem : FC<OrderItem> = ({value, deleteOrder}) => {
    const [products, setProduct] = useState<Product[]>([])
    const [price, setPrice] = useState<string>('')
    useEffect(() => {
        getOrder();
    }, [])

    async function getOrder() {
        try {
            const response = await orderService.fetchProductOrder(value.products)
            setProduct(response.data.productOne);
            setPrice(response.data.cost)
        } catch (error: any) {
            toast.error('Ошибка: ' + error?.response?.data?.massage)
        }
    }
    return (
        <li className="order__item">
            <span className="name">
                {value.id}
            </span>
            <span>
                {value.userId}
            </span>
            <span>
                {value.date.split('T')[0] + '  ' + value.date.split('T')[1]}
            </span>
            <span className="price">{price} руб.</span>
            <span className="order__product-list" >
                {products?.map((product:any) => 
                    <span className="order__product" key={product.id}>
                        <span className="name">{product.name}</span>
                        <span className="cost">{product.price} руб.</span>
                    </span>
                )}
            </span>       
            <ReactSVG className="delete" onClick={() => deleteOrder(value.id)} src={"/src/assets/svg/delete.svg"} /> 
        </li>
    );
};

export default OrderItem;