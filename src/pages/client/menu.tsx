import { FC, useEffect, useState } from "react";
import productService from '../../services/productService'
import { IProduct } from "../../models/IProduct";
import toast from "react-hot-toast";
import Loading from "../../components/loading";
import ProductItemClient from "../../components/product/client";

const MenuList : FC = () => {
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
    return (
        <>
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
                    <ProductItemClient key={product.id} value={product}/>
                )}
            </ul>
        }
        </> 
    );
};

export default MenuList;