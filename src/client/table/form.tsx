import { FC, useState } from "react";
import tableService from "../../services/tableService";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";

const FormTable : FC = () => {
    const [date, setDate] = useState<string>('');
    const [table_id, setTable] = useState<string>('');
    let navigate = useNavigate();
    const params = useParams();
    const eventCreate = async (date: string, table_id:string) => {
        try {
            const formData = new FormData();
            formData.append("date", date);
            formData.append("event", params.id ? params.id : '');
            formData.append("event", table_id);
            await tableService.createTable(formData);
            toast.success('Успешно создана')
            return navigate("/event");
        } catch (error:any) {
            toast.error('Ошибка: ' + error?.response?.data?.massage)
        }
    }
    return (
        <div className="form">
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
                <span>Номер столика</span>
                <input
                    name={'table_id'}
                    className='input__style'
                    onChange={e => setTable(e.target.value)}
                    value={table_id}
                    type="number"
                    placeholder={'Номер столика'}
                />
            </div>
            <button className='users__add' onClick={() => eventCreate(date, table_id)}>Забронировать</button>
        </div>
    );
};

export default FormTable;