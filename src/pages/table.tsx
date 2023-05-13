import { FC, useEffect, useState } from "react";
import tableService from '../services/tableService'
import { ITable } from "../models/ITable";
import toast from "react-hot-toast";
import Loading from "../components/loading";
import { Link } from "react-router-dom";
import TableItem from "../components/table";

const Event : FC = () => {
    const [tables, setTables] = useState<ITable[]>([])
    const [loading, setLoading] = useState<boolean>(true)

    useEffect(() => {
        getEvents();
    }, [])

    async function getEvents() {
        try {
            const response = await tableService.fetchTable()
            setTables(response.data);
            setLoading(false);
        } catch (error: any) {
            toast.error('Ошибка: ' + error?.response?.data?.massage)
        }
    }
    const tableDelete = async (id:string) => {
        try {
            await tableService.deleteTables(id)
            getEvents();
            toast.success('Успешно удалено')
            
        } catch (error: any) {
            toast.error('Ошибка: ' + error?.response?.data?.massage)
        }
    }
    return (
        <>
        <div className="users__form">
            <Link className='users__add' to={'/admin/tables/create'}>Добавить бронь</Link>
        </div>
        {loading ?
            <Loading />
        :
            <ul className="table__list">
                <li className="table__item titleList">
                    <span>Id Пользователя</span>
                    <span>Начало</span>
                    <span>Конец</span>
                    <span>Номер стола</span>
                    <span></span>
                </li>
                {tables?.map(table => 
                    <TableItem key={table.id} value={table} tableDelete={tableDelete}/>
                )}
            </ul>
        }
        </> 
    );
};

export default Event;