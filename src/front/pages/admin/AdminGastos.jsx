import React from "react";
import ResumenGastos from "./VistaGastos/ResumenGastos"
import GastoPorRestauranteChart from "./VistaGastos/GastoPorRestauranteChart"
import EvolucionGastoMensual from "./VistaGastos/EvolucionGastoMensual"
import TablaProveedores from "./VistaGastos/TablaProveedores"
/*import FiltrosGasto from "./VistaGastos/FiltrosGasto" */

export const AdminGastos = () => {
  return (
    <>
      <ResumenGastos />
      
      <GastoPorRestauranteChart />

      <EvolucionGastoMensual />

      <TablaProveedores />
    </>    
  );
};







