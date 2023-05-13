import { FC, useEffect, useState, ChangeEvent } from "react";
import eventService from '../services/eventService'
import { IEvent } from "../models/IEvent";
import toast from "react-hot-toast";
import Loading from "../components/loading";
import { useParams } from "react-router-dom";
// import { ReactSVG } from "react-svg";
import { useNavigate } from "react-router-dom";

const EventUpdate : FC = () => {
    const params = useParams();
    const [event, setEvent] = useState<IEvent>()
    const [loading, setLoading] = useState<boolean>(true)
    const [images, setImages] = useState<string>('');
    useEffect(() => {
        getEvent();
    }, [])
    let navigate = useNavigate();

    const [date, setDate] = useState<string>('');
    const [name, setName] = useState<string>('');
    const [file, setFile] = useState<File | any>();

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        console.log(e.target.files)
        if (e.target.files) {
          setFile(e.target.files[0]);
          
        }
    };

    async function getEvent() {
        try {
            const response = await eventService.fetchEventOne(params.id)
            if(!response.data){
                return navigate("/events");
            }
            setEvent(response.data)
            setName(response.data.name)
            setDate(response.data.date)
            setImages(response.data.images)
            setLoading(false);
        } catch (error: any) {
            toast.error('Ошибка: ' + error?.response?.data?.massage)
        }
    }

    const eventUpdate = async (id: any,name: string, date: string, images:File) => {
        try {
            const formData = new FormData();
            formData.append("id", id);
            formData.append("name", name);
            formData.append("date", date);
            formData.append("images", images);
            await eventService.EventUpdate(formData);
            getEvent()
            toast.success('Успешно создан')
            return navigate("/events");
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
                    <div className="left">
                        <span>Название</span>
                        <input
                            name={'name'}
                            className='input__style'
                            onChange={e => setName(e.target.value)}
                            value={name}
                            type="text"
                            placeholder={'Название'}
                        />
                        <span>Дата</span>
                        <input
                            name={'date'}
                            className='input__style'
                            onChange={e => setDate(e.target.value)}
                            value={date}
                            type="datetime-local"
                            placeholder={'Дата'}
                        />
                        <button className='users__add' onClick={() => eventUpdate(event?.id, name, date, file)}>Изменить мероприятие</button>
                    </div>
                    <div className="right">
                        <img src={import.meta.env.VITE_URL_DATABASE + import.meta.env.VITE_FILE + images} alt="" />
                        <label htmlFor="photo">
                            {file?.name ? file.name : 'Загрузить фото'}
                            <input id="photo" name={'file'} type="file" onChange={handleFileChange} />
                        </label>
                    </div>
                </div>
            </>
        }
        </> 
    );
};

export default EventUpdate;