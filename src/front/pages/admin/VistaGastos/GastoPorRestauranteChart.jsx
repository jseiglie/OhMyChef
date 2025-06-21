import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { Card } from "react-bootstrap";
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from "chart.js";
import adminService from "../../../services/adminService";
import DataLoaderWrapper from "./DataLoaderWrapper";
ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const GastoPorRestauranteChart = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const mes = 6;
  const ano = 2025;
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await adminService.getGastoPorRestaurante(mes, ano);
        if (!Array.isArray(response) || response.length === 0) {
          setData([]);
        } else {
          const labels = response.map((item) => item.nombre);
          const valores = response.map((item) => item.total_gastado);
          const colores = valores.map((_, i) => (i === 0 ? "#FD7E14" : "#DEE2E6"));
          setData({
            labels,
            datasets: [
              {
                label: "Gasto (€)",
                data: valores,
                backgroundColor: colores,
                borderWidth: 1,
              },
            ],
          });
        }
      } catch (err) {
        console.error("Error al cargar los datos", err);
        setData([]); // En caso de error, tratamos como datos vacíos
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);
  return (
    <Card className="mb-4 shadow-sm">
      <Card.Body>
        <Card.Title className="h6">Gasto por restaurante (junio 2025)</Card.Title>
        <div style={{ height: "300px" }}>
          <DataLoaderWrapper loading={loading} data={data} emptyMessage="No hay datos para mostrar este mes.">
            <Bar
              data={data}
              options={{
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
              }}
            />
          </DataLoaderWrapper>
        </div>
      </Card.Body>
    </Card>
  );
};
export default GastoPorRestauranteChart;