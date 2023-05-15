import { FC, useEffect, useState } from "react";
import SidebarEvent from "./component/menu";
import { IEvent } from "../../models/IEvent";
import eventService from "../../services/eventService";
import toast from "react-hot-toast";
import Loading from "../../components/loading";
import { Link } from "react-router-dom";


const EventList : FC = () => {
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
    return (
        <div className="client">
            <SidebarEvent />
            <div className={loading ? 'eventClient__list center' : 'eventClient__list'}>
            {loading ?
            <Loading />
            :
                <>
                {events?.map(event => 
                    <Link className="eventClient__item" to={'/event/' + event.id}>
                        <span className="name">{event.name}</span>
                        <span className="date">{event.date.split('T')[0] + ' ' + event.date.split('T')[1].split(':')[0]+ ':' + event.date.split('T')[1].split(':')[1]}</span>
                    </Link>   
                )}
                </>
            }
            </div>
        </div>
    );
};

export default EventList;