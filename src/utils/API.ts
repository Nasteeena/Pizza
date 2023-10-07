const API = {
    MAIN: "https://purpleschool.ru/pizza-api-demo",
    PRODUCTS: "/products",
    LOGIN: "/auth/login",
    REGISTER: "/auth/register",
    USER: "/user/profile",
    QUERY: "?name="
};

export const API_COMBINED = {
    PRODUCTS: API.MAIN + API.PRODUCTS,
    LOGIN: API.MAIN + API.LOGIN,
    REGISTER: API.MAIN + API.REGISTER,
    USER: API.MAIN + API.USER,
    QUERY: API.MAIN + API.PRODUCTS + API.QUERY
};