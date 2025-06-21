import React, { useEffect, useState } from "react";
import { Card, Table, Form, Button, Spinner } from "react-bootstrap";

const TablaProveedores = () => {

  const [proveedores, setProveedores] = useState([]); // inicializado como array
  const [loading, setLoading] = useState(true);
  const [mes, setMes] = useState("1");
  const [ano, setAno] = useState("2025");
  const fetchProveedores = async () => {

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/admin/proveedores-gasto?mes=${mes}&ano=${ano}`,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      if (!response.ok) throw new Error("Error en la respuesta del servidor");
      const data = await response.json();
      setProveedores(Array.isArray(data) ? data : []); // protección extra
    } catch (error) {
      console.error("Error al obtener los proveedores:", error);
      setProveedores([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true); // importante al cambiar mes/año
    fetchProveedores();
  }, [mes, ano]);
  
  return (
    <Card className="mb-4 shadow-sm">
      <Card.Body>
        <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap gap-3">
          <Card.Title className="h6 mb-0">Top proveedores por gasto total</Card.Title>
          <div className="d-flex gap-2">
            <Form.Select size="sm" value={mes} onChange={(e) => setMes(e.target.value)}>
              <option value="1">Enero</option>
              <option value="2">Febrero</option>
              <option value="3">Marzo</option>
              <option value="4">Abril</option>
              <option value="5">Mayo</option>
              <option value="6">Junio</option>
              <option value="7">Julio</option>
              <option value="8">Agosto</option>
              <option value="9">Septiembre</option>
              <option value="10">Octubre</option>
              <option value="11">Noviembre</option>
              <option value="12">Diciembre</option>
            </Form.Select>
            <Form.Select size="sm" value={ano} onChange={(e) => setAno(e.target.value)}>
              <option value="2024">2024</option>
              <option value="2025">2025</option>
            </Form.Select>
          </div>
        </div>
        {loading ? (
          <div className="text-center py-3">
            <Spinner animation="border" size="sm" />
          </div>
        ) : (
          <Table className="table table-bordered table-sm text-center">
            <thead className="table-light">
              <tr>
                <th>Nombre proveedor</th>
                <th>Total gastado</th>
                <th>Nº restaurantes</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {proveedores.length > 0 ? (
                proveedores.map((prov, index) => (
                  <tr key={index}>
                    <td>{prov.nombre}</td>
                    <td>€{prov.total.toLocaleString()}</td>
                    <td>{prov.restaurantes}</td>
                    <td>
                      <Button variant="outline-primary" size="sm">Ver detalle</Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-muted">
                    No hay datos disponibles para este mes/año.
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        )}
      </Card.Body>
    </Card>
  );
};
export default TablaProveedores;









