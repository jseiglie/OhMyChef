import React from "react";
import { Button } from "react-bootstrap";

const VentasResumen = ({ restauranteId, mes, ventas, porcentaje }) => {
    return (
        <div className="row w-90 justify-content-end d-flex">
            <div className="p-3 ms-3 me-5 col-5 border rounded bg-white shadow-sm order-2">
                {/* Botón superior */}
                {/* <div className="mb-2">
                    <Button size="sm" variant="outline-secondary">Ir a <span className="badge bg-light text-dark border ms-1">Gastos</span></Button>
                </div> */}

                {/* Título principal */}
                <div className="d-flex align-items-center justify-content-end flex-wrap">
                    <h5 className="me-2 mb-0">
                        <span className="badge bg-orange ms-4 p-2">Ventas</span>
                    </h5>
                    <h5 className="mb-0 fw-bold ">RESTAURANTE {restauranteId}</h5>
                </div>

                {/* Mes actual */}
                <p className="mt-1 mb-4 text-muted">
                    Mes actual: <span className="fw-bold text-danger">{mes}</span>
                </p>

                {/* Cajas */}
                <div className="row text-center">
                    <div className="col-6">
                        <div className="p-2 rounded bg-info bg-opacity-25">
                            <div className="fw-bold small text-dark">Ventas Actuales</div>
                            <div className="fw-bold fs-4 text-dark">
                                {ventas} <small className="text-muted">$</small>
                            </div>
                        </div>
                    </div>
                    <div className="col-6">
                        <div className="p-2 rounded bg-success bg-opacity-25">
                            <div className="fw-bold small text-dark">Porcentaje Ventas</div>
                            <div className="fw-bold fs-4 text-dark">
                                {porcentaje} <small className="text-muted">%</small>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="p-3 col-5 border rounded bg-white shadow-sm order-1">
                {/* Botón superior */}
                {/* <div className="mb-2">
                    <Button size="sm" variant="outline-secondary">Ir a <span className="badge bg-light text-dark border ms-1">Gastos</span></Button>
                </div> */}

                {/* Título principal */}
                <div className="d-flex justify-content-end align-items-center flex-wrap">
                    <h5 className="me-2 mb-0">
                        <span className="badge bg-orange ms-4 p-2">Ventas</span>
                    </h5>
                    <h5 className="mb-0 fw-bold ">RESTAURANTE {restauranteId}</h5>
                </div>

                {/* Mes actual */}
                <p className="mt-1 mb-4 text-muted">
                    Mes actual: <span className="fw-bold text-danger">{mes}</span>
                </p>

                {/* Cajas */}
                <div className="row text-center">
                    <div className="col-6">
                        <div className="p-2 rounded bg-info bg-opacity-25">
                            <div className="fw-bold small text-dark">Ventas Actuales</div>
                            <div className="fw-bold fs-4 text-dark">
                                {ventas} <small className="text-muted">$</small>
                            </div>
                        </div>
                    </div>
                    <div className="col-6">
                        <div className="p-2 rounded bg-success bg-opacity-25">
                            <div className="fw-bold small text-dark">Porcentaje Ventas</div>
                            <div className="fw-bold fs-4 text-dark">
                                {porcentaje} <small className="text-muted">%</small>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VentasResumen;
