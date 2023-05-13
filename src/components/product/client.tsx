import { FC } from "react";
import { IProduct } from '../../models/IProduct'
import { Link } from "react-router-dom";

interface ProductItem{
    value: IProduct;
}

const ProductItemClient : FC<ProductItem> = ({value}) => {
    
    return (
        <li className="product__item">
            <span className="name">
                {value.id}
            </span>
            <Link to={'/product/' + value.id}>
                <img src={import.meta.env.VITE_URL_DATABASE + import.meta.env.VITE_FILE + value.images} alt="" />
            </Link>
            <span className="name">
                {value.name}
            </span>
            <span className="name">
                {value.category}
            </span>
            <span className="role">
                {value.price} руб.  
            </span>
        </li>
    );
};

export default ProductItemClient;