import {NavLink, Outlet, useNavigate } from "react-router-dom";
import cn from "classnames";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../../store/user.slice";
import { StoreDispatchType, StoreType } from "../../store/store";

import Button from "../../components/Button/Button";

import styles from "./Layout.module.css";

import photo from "../../assets/Intersect.png";

export default function Layout() {
    const navigate = useNavigate();
    const dispatch = useDispatch<StoreDispatchType>();
    const { email, name } = useSelector((state : StoreType) => state.user.userData);
    const { products } = useSelector((state : StoreType) => state.cart);
    const sum = products.reduce((sum, num) => {return sum + num.count;}, 0);

    const logout = () => {
        dispatch(logOut());
        navigate("/auth/login");
    };

    return (
        <div className={styles.layout}>
            <div className={styles.sidebar}>
                <div className={styles.user}>
                    <img src={photo} alt="photo" />
                    <div className={styles.name}>{name}</div>
                    <div className={styles.email}>{email}</div>
                </div>
                <div className={styles.menu}>
                    <NavLink to='/' className={({isActive}) => cn(styles.link, {
                        [styles.active] : isActive
                    })}>Меню</NavLink>
                    <NavLink to='/cart' className={({isActive}) => cn(styles.link, {
                        [styles.active] : isActive
                    })}>Корзина <span className={styles.cart}>{sum}</span></NavLink>
                </div>
                <Button className={styles.button} onClick={logout}>
                    Выйти
                </Button>
            </div>
            <div className={styles.outlet}>
                <Outlet />
            </div>
        </div>
    );
}
