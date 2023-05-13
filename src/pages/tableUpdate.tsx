import { FC, useEffect, useState } from "react";
import tableService from '../services/tableService'
import { ITable } from "../models/ITable";
import toast from "react-hot-toast";
import Loading from "../components/loading";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const TableUpdate : FC = () => {
    const params = useParams();
    const [item, setItem] = useState<ITable >();
    const [dateStart, setDateStart] = useState<string>('');
    const [dateEnd, setDateEnd] = useState<string>('');
    const [table, setTable] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(true)

    useEffect(() => {
        getTables();
    }, [])

    let navigate = useNavigate();
    async function getTables() {
        try {
            const response = await tableService.fetchTableOne(params.id)
            if(!response.data){
                return navigate("/events");
            }
            setItem(response.data)
            setDateStart(response.data.dateStart)
            setDateEnd(response.data.dateEnd)
            setTable(response.data.table_id)
            setLoading(false);
        } catch (error: any) {
            toast.error('Ошибка: ' + error?.response?.data?.massage)
        }
    }

    const tableUpdate = async (id:any,dateStart: string, dateEnd: string, table_id:string) => {
        try {
            const formData = new FormData();
            formData.append("id", id);
            formData.append("dateStart", dateStart);
            formData.append("dateEnd", dateEnd);
            formData.append("table_id", table_id);
            await tableService.TableUpdate(formData);
            toast.success('Успешно создан')
            return navigate("/tables");
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
                        <span>Дата начала</span>
                        <input
                            name={'dateStart'}
                            className='input__style'
                            onChange={e => setDateStart(e.target.value)}
                            value={dateStart}
                            type="datetime-local"
                            placeholder={'Дата'}
                        />
                        <span>Дата</span>
                        <input
                            name={'date'}
                            className='input__style'
                            onChange={e => setDateEnd(e.target.value)}
                            value={dateEnd}
                            type="datetime-local"
                            placeholder={'Дата'}
                        />
                        <span>Номер стола</span>
                        <input
                            name={'table'}
                            className='input__style'
                            onChange={e => setTable(e.target.value)}
                            value={table}
                            type="text"
                            placeholder={'Название'}
                        />
                    </div>
                </div>
                <div className="product__box three">
                    <button className='users__add' onClick={() => tableUpdate(item?.id,dateStart, dateEnd, table)}>Изменить бронь</button>
                </div>
            </>
        }
        </> 
    );
};

export default TableUpdate;