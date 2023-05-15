import { FC, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import SidebarEvent from "./component/menu";
import eventService from "../../services/eventService";
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
    const tableCreate = async () => {
        try {
            
            return navigate("/menu/");
        } catch (error:any) {
            toast.error('Ошибка: ' + error?.response?.data?.massage)
        }
    }
    return (
        <div className="client">
            <SidebarEvent />
            <div className={loading ? 'center' : ''}>
                {loading ?
                    <Loading />
                :   
                    <div className="eventClient__page">
                        <h2>{event[0]?.name}</h2>
                        <p>{event[0]?.description}</p>
                        <Link to={"/table/" + params.id} className='users__add' onClick={() => tableCreate()}>Заказать</Link>
                    </div>
                }
            </div>
        </div>
    );
};

export default EventItemOne;