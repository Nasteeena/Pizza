import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter } from "react-router-dom";

import Menu from "./components/pages/Menu/Menu.tsx";
import Cart from "./components/pages/Cart/Cart.tsx";
import Error from "./components/pages/Error/Error.tsx";
import Layout from "./layout/Menu/Menu.tsx";
import AuthLayout from "./layout/Auth/AuthLayout.tsx";
import Product from "./components/pages/Product/Product.tsx";
import Login from "./components/pages/Login/Login.tsx";
import Register from "./components/pages/Register/Register.tsx";
import RequireToken from "./utils/RequireToken.tsx";

import { RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store/store.ts";
import axios from "axios";
import { API_COMBINED } from "./utils/API.ts";

export const router = createBrowserRouter([
  {
      path: "/",
      element: <RequireToken> <Layout /> </RequireToken>,
      children: [
        {
          path: "/cart",
          element: <Cart />
      },
    
      {
        path: "/",
        element: <Menu />
      },

      {
        path: "/product/:id",
        element: <Product />,
        errorElement: <>Ошибка</>,
        loader: async ({ params }) => {
          const { data } = await axios.get(`${API_COMBINED.PRODUCTS}/${params.id}`);
          return data;
        }
      }
    ]
  },

  {
    path: "/auth",
    element: <AuthLayout/> ,
    children: [
      {
        path: "login",
        element: <Login/>
      },

      {
        path: "register",
        element: <Register/>
      }
    ]
  },

  {
      path: "*",
      element: <Error />
  }
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
