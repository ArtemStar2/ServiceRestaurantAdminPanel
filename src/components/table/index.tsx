import { FC } from "react";
import { ITable } from '../../models/ITable'
import { Link } from "react-router-dom";

interface TableItem{
    value: ITable;
    tableDelete: Function
}

const TableItem : FC<TableItem> = ({value, tableDelete}) => {
    return (
        <li className="table__item">
            <Link to={'/admin/tables/' + value.id}>
                {value.userid}
            </Link>
            <span>
                {value?.datestart.split('T')[0] + '  ' + value?.datestart.split('T')[1]}
            </span>
            <span>
                {value?.dateend.split('T')[0] + '  ' + value?.dateend.split('T')[1]}   
            </span>
            <span>
                {value.table_id}
            </span>
            <div className="delete" onClick={() => tableDelete(value.id)}>
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

export default TableItem;