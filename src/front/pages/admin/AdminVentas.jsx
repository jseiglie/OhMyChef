import React, { useEffect } from "react";
import VentasResumen from "../../components/VentasResumen";
import AdminVentasCalendario from "../../components/AdminVentasCalendario";


export const AdminVentas = () => {
  useEffect(() => {
    const el = document.getElementsByClassName("custom-sidebar")[0];
    if (el) el.scrollTo(0, 0);
  }, []);
  return (
    <>
      <div className="dashboard-container">

        <h1 className="dashboard-title align-self-start">Ventas</h1>
        <p className="dashboard-welcome  align-self-start mb-4">Introduce tus ventas</p>
        <div className="p-3 ms-0 me-3 col-11  col-sm-11 col-lg-5 border rounded bg-white shadow-sm order-1">
          <VentasResumen
            restauranteId="1231"
            mes="Mayo 2025"
            ventas={2500}
            porcentaje={27}

          />
        </div>



      </div>


    </>


  );
};
