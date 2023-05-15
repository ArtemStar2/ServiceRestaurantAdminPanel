import { FC, useEffect, useState } from "react";
import { IOrder } from '../../models/IOrder'
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
    console.log(products);
    return (
        <li className="order__item">
            <span className="name">
                {value.id}
            </span>
            <span>
                {value.userid}
            </span>
            <span>
                {value.date.split('T')[0] + ' ' + value.date.split('T')[1].split(':')[0]+ ':' + value.date.split('T')[1].split(':')[1]}
            </span>
            <span className="price">{price} руб.</span>
            <span className="order__product-list" >
                {products?.map((product:any) => 
                    <span className="order__product" key={product.id}>
                        <span className="name">{product.name}</span>
                        <span className="cost">{product.count} * {product.price} руб.</span>
                    </span>
                )}
            </span> 
            <span>{value.table_id}</span>
            <div className="delete" onClick={() => deleteOrder(value.id)}>
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" version="1.1" viewBox="0 0 32 32">
                    <g transform="scale(2)">
                    <circle style={{fill:"#f44336"}} cx="8" cy="8" r="7"/>
                    <rect style={{fill:"#ffffff"}} width="2" height="10" x="-.98" y="-16.29" transform="rotate(135)"/>
                    <rect style={{fill:"#ffffff"}} width="2" height="10" x="-12.29" y="-5.01" transform="rotate(-135)"/>
                    </g>
                </svg>
            </div>
        </li>
    );
};

export default OrderItem;