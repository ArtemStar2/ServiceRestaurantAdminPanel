import { FC, useEffect, useState } from "react";
import tableService from '../services/tableService'
import { ITable } from "../models/ITable";
import toast from "react-hot-toast";
import Loading from "../components/loading";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const TableUpdate : FC = () => {
    const params = useParams();
    const [item, setItem] = useState<ITable>();
    const [date, setDate] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(true)
    const [table_id, setTable] = useState<string>('');
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
            setItem(response.data[0])
            setDate(response.data[0].date)
            setLoading(false);
        } catch (error: any) {
            toast.error('Ошибка: ' + error?.response?.data?.massage)
        }
    }

    const tableUpdate = async (id:any,date: string, table_id: string) => {
        try {
            const formData = new FormData();
            formData.append("id", id);
            formData.append("date", date);
            formData.append("event", '');
            formData.append("table_id", table_id);
            await tableService.TableUpdate(formData);
            toast.success('Успешно создан')
            return navigate("/admin/tables");
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
                            name={'date'}
                            className='input__style'
                            onChange={e => setDate(e.target.value)}
                            value={date}
                            type="datetime-local"
                            placeholder={'Дата'}
                        />
                        <span>Номер столика</span>
                        <input
                            name={'table_id'}
                            className='input__style'
                            onChange={e => setTable(e.target.value)}
                            value={table_id}
                            type="number"
                            placeholder={'Номер столика'}
                        />
                    </div>
                </div>
                <div className="product__box three">
                    <button className='users__add' onClick={() => tableUpdate(item?.id,date, table_id)}>Изменить бронь</button>
                </div>
            </>
        }
        </> 
    );
};

export default TableUpdate;