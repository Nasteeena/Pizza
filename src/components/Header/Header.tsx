import styles from "./Header.module.css";

import cn from "classnames";

import { HeaderProps } from "./Header.props";

export default function Header({children, className, ...props} : HeaderProps) {
    return (
        <h1 {...props} className={cn(styles.header, className)}>{children}</h1>
    );
}
