import { FC, useState } from "react";
import tableService from '../services/tableService'
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const TableCreate : FC = () => {
    const [dateStart, setDateStart] = useState<string>('');
    const [dateEnd, setDateEnd] = useState<string>('');
    const [table, setTable] = useState<string>('');
    let navigate = useNavigate();
    const eventCreate = async (dateStart: string, dateEnd: string, table_id:string) => {
        try {
            const formData = new FormData();
            formData.append("dateStart", dateStart);
            formData.append("dateEnd", dateEnd);
            formData.append("table_id", table_id);
            await tableService.createTable(formData);
            toast.success('Успешно создан')
            return navigate("/tables");
        } catch (error:any) {
            toast.error('Ошибка: ' + error?.response?.data?.massage)
        }
    }
    return (
        <>
        <div className="product__box two">
            <div className="left__colum">
                <span>Дата начала</span>
                <input
                    name={'dateStart'}
                    className='input__style'
                    onChange={e => setDateStart(e.target.value)}
                    value={dateStart}
                    type="datetime-local"
                    placeholder={'Дата'}
                />
                <span>Дата</span>
                <input
                    name={'date'}
                    className='input__style'
                    onChange={e => setDateEnd(e.target.value)}
                    value={dateEnd}
                    type="datetime-local"
                    placeholder={'Дата'}
                />
                <span>Номер стола</span>
                <input
                    name={'table'}
                    className='input__style'
                    onChange={e => setTable(e.target.value)}
                    value={table}
                    type="text"
                    placeholder={'Номер'}
                />
            </div>
        </div>
        <div className="product__box three">
            <button className='users__add' onClick={() => eventCreate(dateStart, dateEnd, table)}>Создать бронь</button>
        </div>
        </> 
    );
};

export default TableCreate;