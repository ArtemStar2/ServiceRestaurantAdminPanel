import { FC, useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import productService from "../../../services/productService";
import toast from "react-hot-toast";
import Loading from "../../../components/loading";
import { Context } from "../../../main";
import { observer } from "mobx-react-lite";
import SidebarProduct from "./menu";
import OrderProduct from "./order";

const ProductOneClient : FC = () => {
    const {store} = useContext(Context)
    const [product, setProduct] = useState<any>()
    const [loading, setLoading] = useState<boolean>(true)
    const params = useParams();
    const [count, setCount] = useState<number>(1);
    useEffect(() => {
        getProduct();
    }, [params])
    let navigate = useNavigate();
    // console.log(toJS(store));
    async function getProduct() {
        try {
            const response = await productService.fetchProductOne(params.id)
            setProduct(response.data);
            setLoading(false);
        } catch (error: any) {
            toast.error('Ошибка: ' + error?.response?.data?.massage)
        }
    }
    return (
        <div className="client">
            <SidebarProduct />
            <div className={loading ? 'center' : ''}>
                {loading ?
                    <Loading />
                :   
                    <div className="client__item-page">
                        <div className="img">
                            <img src={import.meta.env.VITE_URL_DATABASE + import.meta.env.VITE_FILE + product?.images} alt="" />
                        </div>
                        <div className="name">
                            {product?.name}
                        </div>
                        <div className="category">
                            {product?.category}
                        </div>
                        <div className="description">
                            {product?.description}
                        </div>
                        <div className="price">
                            {parseInt(product?.price) * count} руб. 
                            {product?.price_old ?
                                <span className="price__old">
                                    {parseInt(product?.price_old) * count} руб.
                                </span>
                                : <></>
                            }
                        </div>
                        <div className="count">
                            <div className="minus" onClick={() => {
                                setCount(count-1 > 0 ?count-1 : count)
                            }}>
                                <svg width="18" height="2" viewBox="0 0 18 2" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M1 1L17 1" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                            </div>
                            <span className="value">{count}</span>
                            <div className="add" onClick={() => {
                                setCount(count+1)
                            }}>
                                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M9 1V17M1 9L17 9" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                            </div>
                        </div>
                        <div className="button users__add" onClick={() => {
                            toast.success('Добавлен в корзину');
                            store.addOrder(product?.id, count, parseInt(product?.price))
                            return navigate("/menu/");
                        }}>Добавить в заказ</div>
                    </div>
                }
            </div>
            <OrderProduct />
        </div>
    );
};

export default observer(ProductOneClient);