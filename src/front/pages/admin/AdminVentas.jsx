import React from "react";
import VentasResumen from "../../components/VentasResumen";

export const AdminVentas = () => {
  return (
    <div className="mt-4">
      <VentasResumen
        restauranteId="1231"
        mes="Mayo 2025"
        ventas={2500}
        porcentaje={27}
      />
    </div>
  );
};
