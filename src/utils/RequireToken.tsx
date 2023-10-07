import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { StoreType } from "../store/store";

import { useSelector } from "react-redux";

export default function RequireToken({ children } : {children: ReactNode}) {
    const token = useSelector((state: StoreType) => state.user.token);

    if(!token) {
        return <Navigate to='/auth/login' replace/>;
    }

    return (
        children
    );
}
