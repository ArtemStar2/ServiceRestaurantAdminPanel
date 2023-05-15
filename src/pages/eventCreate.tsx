import { FC, useState } from "react";
import eventService from '../services/eventService'
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const EventCreate : FC = () => {
    const [name, setName] = useState<string>('');
    const [date, setDate] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    let navigate = useNavigate();
    const eventCreate = async (name: string, date: string, description:string) => {
        try {
            const formData = new FormData();
            formData.append("name", name);
            formData.append("date", date);
            formData.append("description", description);
            await eventService.createEvents(formData);
            toast.success('Успешно создан')
            return navigate("/admin/events");
        } catch (error:any) {
            toast.error('Ошибка: ' + error?.response?.data?.massage)
        }
    }
    return (
        <>
        <div className="product__box two">
            <div className="left__colum">
                <span>Название</span>
                <input
                    name={'name'}
                    className='input__style'
                    onChange={e => setName(e.target.value)}
                    value={name}
                    type="text"
                    placeholder={'Название'}
                />
                <span>Описание</span>
                <input
                    name={'description'}
                    className='input__style'
                    onChange={e => setDescription(e.target.value)}
                    value={description}
                    type="text"
                    placeholder={'Описание'}
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
            </div>
        </div>
        <div className="product__box three">
            <button className='users__add' onClick={() => eventCreate(name, date, description)}>Создать мероприятие</button>
        </div>
        </> 
    );
};

export default EventCreate;