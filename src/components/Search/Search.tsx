import styles from "./Search.module.css";

import cn from "classnames";

export default function Search({...props}) {
    return (
        <input type="text" {...props} className={cn(styles.input)}/>
    );
}
