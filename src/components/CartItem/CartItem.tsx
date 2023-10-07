import styles from "./CartItem.module.css";

import { CartItemInterface } from "./CartItem.interface";

export default function CartItem({image, name, price, count}: CartItemInterface) {

    return (
        <div className={styles["item"]}>
			<div className={styles["image"]} style={{ backgroundImage: `url('${image}')` }}></div>
			<div className={styles["description"]}>
				<div className={styles["name"]}>{name}</div>
				<div className={styles["price"]}>{price}&nbsp;₽</div>
			</div>
			<div className={styles["actions"]}>
				<button className={styles["minus"]}>
					<img src="/minus-icon.svg" alt="Удалить из корзины" />
				</button>
				<div className={styles["number"]}>{count}</div>
				<button className={styles["plus"]}>
					<img src="/plus-icon.svg" alt="Добавить в корзину" />
				</button>
				<button className={styles["remove"]}>
					<img src="/delete-icon.svg" alt="Удалить все" />
				</button>
			</div>
		</div>
    );
}
