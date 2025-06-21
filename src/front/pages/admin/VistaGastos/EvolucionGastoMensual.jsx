import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { Card } from "react-bootstrap";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";

import adminService from "../../../services/adminService";
import DataLoaderWrapper from "./DataLoaderWrapper";
ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);

const EvolucionGastoMensual = () => {
  const [graficoData, setGraficoData] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchGastosMensuales = async () => {
      try {
        // Reemplaza este endpoint por uno real si lo tienes
        const response = await adminService.getGastoUltimosMeses(); // <-- deberás crearlo o adaptarlo
        if (Array.isArray(response) && response.length > 0) {
          const labels = response.map((item) => item.mes);
          const valores = response.map((item) => item.total_gastado);
          setGraficoData({
            labels,
            datasets: [
              {
                label: "Gasto (€)",
                data: valores,
                fill: false,
                borderColor: "FD7E14_1",
                backgroundColor: "FD7E14_1",
                tension: 0.3,
              },
            ],
          });
        } else {
          setGraficoData([]);
        }
      } catch (err) {
        console.error("Error al cargar evolución de gasto:", err);
        setGraficoData([]);
      } finally {
        setLoading(false);
      }
    };
    fetchGastosMensuales();
  }, []);
  return (
    <Card className="mb-4 shadow-sm">
      <Card.Body>
        <Card.Title className="h6">Evolución de gasto mensual (últimos 6 meses)</Card.Title>
        <DataLoaderWrapper
          loading={loading}
          data={graficoData}
          emptyMessage="No hay datos de evolución mensual."
        >
          <div style={{ height: "300px" }}>
            <Line
              data={graficoData}
              options={{
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
              }}
            />
          </div>
        </DataLoaderWrapper>
      </Card.Body>
    </Card>
  );
};
export default EvolucionGastoMensual;
















