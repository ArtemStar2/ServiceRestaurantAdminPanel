import { FC, useState } from "react";
import tableService from "../../services/tableService";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";

const FormTable : FC = () => {
    const [date, setDate] = useState<string>('');
    let navigate = useNavigate();
    const params = useParams();
    const eventCreate = async (date: string) => {
        try {
            const formData = new FormData();
            formData.append("date", date);
            formData.append("event", params.id ? params.id : '');
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
            </div>
            <button className='users__add' onClick={() => eventCreate(date)}>Забронировать</button>
        </div>
    );
};

export default FormTable;