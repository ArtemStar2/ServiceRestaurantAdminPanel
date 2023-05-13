import { FC } from "react";
import { IEvent } from '../../models/IEvent'
import { ReactSVG } from "react-svg";
import { Link } from "react-router-dom";

interface EventItem{
    value: IEvent;
    deleteEvent: Function;
}

const EventItem : FC<EventItem> = ({value, deleteEvent}) => {
    return (
        <li className="event__item">
            <Link to={'/events/' + value.id}>
                <img src={import.meta.env.VITE_URL_DATABASE + import.meta.env.VITE_FILE + value.images} alt="" />
            </Link>
            <span className="name">
                {value.name}
            </span>
            <span className="name">
                {value.date.split('T')[0] + '  ' + value.date.split('T')[1]}
            </span>
            <ReactSVG className="delete" onClick={() => deleteEvent(value.id)} src={"/src/assets/svg/delete.svg"} /> 
        </li>
    );
};

export default EventItem;