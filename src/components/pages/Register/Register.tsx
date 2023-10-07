import Header from "../../Header/Header";
import Input from "../../Input/Input";
import Button from "../../Button/Button";

import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { FormEvent } from "react";
import { StoreDispatchType, StoreType } from "../../../store/store";

import { register, clearLoginForm, getUserData } from "../../../store/user.slice";

import styles from "./Register.module.css";

interface FormValues {
    email: { value: string };
    pass: { value: string };
    name: {value: string};
}

export default function Register() {
    const navigate = useNavigate();
    const dispatch = useDispatch<StoreDispatchType>();
    const { token, loginState} = useSelector((state: StoreType) => state.user);

    useEffect(()=> {
        if(token) {
            navigate("/");
            dispatch(getUserData(token));
        }
    }, [token, navigate, dispatch]);

    const formSubmit = async (e: FormEvent) => {
        e.preventDefault();
        dispatch(clearLoginForm());
        const {pass, email, name} = e.target as typeof e.target & FormValues;
        await sendForm(email.value, pass.value, name.value);
    };

    const sendForm = async (email: string, password: string, name: string) => {
        dispatch(register({email, password, name}));
    };

    return (
        <div className={styles.wrapper}>
        <Header className={styles.header_login}>Регистрация</Header>
        <form className={styles.form_wrapper} onSubmit={formSubmit}>
            {loginState && <div className={styles.error}>{loginState}</div>}
            <label className={styles.label} htmlFor="email">Ваш email</label>
            <Input name='email' type='text' id='email' placeholder='Email'/>
            <label className={styles.label} htmlFor="password">Ваш пароль</label>
            <Input name='pass' type='password' id='password' placeholder='Пароль'/>
            <label className={styles.label} htmlFor="name">Ваше имя</label>
            <Input name='name' type='text' id='name' placeholder='Имя'/>
            <Button appearance="big">Зарегестрироватьсяя</Button>
            <div className={styles.text}>Есть акканут? </div>
            <Link className={styles.text} to='/auth/login'>Войти</Link>
        </form>
    </div>
    );
}
