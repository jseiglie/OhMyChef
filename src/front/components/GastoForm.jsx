import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";
import gastoServices from "../services/GastoServices";
export const GastoForm = () => {
  const { store } = useGlobalReducer();
  const user = store.user;
  const navigate = useNavigate();
  const [fecha, setFecha] = useState(new Date().toISOString().split("T")[0]);
  const [gastos, setGastos] = useState([
    { proveedor_id: "", categoria: "", monto: "", nota: "" },
  ]);
  const [proveedores, setProveedores] = useState([]);
  const [mensaje, setMensaje] = useState("");
  const nombreMes = new Date(fecha).toLocaleString("es", {
    month: "long",
    year: "numeric",
  });
  useEffect(() => {
    if (user?.restaurante_id) {
      gastoServices
        .getProveedores(user.restaurante_id)
        .then(setProveedores)
        .catch(() => setMensaje("Error al cargar proveedores"));
    }
  }, []);
  const handleInputChange = (index, field, value) => {
    const nuevosGastos = [...gastos];
    nuevosGastos[index][field] = value;
    setGastos(nuevosGastos);
  };
  const agregarGasto = () => {
    setGastos([...gastos, { proveedor_id: "", categoria: "", monto: "", nota: "" }]);
  };
  const eliminarGasto = (index) => {
    const nuevosGastos = [...gastos];
    nuevosGastos.splice(index, 1);
    setGastos(nuevosGastos);
  };
  const registrarGastos = async () => {
    const datos = gastos.map(g => ({
      ...g,
      fecha,
      usuario_id: user.id,
      restaurante_id: user.restaurante_id
    }));
    try {
      await gastoServices.registrarGastoMultiple(datos);
      setMensaje("Gastos registrados correctamente");
      setGastos([{ proveedor_id: "", categoria: "", monto: "", nota: "" }]);
    } catch (error) {
      console.error("Error al registrar:", error);
      setMensaje("Error al registrar los gastos");
    }
  };
  return (
    <div className="container-fluid px-4 py-4">
      <button onClick={() => navigate("/encargado/gastos")} className="btn btn-outline-secondary mb-3">
        ← Volver a gastos
      </button>
      <h3 className="mb-2">Registrar Gastos del día</h3>
      <div className="bg-orange text-white py-2 px-3 mb-4 rounded">
        Mes actual: {nombreMes.toUpperCase()}
      </div>
      <div className="bg-white p-4 shadow rounded w-100">
        <div className="mb-4">
          <label className="form-label fw-semibold">Fecha</label>
          <input
            type="date"
            className="form-control"
            value={fecha}
            onChange={(e) => setFecha(e.target.value)}
          />
        </div>
        {gastos.map((gasto, index) => (
          <div key={index} className="row align-items-end g-3 mb-3">
            <div className="col-md-3">
              <label className="form-label">Proveedor</label>
              <select
                className="form-select"
                value={gasto.proveedor_id}
                onChange={(e) => handleInputChange(index, "proveedor_id", e.target.value)}
              >
                <option value="">Selecciona</option>
                {proveedores.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.nombre}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-md-2">
              <label className="form-label">Categoría</label>
              <select
                className="form-select"
                value={gasto.categoria}
                onChange={(e) => handleInputChange(index, "categoria", e.target.value)}
              >
                <option value="">$</option>
                <option value="Alimentos">Alimentos</option>
                <option value="Bebidas">Bebidas</option>
                <option value="Limpieza">Limpieza</option>
                <option value="Otros">Otros</option>
              </select>
            </div>
            <div className="col-md-2">
              <label className="form-label">Monto (€)</label>
              <input
                type="number"
                className="form-control text-start"
                value={gasto.monto}
                onChange={(e) => handleInputChange(index, "monto", e.target.value)}
              />
            </div>
            <div className="col-md-3">
              <label className="form-label">Nota</label>
              <input
                type="text"
                className="form-control"
                value={gasto.nota}
                onChange={(e) => handleInputChange(index, "nota", e.target.value)}
              />
            </div>
            <div className="col-md-2 d-flex justify-content-end">
              {gastos.length > 1 && (
                <button
                  type="button"
                  className="btn btn-outline-danger"
                  onClick={() => eliminarGasto(index)}
                >
                  Eliminar
                </button>
              )}
            </div>
          </div>
        ))}
        <div className="d-flex gap-3 mt-4">
          <button className="btn btn-outline-primary" onClick={agregarGasto}>
            + Añadir otro gasto
          </button>
          <button className="btn btn-primary" onClick={registrarGastos}>
            Registrar Gastos
          </button>
        </div>
        {mensaje && <div className="alert alert-info mt-3">{mensaje}</div>}
      </div>
    </div>
  );
};
