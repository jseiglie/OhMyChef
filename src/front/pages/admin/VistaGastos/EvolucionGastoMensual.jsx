import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend } from "chart.js";
import adminService from "../../../services/adminService";
ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);
const EvolucionGastoMensual = () => {
  const [datos, setDatos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [anoActual] = useState(new Date().getFullYear());
  useEffect(() => {
    const fetchData = async () => {
      const resultado = await adminService.getEvolucionGastoMensual(anoActual);
      setDatos(resultado);
      setLoading(false);
    };
    fetchData();
  }, [anoActual]);
  const meses = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];
  const data = {
    labels: datos.map(d => meses[d.mes - 1]),
    datasets: [
      {
        label: "Gasto total (€)",
        data: datos.map(d => d.total_gastado),
        borderColor: "#007bff",
        backgroundColor: "rgba(0, 123, 255, 0.2)",
        tension: 0.3,
        fill: true,
      },
    ],
  };
  const options = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: value => `€${value}`
        }
      }
    }
  };
  if (loading) return <p>Cargando evolución mensual...</p>;
  if (!datos.length || datos.every(d => d.total_gastado === 0)) return <p>No hay datos para mostrar este año.</p>;
  return (
    <div className="card p-3 mt-4">
      <h5 className="mb-3">Evolución mensual del gasto ({anoActual})</h5>
      <Line data={data} options={options} />
    </div>
  );
};
export default EvolucionGastoMensual;
















