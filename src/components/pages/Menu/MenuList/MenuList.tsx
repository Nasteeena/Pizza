import styles from "./MenuList.module.css";
import ProductCard from "../../../ProductCard/ProductCard";
import { MenuListInterface } from "./MenuList.interface";

export default function MenuList({products} : MenuListInterface) {
    return (
        <div className={styles.wrapper}>
            {products.map(({id, name, price, ingredients, image, rating}) => (
                    <ProductCard  
                        title={name}
                        decription={ingredients.join(", ")} 
                        rating={rating}
                        price={price}
                        image={image}
                        id={id}
                        key={id}
                />
            ))}
        </div>
    );
}
