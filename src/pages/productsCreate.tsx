import { FC, useState, ChangeEvent } from "react";
import productService from '../services/productService'
import toast from "react-hot-toast";
import Select from 'react-select';
import { useNavigate } from "react-router-dom";

const ProductsCreate : FC = () => {
    const [name, setName] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [file, setFile] = useState<File | any>();
    const [price, setPrice] = useState<string>('');
    const [category, setCategory] = useState<'Еда' | 'Напитки' | 'Алкоголь' | any>();

    const options: any = [
        { value: 'Еда', label: 'Еда' },
        { value: 'Напитки', label: 'Напитки' },
        { value: 'Алкоголь', label: 'Алкоголь' }
    ]
    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        console.log(e.target.files)
        if (e.target.files) {
            console.log(e.target.files[0]);
            setFile(e.target.files[0]);
        }
    };
    let navigate = useNavigate();
    const productCreate = async (name: string, description: string, images:File, price: string, category: any) => {
        try {
            console.log(images);
            const formData = new FormData();
            formData.append("name", name);
            formData.append("description", description);
            formData.append("images", images);
            formData.append("price", price);
            formData.append("category", category.value);
            await productService.createProducts(formData);
            toast.success('Успешно создан')
            return navigate("/product");
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
                <span>Описание</span>
                <textarea 
                    name={'description'}
                    className='input__style'
                    onChange={e => setDescription(e.target.value)}
                    value={description}
                    placeholder={'Описание'}>
                </textarea>
            </div>
            <div className="right">
                <label htmlFor="photo">
                    {file?.name ? file.name : 'Загрузить фото'}
                    <input id="photo" name={'file'} type="file" onChange={handleFileChange} />
                </label>
            </div>
        </div>
        <div className="product__box three">
            <div className="box">
                <span>Цена</span>
                <input
                    name={'price'}
                    className='input__style'
                    onChange={e => setPrice(e.target.value)}
                    value={price}
                    type="number"
                    placeholder={'Цена'}
                />
            </div>
            <div className="box">
                <span>Категория</span>
                <Select
                    className="react-select-container"
                    classNamePrefix="react-select"
                    defaultValue={category}
                    onChange={setCategory}
                    options={options}
                />
            </div>
            <button className='users__add' onClick={() => productCreate(name, description, file, price, category)}>Добавить товар</button>
        </div>
        </> 
    );
};

export default ProductsCreate;