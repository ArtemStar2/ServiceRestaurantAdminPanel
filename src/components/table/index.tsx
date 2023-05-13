import { FC } from "react";
import { ITable } from '../../models/ITable'
import { ReactSVG } from "react-svg";
import { Link } from "react-router-dom";

interface TableItem{
    value: ITable;
    tableDelete: Function
}

const TableItem : FC<TableItem> = ({value, tableDelete}) => {
    return (
        <li className="table__item">
            <Link to={'/admin/tables/' + value.id}>
                {value.userId}
            </Link>
            <span>
                {value.dateStart.split('T')[0] + '  ' + value.dateStart.split('T')[1]}
            </span>
            <span>
                {value.dateEnd.split('T')[0] + '  ' + value.dateEnd.split('T')[1]}   
            </span>
            <span>
                {value.table_id}
            </span>
            <ReactSVG className="delete" onClick={() => tableDelete(value.id)} src={"/src/assets/svg/delete.svg"} /> 
        </li>
    );
};

export default TableItem;