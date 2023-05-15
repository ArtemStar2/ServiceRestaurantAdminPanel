import { FC } from "react";
import { IProduct } from '../../models/IProduct'
import { Link } from "react-router-dom";

interface ProductItem{
    value: IProduct;
}

const ProductItemClient : FC<ProductItem> = ({value}) => {
    
    return (
        <Link to={'/product/' + value.id} className="product__item">
            <span className="name">
                {value.id}
            </span>
            <span className="name">
                <img src={import.meta.env.VITE_URL_DATABASE + import.meta.env.VITE_FILE + value.images} alt="" />
            </span>
            <span className="name">
                {value.name}
            </span>
            <span className="name">
                {value.category}
            </span>
            <span className="role">
                {value.price} руб.  
            </span>
        </Link>
    );
};

export default ProductItemClient;