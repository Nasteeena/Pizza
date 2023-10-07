import Header from "../../Header/Header";
import Search from "../../Search/Search";

import {useState, useEffect} from "react";
import axios, { AxiosError } from "axios";
import MenuList from "./MenuList/MenuList";

import styles from "./Menu.module.css";

import { ProductInterface } from "../../../interfaces/Products.interface";

import { API_COMBINED } from "../../../utils/API";

export default function Menu() {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [query, setQuery] = useState("");
    const [error, setError] = useState<string | undefined>();
    const [products, setProducts] = useState<ProductInterface[]>([]);

    const handleSearch = (e:  React.ChangeEvent<HTMLInputElement>) => {
        setQuery(e.target.value);
    };

    const getMenu = async () => {
        try {
            setIsLoading(true);
            const { data } = await axios.get<ProductInterface[]>(API_COMBINED.QUERY + query);
            console.log(data);
            setProducts(data);
            setIsLoading(false);
        } catch (e) {
            if(e instanceof AxiosError) {
                setError(e.message);
                console.log(error);
            }
            setIsLoading(false);
        }
    };

    useEffect(()=> {
        getMenu();
    }, [query]);


    return (
        <>
            <div className={styles.menu}>
                <Header>Меню</Header>
                <Search onChange={handleSearch} placeholder='Введите блюдо или состав'/>
            </div>
            <div>
                {error && <p>{error}</p>}
                {!isLoading && <MenuList products={products}/>}
                {isLoading && <p>...Загрузка</p>}
            </div>
        </>
    );
}
