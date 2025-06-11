import ListaRestaurantes from "../../pages/ListaRestaurantes";
import therestaurant from "../../services/restauranteServices";
import React, { useState, useEffect } from "react";
import useGlobalReducer from "../../hooks/useGlobalReducer";

const AdminExpensePestania = () => {
    const { store, dispatch } = useGlobalReducer();
    const [restaurantes, SetRestaurantes] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const token = sessionStorage.getItem("token");
        console.log("hay tantnos restaurantes", restaurantes.length)
        if (restaurantes.length > 0 && token && store.user.rol === "admin") {
            setLoading(false);
            return


        }
        else if (token && store.user.rol === "admin") {
            setLoading(true);
            therestaurant.getRestaurantes(token)
                .then((data) => {
                    SetRestaurantes(data);
                    setLoading(false);
                    dispatch({ type: "set_restaurante", payload: data });

                })
                .catch(() => {
                    sessionStorage.removeItem("token");
                    setLoading(false);
                });
        }


    }, [store.user.rol]);

    return (
        <>
            {loading ? (
                <div className="d-flex justify-content-center align-items-center h-100">
                    <div
                        className="spinner-border text-primary"
                        role="status"
                        style={{ width: "3rem", height: "3rem" }}
                    >
                        <span className="visually-hidden">Cargando...</span>
                    </div>
                </div>
            ) : (
                <ListaRestaurantes restaurantes={restaurantes} />
            )}
        </>
    );
};

export default AdminExpensePestania;
