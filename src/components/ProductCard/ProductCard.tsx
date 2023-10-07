import { Link } from "react-router-dom";
import styles from "./Propduct.module.css";

import { useDispatch } from "react-redux";
import { StoreDispatchType } from "../../store/store";

import { addToCart } from "../../store/cart.slice";

import { ProductCardProps } from "./propductCard.props";

export default function ProductCard({title, decription, rating, price, image, id} : ProductCardProps) {
    const dispatch = useDispatch<StoreDispatchType>();

    const addItem = (id: number) => {
        dispatch(addToCart(id));
    };

    return (
            <div className={styles.card}>
                <div className={styles.card__upper} style={{backgroundImage: `url('${image}')`}}>
                    <div className={styles.price}>
                        {price}
                    </div>
                    <button className={styles.btn_cart} onClick={() => addItem(id)}>
                    🗑
                    </button>
                    <div className={styles.rating}>
                        {rating}
                    </div>
                </div>
                <div className={styles.card_info}>
                <Link to={`/product/${id}`}>
                    <div className={styles.header}>{title}</div> 
                </Link>
                    <div className={styles.text}>{decription}</div>
                </div>
            </div>
    );
}
