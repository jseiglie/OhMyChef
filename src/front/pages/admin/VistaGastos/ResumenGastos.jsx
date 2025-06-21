import React, { useEffect, useState } from "react";
import { Card, Row, Col } from "react-bootstrap";
import adminService from "../../../services/adminService";
import DataLoaderWrapper from "./DataLoaderWrapper";

const ResumenGastos = () => {
  const [resumen, setResumen] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchResumen = async () => {
      try {
        const mes = 6; // Junio
        const ano = 2025;
        const data = await adminService.getResumenAdminGastos(mes, ano);
        if (data && data.total_gastado !== undefined) {
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
      } catch (err) {
        console.error("Error al obtener el resumen:", err);
        setResumen([]);
      } finally {
        setLoading(false);
      }
    };
    fetchResumen();
  }, []);
  
  return (
    <DataLoaderWrapper loading={loading} data={resumen}>
      <Row className="mb-4">
        {resumen?.map((item, i) => (
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
    </DataLoaderWrapper>
  );
};
export default ResumenGastos;






















