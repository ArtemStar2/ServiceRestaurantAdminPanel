import { FC, useEffect, useState } from "react";
import productService from '../../../services/productService'
import { IProduct } from "../../../models/IProduct";
import toast from "react-hot-toast";
import Loading from "../../../components/loading";
import { useParams } from "react-router-dom";
import ProductClient from "./item";

const ListProduct : FC = () => {
    const [products, setProducts] = useState<IProduct[]>([])
    const [loading, setLoading] = useState<boolean>(true)
    const params = useParams();
    useEffect(() => {
        getProducts();
    }, [params])

    async function getProducts() {
        try {
            const response = await productService.fetchProducts()
            const buff: IProduct[] = [];
            response.data.forEach(element => {
                if(params.code){
                    if(params.code == 'stock'){
                        if(element.stock){
                            buff.push(element);
                        }
                    }else if(params.code == 'food'){
                        if(element.category == "Еда"){
                            buff.push(element);
                        }
                    }else if(params.code == 'beverages'){
                        if(element.category == "Напитки"){
                            buff.push(element);
                        }
                    }else if(params.code == 'alcohol'){
                        if(element.category == "Алкоголь"){
                            buff.push(element);
                        }
                    }
                }else{
                    buff.push(element);
                }
            });
            setProducts(buff);
            setLoading(false);
        } catch (error: any) {
            toast.error('Ошибка: ' + error?.response?.data?.massage)
        }
    }
    return (
        <div className={loading ? 'center' : ''}>
        {loading ?
            <Loading />
        :   
            <div className="client__list">
                {products?.map(product => 
                    <ProductClient key={product.id} value={product}/>
                )} 
            </div>  
        }
        </div>
    );
};

export default ListProduct;