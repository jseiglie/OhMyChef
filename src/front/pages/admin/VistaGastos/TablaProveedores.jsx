import React, { useEffect, useState } from "react";
import { Card, Table, Spinner } from "react-bootstrap";
import adminService from "../../../services/adminService";
const TablaProveedores = () => {
  const [proveedores, setProveedores] = useState([]);
  const [loading, setLoading] = useState(true);
  const mes = 6;
  const ano = 2025;
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await adminService.getProveedoresTop(mes, ano);
        setProveedores(data);
      } catch (err) {
        console.error("Error al cargar proveedores", err);
        setProveedores([]);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);
  return (
    <Card className="mb-4 shadow-sm">
      <Card.Body>
        <Card.Title className="h6">Top proveedores por gasto</Card.Title>
        {loading ? (
          <Spinner animation="border" size="sm" />
        ) : proveedores.length === 0 ? (
          <p className="text-muted">No hay datos para mostrar este mes.</p>
        ) : (
          <Table responsive hover size="sm">
            <thead>
              <tr>
                <th>Proveedor</th>
                <th>Veces usado</th>
                <th>Total gastado (€)</th>
              </tr>
            </thead>
            <tbody>
              {proveedores.map((prov, index) => (
                <tr key={index}>
                  <td>{prov.nombre}</td>
                  <td>{prov.veces_usado}</td>
                  <td>{parseFloat(prov.total_gastado).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Card.Body>
    </Card>
  );
};
export default TablaProveedores;









