import Header from "../../Header/Header";
import Button from "../../Button/Button";
import Input from "../../Input/Input";

import CartItem from "../../CartItem/CartItem";
import { CartItemInterface } from "../../CartItem/CartItem.interface";

import { StoreType } from "../../../store/store";
import { useSelector } from "react-redux";

export default function Cart() {
    const {products} = useSelector((state: StoreType) => state.cart);

    return (
        <div>
            <Header>Корзина</Header>
            {products.map((item) => (
                <CartItem 
                    key={item.id}
                    image={item.image}
                    name={item.name} 
                    price={item.price}
                    count={item.count}
                />
            ))}
        </div>
    );
}
