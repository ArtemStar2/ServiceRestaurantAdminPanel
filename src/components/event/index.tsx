import { FC } from "react";
import { IEvent } from '../../models/IEvent'
import { Link } from "react-router-dom";

interface EventItem{
    value: IEvent;
    deleteEvent: Function;
}

const EventItem : FC<EventItem> = ({value, deleteEvent}) => {
    return (
        <li className="event__item">
            <span>
                {value?.id}
            </span>
            <Link to={'/admin/events/' + value.id}>
                {value.name}
            </Link>
            <span className="name">
                {value.date.split('T')[0] + '  ' + value.date.split('T')[1]}
            </span>
            <div className="delete" onClick={() => deleteEvent(value.id)}>
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" version="1.1" viewBox="0 0 32 32">
                    <g transform="scale(2)">
                    <circle style={{fill:"#f44336"}} cx="8" cy="8" r="7"/>
                    <rect style={{fill:"#ffffff"}} width="2" height="10" x="-.98" y="-16.29" transform="rotate(135)"/>
                    <rect style={{fill:"#ffffff"}} width="2" height="10" x="-12.29" y="-5.01" transform="rotate(-135)"/>
                    </g>
                </svg>
            </div>
        </li>
    );
};

export default EventItem;