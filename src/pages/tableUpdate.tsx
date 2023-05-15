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

    const tableUpdate = async (id:any,date: string) => {
        try {
            const formData = new FormData();
            formData.append("id", id);
            formData.append("date", date);
            formData.append("event", '');
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
                    </div>
                </div>
                <div className="product__box three">
                    <button className='users__add' onClick={() => tableUpdate(item?.id,date)}>Изменить бронь</button>
                </div>
            </>
        }
        </> 
    );
};

export default TableUpdate;