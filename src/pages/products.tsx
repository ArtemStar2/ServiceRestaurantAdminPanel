import { FC, useEffect, useState } from "react";
import productService from '../services/productService'
import { IProduct } from "../models/IProduct";
import toast from "react-hot-toast";
import Loading from "../components/loading";

import ProductItem from "../components/product";
import { Link } from "react-router-dom";

const Products : FC = () => {
    const [products, setProducts] = useState<IProduct[]>([])
    const [loading, setLoading] = useState<boolean>(true)

    useEffect(() => {
        getProducts();
    }, [])

    async function getProducts() {
        try {
            const response = await productService.fetchProducts()
            setProducts(response.data);
            setLoading(false);
        } catch (error: any) {
            toast.error('Ошибка: ' + error?.response?.data?.massage)
        }
    }
    const deleteProduct = async (id:string) => {
        try {
            await productService.deleteProducts(id)
            getProducts();
            toast.success('Успешно удалено')
            
        } catch (error: any) {
            toast.error('Ошибка: ' + error?.response?.data?.massage)
        }
    }
    return (
        <>
        <div className="users__form">
            <Link className='users__add' to={'/product/create'}>Добавить товар</Link>
        </div>
        {loading ?
            <Loading />
        :
            <ul className="product__list">
                <li className="users__item titleList">
                    <span>ID</span>
                    <span>Картинка</span>
                    <span>Название</span>
                    <span>Категория</span>
                    <span>Цена</span>
                    <span></span>
                </li>
                {products?.map(product => 
                    <ProductItem key={product.id} value={product} deleteProduct={deleteProduct}/>
                )}
            </ul>
        }
        </> 
    );
};

export default Products;