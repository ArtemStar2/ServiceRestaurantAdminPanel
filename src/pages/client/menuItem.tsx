import { useState, useEffect } from 'react';
import { IProduct } from '../../models/IProduct';
import { useNavigate, useParams } from 'react-router-dom';
import productService from '../../services/productService';
import toast from "react-hot-toast";
import Loading from '../../components/loading';

function MenuItem() {
    const params = useParams();
    const [product, setProduct] = useState<IProduct>()
    const [loading, setLoading] = useState<boolean>(true)
    useEffect(() => {
        getProduct();
    }, [])
    let navigate = useNavigate();
    async function getProduct() {
        try {
            const response = await productService.fetchProductOne(params.id)
            if(!response.data){
                return navigate("/events");
            }
            setProduct(response.data);
            setLoading(false);
        } catch (error: any) {
            toast.error('Ошибка: ' + error?.response?.data?.massage)
        }
    }
    console.log(product)
    return (
        <div>
            {loading ?
                <Loading />
            :
                <></>
            }
        </div>
    );
};

export default MenuItem;