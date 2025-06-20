import React from "react";
import { Bar } from "react-chartjs-2";
import { Card } from "react-bootstrap";
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const GastoPorRestauranteChart = () => {
  // Datos estáticos de ejemplo
  const data = {
    labels: [
      "OhMyChef Madrid",
      "Restaurante B",
      "Restaurante C",
      "Restaurante D",
      "Restaurante E",
      "Restaurante F",
      "Restaurante G",
      "Restaurante H",
    ],
    datasets: [
      {
        label: "Gasto (€)",
        data: [8500, 2500, 2200, 1800, 1500, 1300, 900, 650],
        backgroundColor: [
          "#fd7e14", // Color destacado
          "#dee2e6",
          "#dee2e6",
          "#dee2e6",
          "#dee2e6",
          "#dee2e6",
          "#dee2e6",
          "#dee2e6",
        ],
        borderWidth: 1,
      },
    ],
  };
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    indexAxis: "y",
    plugins: {
      legend: { display: false },
    },
    scales: {
      x: {
        ticks: {
          callback: (value) => `€${value}`,
        },
      },
    },
  };
  return (
    <Card className="mb-4 shadow-sm">
      <Card.Body>
        <Card.Title className="h6">Gasto por restaurante (junio 2025)</Card.Title>
        <div style={{ height: "300px" }}>
          <Bar data={data} options={options} />
        </div>
      </Card.Body>
    </Card>
  );
};
export default GastoPorRestauranteChart;