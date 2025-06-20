import React from "react";
import { Line } from "react-chartjs-2";
import { Card } from "react-bootstrap";
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend } from "chart.js";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);

const EvolucionGastoMensual = () => {
  const data = {
    labels: ["Ene", "Feb", "Mar", "Abr", "May", "Jun"],
    datasets: [
      {
        label: "Gasto (€)",
        data: [3500, 6200, 6800, 9400, 11100, 13200],
        fill: false,
        borderColor: "#fd7e14",
        backgroundColor: "#fd7e14",
        tension: 0.3,
      },
    ],
  };
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: (value) => `€${value}`,
        },
      },
    },
  };
  return (
    <Card className="mb-4 shadow-sm">
      <Card.Body>
        <Card.Title className="h6">Evolución de gasto mensual (últimos 6 meses)</Card.Title>
        <div style={{ height: "300px" }}>
          <Line data={data} options={options} />
        </div>
      </Card.Body>
    </Card>
  );
};
export default EvolucionGastoMensual;
















