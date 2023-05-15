import { FC, useEffect, useState, ChangeEvent } from "react";
import productService from '../services/productService'
import { IProduct } from "../models/IProduct";
import toast from "react-hot-toast";
import Loading from "../components/loading";
import Select from 'react-select';
import { useNavigate, useParams } from "react-router-dom";

const ProductsUpdate : FC = () => {
    const params = useParams();
    const [product, setProduct] = useState<IProduct>()
    const [loading, setLoading] = useState<boolean>(true)
    const [images, setImages] = useState<string>('');
    useEffect(() => {
        getProduct();
    }, [])
    let navigate = useNavigate();
    const [name, setName] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [file, setFile] = useState<File | any>();
    const [price, setPrice] = useState<string>('');
    const [price_old, setPriceOld] = useState<string>('');
    const [category, setCategory] = useState<'Еда' | 'Напитки' | 'Алкоголь' | any>();

    const options: any = [
        { value: 'Еда', label: 'Еда' },
        { value: 'Напитки', label: 'Напитки' },
        { value: 'Алкоголь', label: 'Алкоголь' }
    ]
    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        console.log(e.target.files)
        if (e.target.files) {
          setFile(e.target.files[0]);
          
        }
    };

    async function getProduct() {
        try {
            const response = await productService.fetchProductOne(params.id)
            if(!response.data){
                return navigate("/admin/product");
            }
            console.log(response);
            setProduct(response.data);
            setName(response.data.name)
            setDescription(response.data.description)
            setPrice(response.data.price)
            setPriceOld(response.data.price_old);
            setCategory(options.filter(function(val:any) {
            return val.value == response.data.category;
            })[0])
            setImages(response.data.images)
            setLoading(false);
        } catch (error: any) {
            toast.error('Ошибка: ' + error?.response?.data?.massage)
        }
    }

    // const deleteProduct = async (id:string) => {
    //     try {
    //         await productService.deleteProducts(id)
    //         toast.success('Успешно удалено')
    //     } catch (error: any) {
    //         toast.error('Ошибка: ' + error?.response?.data?.massage)
    //     }
    // }

    const productUpdate = async (id: any,name: string, description: string, images:File, price: string, price_old:string, category: any) => {
        try {
            const formData = new FormData();
            formData.append("id", id);
            formData.append("name", name);
            formData.append("description", description);
            formData.append("images", images);
            formData.append("price", price);
            formData.append("category", category.value);
            formData.append("price_old", price_old);
            await productService.productUpdate(formData);
            toast.success('Успешно изменён')
            return navigate("/admin/product");
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
                        <img src={import.meta.env.VITE_URL_DATABASE + import.meta.env.VITE_FILE + images} alt="" />
                        <label htmlFor="photo">
                            Изменить фото
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
                        <span>Старая цена</span>
                        <input
                            name={'price_old'}
                            className='input__style'
                            onChange={e => setPriceOld(e.target.value)}
                            value={price_old}
                            type="number"
                            placeholder={'Старая цена'}
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
                    <button className='users__add' onClick={() => productUpdate(product?.id, name, description, file, price, price_old, category)}>Изменить товар</button>
                </div>
            </>
        }
        </> 
    );
};

export default ProductsUpdate;