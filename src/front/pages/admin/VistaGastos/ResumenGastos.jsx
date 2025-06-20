import React, { useEffect, useState } from "react";
import { Card, Row, Col } from "react-bootstrap";
import adminService from "../../../services/adminService";
const ResumenGastos = () => {

  const [resumen, setResumen] = useState(null);

  useEffect(() => {
    const fetchResumen = async () => {
      const token = localStorage.getItem("token");
      const mes = 6; // Junio
      const ano = 2025;
      const data = await adminService.getResumenAdminGastos(mes, ano);

      if (data) {
        const resumenArray = [
          { titulo: "Total gastado (junio)", valor: `€${data.total_gastado}` },
          { titulo: "Nº de restaurantes activos", valor: data.restaurantes_activos },
          { titulo: "Proveedor más usado", valor: data.proveedor_top },
          { titulo: "Top restaurante", valor: data.restaurante_top },
        ];
        setResumen(resumenArray);
      } else {
        setResumen([]);
      }
    };
    fetchResumen();
  }, []);

  if (resumen === null) return <p>Cargando resumen...</p>;
  if (resumen.length === 0) return <p>No hay datos para mostrar en este mes.</p>;


  return (
    <Row className="mb-4">
      {resumen.map((item, i) => (
        <Col key={i} xs={12} sm={6} md={3} className="mb-3">
          <Card className="text-center shadow-sm h-100">
            <Card.Body>
              <Card.Title className="text-muted" style={{ fontSize: "0.9rem" }}>
                {item.titulo}
              </Card.Title>
              <Card.Text className="fw-bold fs-5">{item.valor}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );
};
export default ResumenGastos;






















