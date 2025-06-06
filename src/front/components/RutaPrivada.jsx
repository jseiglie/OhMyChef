import React, { useEffect, useState } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { LoadingScreen } from "./LoadingScreen";
import userServices from "../../services/userServices";

export const RutaPrivada = ({ allowedRoles }) => {
    const { store, dispatch } = useGlobalReducer();
    const token = sessionStorage.getItem("token");
    const user = store.user;
    const navigate = useNavigate();
    const [cargando, setCargando] = useState(false);

    useEffect(() => {
        if (token && user === null) {
            setCargando(true);
            userServices
            .getUserinfo()
            .then((data) => {
                console.log("✅ Usuario recibido:", data.user);
                dispatch({ type: "get_user_info", payload: data.user });
                setCargando(false);
            })
            .catch((err) => {
                console.error("❌ Error cargando user:", err);
                sessionStorage.removeItem("token");
                setCargando(false);
                navigate("/login");
            });
        }
}, [token, user, dispatch, navigate]);


    if (cargando || (token && user === null)) {
        return <LoadingScreen />;
    }

    if (!token || !user) {
        return <Navigate to="/login" replace />;
    }

    if (!allowedRoles.includes(user.rol)) {
        return <Navigate to={`/${user.rol}/dashboard`} replace />;
    }

    return <Outlet />;
};
