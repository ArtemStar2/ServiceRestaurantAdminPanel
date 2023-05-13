import { FC, useState } from "react";
import orderService from '../services/orderService'
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";


const OrderCreate : FC = () => {
    const [userId, setUserId] = useState<string>('');
    const [date, setDate] = useState<string>('');
    const [products, setProducts] = useState<File | any>();

    let navigate = useNavigate();
    const orderCreate = async (userId: string, date: string, products:File) => {
        try {
            const formData = new FormData();
            formData.append("userId", userId);
            formData.append("date", date);
            formData.append("products", products);
            await orderService.createOrder(formData);
            toast.success('Успешно создан')
            return navigate("/orders");
        } catch (error:any) {
            toast.error('Ошибка: ' + error?.response?.data?.massage)
        }
    }
    return (
        <>
            <div className="product__box two">
                <div className="left__colum">
                    <span>ID Пользователи</span>
                    <input
                        name={'userId'}
                        className='input__style'
                        onChange={e => setUserId(e.target.value)}
                        value={userId}
                        type="text"
                        placeholder={'ID Пользователи'}
                    />
                    <span>Дата</span>
                    <input
                        name={'date'}
                        className='input__style'
                        onChange={e => setDate(e.target.value)}
                        value={date}
                        type="datetime-local"
                        placeholder={'Дата'}
                    />
                    <span>Товары (вводить id товаров через запятую)</span>
                    <input
                        name={'date'}
                        className='input__style'
                        onChange={e => setProducts(e.target.value)}
                        value={products}
                        type="text"
                        placeholder={'Товары'}
                    />
                </div>
            </div>
            <div className="product__box three">
                <button className='users__add' onClick={() => orderCreate(userId, date, products)}>Создать заказ</button>
            </div>
        </> 
    );
};

export default OrderCreate;