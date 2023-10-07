import styles from "../Button/button.module.css";
import { ButtonProps } from "./Button.props";
import cn from "classnames";

function Button({children, className, appearance = "small", ...props} : ButtonProps) {

    return (
        <button {...props} className={cn(styles["button"], className, styles["accent"], {
            [styles["small"]] : appearance === "small",
            [styles["big"]] : appearance === "big"
        })}>{children}</button>
    );
}

export default Button;