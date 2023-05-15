import { FC, useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { observer } from "mobx-react-lite";

import SidebarEvent from "./component/menu";
import eventService from "../../services/eventService";
import { IEvent } from "../../models/IEvent";
import Loading from "../../components/loading";

const EventItemOne : FC = () => {
    const params = useParams();
    const [event, setEvent] = useState<any>()
    const [loading, setLoading] = useState<boolean>(true)
    useEffect(() => {
        getEvent();
    }, [])
    let navigate = useNavigate();

    async function getEvent() {
        try {
            const response = await eventService.fetchEventOne(params.id)
            if(!response.data){
                return navigate("/admin/events");
            }
            setEvent(response.data)
            setLoading(false);
        } catch (error: any) {
            toast.error('Ошибка: ' + error?.response?.data?.massage)
        }
    }
    console.log(event)
    return (
        <div className="client">
            <SidebarEvent />
            <div className={loading ? 'center' : ''}>
                {loading ?
                    <Loading />
                :   
                    <>{event[0]?.name}</>
                }
            </div>
        </div>
    );
};

export default EventItemOne;