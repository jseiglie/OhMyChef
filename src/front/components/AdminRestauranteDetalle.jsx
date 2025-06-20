import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import adminService from "../services/adminService"; 
import "../styles/AdminDashboardBB.css";

const AdminRestauranteDetalle = () => {
  const { id } = useParams();
  const [ventas, setVentas] = useState([]);
  const [resumen, setResumen] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const now = new Date();
      const mes = now.getMonth() + 1;
      const ano = now.getFullYear();

      try {
        const ventasData = await adminService.getVentasDiarias(id, mes, ano);
        setVentas(ventasData);

        const resumenData = await adminService.getResumenPorcentaje(id, mes, ano);
        setResumen(resumenData);
      } catch (err) {
        console.error("Error al cargar datos del restaurante", err);
      }
    };

    fetchData();
  }, [id]);

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Detalle Restaurante #{id}</h2>

      {resumen && (
        <div className="mb-4">
          <h5>Resumen mensual:</h5>
          <ul className="list-group">
            <li className="list-group-item">💰 Total ventas: € {resumen.total_ventas}</li>
            <li className="list-group-item">💸 Total gastos: € {resumen.total_gastos}</li>
            <li className="list-group-item">📊 % Gasto: {resumen.porcentaje_gasto}%</li>
            <li className="list-group-item">📈 Promedio diario: € {resumen.promedio_diario}</li>
            <li className="list-group-item">📅 Proyección mensual: € {resumen.proyeccion_mensual}</li>
          </ul>
        </div>
      )}

      <h5>Ventas diarias:</h5>
      <ul className="list-group">
        {ventas.map((venta, index) => (
          <li key={index} className="list-group-item d-flex justify-content-between">
            <span>{new Date(venta.fecha).toLocaleDateString()}</span>
            <span>€ {venta.monto}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminRestauranteDetalle;
