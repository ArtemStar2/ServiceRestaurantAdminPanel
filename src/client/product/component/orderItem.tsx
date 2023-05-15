import { FC, useContext, useEffect, useState } from "react";
import { ReactSVG } from "react-svg";
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
            <ReactSVG className="delete" onClick={() => deleteOrder(index)} src={"/src/assets/svg/delete.svg"} /> 
        </div>
    );
};

export default OrderProductOne;