import { FC } from "react";
import { IProduct } from '../../../models/IProduct'
import { Link } from "react-router-dom";

interface ProductItem{
    value: IProduct;
}

const ProductClient : FC<ProductItem> = ({value}) => {
    
    return (
        <Link to={'/menu/' + value.id} className="client__item">
            <span className="img">
                <img src={import.meta.env.VITE_URL_DATABASE + import.meta.env.VITE_FILE + value.images} alt="" />
            </span>
            <span className="name">
                {value.name}
            </span>
            <span className="categoty">
                {value.category}
            </span>
            <span className="price">
                {value.price} руб. 
                {value.price_old ?
                    <span className="price__old">
                        {value.price_old} руб.
                    </span>
                    : <></>
                }
            </span>
        </Link>
    );
};

export default ProductClient;