import { FC } from "react";
import { IProduct } from '../../models/IProduct'
import { Link } from "react-router-dom";

interface ProductItem{
    value: IProduct;
    deleteProduct: Function;
}

const ProductItem : FC<ProductItem> = ({value, deleteProduct}) => {
    
    return (
        <li className="product__item">
            <span className="name">
                {value.id}
            </span>
            <Link to={'/admin/product/' + value.id}>
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
            <div className="delete" onClick={() => deleteProduct(value.id)}>
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" version="1.1" viewBox="0 0 32 32">
                    <g transform="scale(2)">
                    <circle style={{fill:"#f44336"}} cx="8" cy="8" r="7"/>
                    <rect style={{fill:"#ffffff"}} width="2" height="10" x="-.98" y="-16.29" transform="rotate(135)"/>
                    <rect style={{fill:"#ffffff"}} width="2" height="10" x="-12.29" y="-5.01" transform="rotate(-135)"/>
                    </g>
                </svg>
            </div>
        </li>
    );
};

export default ProductItem;