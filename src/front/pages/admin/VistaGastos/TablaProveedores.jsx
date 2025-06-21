import React, { useEffect, useState } from "react";
import { Card, Table, Form, Button, Spinner } from "react-bootstrap";
import DataLoaderWrapper from "./DataLoaderWrapper";

const TablaProveedores = () => {
  const [proveedores, setProveedores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mes, setMes] = useState("6");
  const [ano, setAno] = useState("2025");
  const fetchProveedores = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/admin/proveedores-gastos?mes=${mes}&ano=${ano}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (!response.ok) throw new Error("Error al obtener datos de proveedores");
      const data = await response.json();
      setProveedores(data);
    } catch (error) {
      console.error("Error:", error.message);
      setProveedores(null);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    const el = document.getElementsByClassName("custom-sidebar")[0];
    if (el) el.scrollTo(0, 0);
    fetchProveedores();
  }, []);
  return (
    <DataLoaderWrapper loading={loading} data={proveedores} emptyMsg="No hay datos de proveedores este mes.">
      <Card className="mb-4 shadow-sm">
        <Card.Body>
          <Card.Title className="h6">Tabla de proveedores</Card.Title>
          <Table striped bordered hover size="sm">
            <thead>
              <tr>
                <th>Proveedor</th>
                <th>Total gastado (€)</th>
                <th>Nº restaurantes</th>
              </tr>
            </thead>
            <tbody>
              {proveedores.map((prov, index) => (
                <tr key={index}>
                  <td>{prov.nombre}</td>
                  <td>{prov.total.toLocaleString()}</td>
                  <td>{prov.restaurantes}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </DataLoaderWrapper>
  );
};
export default TablaProveedores;









