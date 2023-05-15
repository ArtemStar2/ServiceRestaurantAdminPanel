import { FC, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import productService from "../../../services/productService";
import { Context } from "../../../main";


interface Order{
    id: string | undefined;
    count: number;
}
interface CompOrder{
    value: Order;
    index: number;
}

const OrderProductOne : FC<CompOrder> = ({index, value}) => {
    const {store} = useContext(Context)
    const [products, setProduct] = useState<any>()
    useEffect(() => {
        getOrder();
    }, [])

    async function getOrder() {
        try {
            const response = await productService.fetchProductOne(value.id)
            console.log(response.data);
            setProduct(response.data);
        } catch (error: any) {
            toast.error('Ошибка: ' + error?.response?.data?.massage)
        }
    }
    function deleteOrder(index: number){
        store.deleteOrder(index);
    }
    return (
        <div className="orderClient__item">
            <span className="name">{products?.name}</span>
            <span className="price">Цена: {products?.price}</span>
            <span className="all_price">Количество: {value.count}</span>
            <div className="delete" onClick={() => deleteOrder(index)}>
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" version="1.1" viewBox="0 0 32 32">
                <g transform="scale(2)">
                <circle style={{fill:"#f44336"}} cx="8" cy="8" r="7"/>
                <rect style={{fill:"#ffffff"}} width="2" height="10" x="-.98" y="-16.29" transform="rotate(135)"/>
                <rect style={{fill:"#ffffff"}} width="2" height="10" x="-12.29" y="-5.01" transform="rotate(-135)"/>
                </g>
            </svg>
            </div>
        </div>
    );
};

export default OrderProductOne;