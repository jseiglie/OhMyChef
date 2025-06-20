import React from "react";
import { Card, Table, Form, Button } from "react-bootstrap";

const TablaProveedores = () => {
  const proveedores = [
    { nombre: "Distribuidora Gómez", total: 5400, restaurantes: 7 },
    { nombre: "Grupo Alimentario", total: 3100, restaurantes: 7 },
    { nombre: "Hermanos López", total: 2300, restaurantes: 5 },
  ];

  return (
    <Card className="mb-4 shadow-sm">
      <Card.Body>
        <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap gap-3">
          <Card.Title className="h6 mb-0">Top proveedores por gasto total</Card.Title>
          <div className="d-flex gap-2">
            <Form.Select size="sm">
              <option>Mes</option>
              <option>Enero</option>
              <option>Febrero</option>
              <option>Marzo</option>
              <option>Abril</option>
              <option>Mayo</option>
              <option>Junio</option>
            </Form.Select>
            <Form.Select size="sm">
              <option>Año</option>
              <option>2024</option>
              <option selected>2025</option>
            </Form.Select>
          </div>
        </div>
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
            {proveedores.map((prov, index) => (
              <tr key={index}>
                <td>{prov.nombre}</td>
                <td>€{prov.total.toLocaleString()}</td>
                <td>{prov.restaurantes}</td>
                <td>
                  <Button variant="outline-primary" size="sm">
                    Ver detalle
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  );
};
export default TablaProveedores;









