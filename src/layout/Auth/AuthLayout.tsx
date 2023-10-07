import styles from "./AuthLayout.module.css";
import { Outlet } from "react-router-dom";

import authLogo from "./../../assets/authLogo.svg";

export default function AuthLayout() {
    return (
        <div className={styles.layout}>
            <div className={styles.logo}>
                <img src={authLogo} alt="logo" />
            </div>
            <div className={styles.outlet}>
                <Outlet />
            </div>
        </div>
    );
}
