import styles from "./Login.module.css";
import { useEffect } from "react";

import Input from "../../Input/Input";
import Button from "../../Button/Button";
import Header from "../../Header/Header";
import { Link, useNavigate } from "react-router-dom";
import { FormEvent } from "react";

import { useDispatch, useSelector } from "react-redux";
import { StoreDispatchType, StoreType } from "../../../store/store";
import { login, clearLoginForm, getUserData } from "../../../store/user.slice";

interface FormValues {
    email: { value: string };
    pass: { value: string };
}

export default function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch<StoreDispatchType>();
    const { token, loginState } = useSelector((state: StoreType) => state.user);

    useEffect(()=> {
        if(token) {
            navigate("/");
            dispatch(getUserData(token));
        }
    }, [token, navigate, dispatch]);

    const formSubmit = async (e: FormEvent) => {
        e.preventDefault();
        dispatch(clearLoginForm());
        const {pass, email} = e.target as typeof e.target & FormValues;
        await sendForm(email.value, pass.value);
    };

    const sendForm = async (email: string, password: string) => {
        dispatch(login({email, password}));
    };
    
    return (
        <div className={styles.wrapper}>
            <Header className={styles.header_login}>Вход</Header>
            <form className={styles.form_wrapper} onSubmit={formSubmit}>
                {loginState && <div className={styles.error}>{loginState}</div>}
                <label className={styles.label} htmlFor="email">Ваш email</label>
                <Input name='email' type='text' id='email' placeholder='Email'/>
                <label className={styles.label} htmlFor="password">Ваш пароль</label>
                <Input name='pass' type='password' id='password' placeholder='Пароль'/>
                <Button appearance="big">Вход</Button>
                <div className={styles.text}>Нет акканута? </div>
                <Link className={styles.text} to='/auth/register'>Зарегистрироваться</Link>
            </form>
        </div>
    );
}
