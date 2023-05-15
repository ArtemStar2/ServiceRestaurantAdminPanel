import { FC, useEffect, useState } from "react";
import eventService from '../services/eventService'
import { IEvent } from "../models/IEvent";
import toast from "react-hot-toast";
import Loading from "../components/loading";
import { Link } from "react-router-dom";
import EventItem from "../components/event";

const Event : FC = () => {
    const [events, setEvents] = useState<IEvent[]>([])
    const [loading, setLoading] = useState<boolean>(true)

    useEffect(() => {
        getEvents();
    }, [])

    async function getEvents() {
        try {
            const response = await eventService.fetchEvent()
            setEvents(response.data);
            setLoading(false);
        } catch (error: any) {
            toast.error('Ошибка: ' + error?.response?.data?.massage)
        }
    }
    const deleteEvent = async (id:string) => {
        try {
            await eventService.deleteEvents(id)
            getEvents();
            toast.success('Успешно удалено')
            
        } catch (error: any) {
            toast.error('Ошибка: ' + error?.response?.data?.massage)
        }
    }
    return (
        <>
        <div className="users__form">
            <Link className='users__add' to={'/admin/events/create'}>Добавить мероприятие</Link>
        </div>
        {loading ?
            <Loading />
        :
            <ul className="event__list">
                <li className="event__item titleList">
                    <span>id</span>
                    <span>Название</span>
                    <span>Дата</span>
                    <span></span>
                </li>
                {events?.map(event => 
                    <EventItem key={event.id} value={event} deleteEvent={deleteEvent}/>
                )}
            </ul>
        }
        </> 
    );
};

export default Event;