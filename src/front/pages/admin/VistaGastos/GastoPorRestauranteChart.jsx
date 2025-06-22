import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import adminService from "../../../services/adminService";
ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);
const GastoPorRestauranteChart = () => {
  const [dataChart, setDataChart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const fecha = new Date();
  const mes = fecha.getMonth() + 1;
  const ano = fecha.getFullYear();
  const fetchData = async () => {
    try {
      const data = await adminService.getGastoPorRestauranteChart(mes, ano);
      if (data.length === 0) throw new Error("Sin datos");
      setDataChart(data);
    } catch (err) {
      console.error("Error en getGastoPorRestauranteChart:", err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  if (loading) return <p>Cargando gráfico...</p>;
  if (error || !dataChart) return <p>No hay datos para mostrar este mes.</p>;
  const chartData = {
    labels: dataChart.map((item) => item.restaurante),
    datasets: [
      {
        label: "Gasto (€)",
        data: dataChart.map((item) => item.total_gastado),
        backgroundColor: "rgba(54, 162, 235, 0.6)",
      },
    ],
  };
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: { enabled: true },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: { stepSize: 100 },
      },
    },
  };
  return (
    <div style={{ height: "300px", width: "100%" }}>
      <Bar data={chartData} options={options} />
    </div>
  );
};
export default GastoPorRestauranteChart;