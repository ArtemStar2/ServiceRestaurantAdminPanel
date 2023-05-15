import { FC, useEffect, useState } from "react";
import eventService from '../services/eventService'
import { IEvent } from "../models/IEvent";
import toast from "react-hot-toast";
import Loading from "../components/loading";
import { useParams } from "react-router-dom";
// import { ReactSVG } from "react-svg";
import { useNavigate } from "react-router-dom";

const EventUpdate : FC = () => {
    const params = useParams();
    const [event, setEvent] = useState<IEvent>()
    const [loading, setLoading] = useState<boolean>(true)
    useEffect(() => {
        getEvent();
    }, [])
    let navigate = useNavigate();

    const [date, setDate] = useState<string>('');
    const [name, setName] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    async function getEvent() {
        try {
            const response = await eventService.fetchEventOne(params.id)
            if(!response.data){
                return navigate("/admin/events");
            }
            setEvent(response.data[0])
            setName(response.data[0].name)
            setDate(response.data[0].date)
            setDescription(response.data[0].description)
            setLoading(false);
        } catch (error: any) {
            toast.error('Ошибка: ' + error?.response?.data?.massage)
        }
    }

    const eventUpdate = async (id: any,name: string, date: string, description: string) => {
        try {
            const formData = new FormData();
            formData.append("id", id);
            formData.append("name", name);
            formData.append("date", date);
            formData.append("description", description);
            await eventService.EventUpdate(formData);
            getEvent()
            toast.success('Успешно создан')
            return navigate("/admin/events");
        } catch (error:any) {
            toast.error('Ошибка: ' + error?.response?.data?.massage)
        }
    }

    return (
        <>
        {loading ?
            <Loading />
        :
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
                        <button className='users__add' onClick={() => eventUpdate(event?.id, name, date, description)}>Изменить мероприятие</button>
                    </div>
                </div>
            </>
        }
        </> 
    );
};

export default EventUpdate;