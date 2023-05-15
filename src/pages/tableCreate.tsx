import { FC, useState } from "react";
import tableService from '../services/tableService'
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const TableCreate : FC = () => {
    const [date, setDate] = useState<string>('');
    let navigate = useNavigate();
    const eventCreate = async (date: string) => {
        try {
            const formData = new FormData();
            formData.append("date", date);
            formData.append("event", '');
            await tableService.createTable(formData);
            toast.success('Успешно создан')
            return navigate("/admin/tables");
        } catch (error:any) {
            toast.error('Ошибка: ' + error?.response?.data?.massage)
        }
    }
    return (
        <>
        <div className="product__box two">
            <div className="left__colum">
                <span>Дата</span>
                <input
                    name={'date'}
                    className='input__style'
                    onChange={e => setDate(e.target.value)}
                    value={date}
                    type="datetime-local"
                    placeholder={'Дата'}
                />
            </div>
        </div>
        <div className="product__box three">
            <button className='users__add' onClick={() => eventCreate(date)}>Создать бронь</button>
        </div>
        </> 
    );
};

export default TableCreate;