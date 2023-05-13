import { FC, useEffect, useState } from "react";
import contactService from '../services/contactService'
import { IContact } from "../models/IContact";
import toast from "react-hot-toast";
import Loading from "../components/loading";

const Contact : FC = () => {
    const [item, setItem] = useState<IContact >();
    const [phone, setPhone] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [telegram, setTelegram] = useState<string>('');
    const [website, setWebsite] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(true)

    useEffect(() => {
        getTables();
    }, [])

    async function getTables() {
        try {
            const response = await contactService.fetchContact()
            setItem(response.data)
            console.log(response.data)
            if(response.data.phone)
                setPhone(response.data.phone)
            
            if(response.data.email)
                setEmail(response.data.email)
            if(response.data.telegram)
                setTelegram(response.data.telegram)
            if(response.data.website)
                setWebsite(response.data.website)

            setLoading(false);
        } catch (error: any) {
            toast.error('Ошибка: ' + error?.response?.data?.massage)
        }
    }

    const sumbmit = async (id:any,phone: string, email: string, telegram:string, website:string) => {
        try {
            const formData = new FormData();
            formData.append("phone", phone);
            formData.append("email", email);
            formData.append("telegram", telegram);
            formData.append("website", website);
            if(id){
                formData.append("id", id);
                await contactService.contactUpdate(formData);
            }else{
                await contactService.createContact(formData);
            }
            toast.success('Успешно обновленно')
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
                        <span>Телефон</span>
                        <input
                            name={'dateStart'}
                            className='input__style'
                            onChange={e => setPhone(e.target.value)}
                            value={phone}
                            type="text"
                            placeholder={'Телефон'}
                        />
                        <span>Почта</span>
                        <input
                            name={'date'}
                            className='input__style'
                            onChange={e => setEmail(e.target.value)}
                            value={email}
                            type="text"
                            placeholder={'Почта'}
                        />
                        <span>Telegram</span>
                        <input
                            name={'date'}
                            className='input__style'
                            onChange={e => setTelegram(e.target.value)}
                            value={telegram}
                            type="text"
                            placeholder={'Telegram'}
                        />
                        <span>WebSite</span>
                        <input
                            name={'date'}
                            className='input__style'
                            onChange={e => setWebsite(e.target.value)}
                            value={website}
                            type="text"
                            placeholder={'Сайт'}
                        />
                    </div>
                </div>
                <div className="product__box three">
                    <button className='users__add' onClick={() => sumbmit(item?.id, phone, email, telegram, website)}>Изменить контакт</button>
                </div>
            </>
        }
        </> 
    );
};

export default Contact;