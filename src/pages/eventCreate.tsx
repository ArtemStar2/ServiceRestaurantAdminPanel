import { FC, useState, ChangeEvent } from "react";
import eventService from '../services/eventService'
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const EventCreate : FC = () => {
    const [name, setName] = useState<string>('');
    const [date, setDate] = useState<string>('');
    const [file, setFile] = useState<File | any>();

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        console.log(e.target.files)
        if (e.target.files) {
            console.log(e.target.files[0]);
            setFile(e.target.files[0]);
        }
    };
    let navigate = useNavigate();
    const eventCreate = async (name: string, date: string, images:File) => {
        try {
            console.log(images);
            const formData = new FormData();
            formData.append("name", name);
            formData.append("date", date);
            formData.append("images", images);
            await eventService.createEvents(formData);
            toast.success('Успешно создан')
            return navigate("/events");
        } catch (error:any) {
            toast.error('Ошибка: ' + error?.response?.data?.massage)
        }
    }
    return (
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
            </div>
            <div className="right">
                <label htmlFor="photo">
                    {file?.name ? file.name : 'Загрузить фото'}
                    <input id="photo" name={'file'} type="file" onChange={handleFileChange} />
                </label>
            </div>
        </div>
        <div className="product__box three">
            <button className='users__add' onClick={() => eventCreate(name, date, file)}>Создать мероприятие</button>
        </div>
        </> 
    );
};

export default EventCreate;