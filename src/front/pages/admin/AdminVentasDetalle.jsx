import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useGlobalReducer from "../../hooks/useGlobalReducer";
import ventaServices from "../../services/ventaServices";
import { MonedaSimbolo } from "../../services/MonedaSimbolo";

export const AdminVentasDetalle = () => {
  const simbolo = MonedaSimbolo();
  const navigate = useNavigate();
  const { store } = useGlobalReducer();
  const user = store.user;
  const query = new URLSearchParams(window.location.search);
  const restaurante_id = query.get("restaurante_id") || user?.restaurante_id;

  const [selectedDate, setSelectedDate] = useState("");
  const [ventas, setVentas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [ventaSeleccionada, setVentaSeleccionada] = useState(null);
  const [nuevoMonto, setNuevoMonto] = useState("");
  const [mensaje, setMensaje] = useState("");

  const fechaActual = new Date();
  const mes = fechaActual.getMonth() + 1;
  const ano = fechaActual.getFullYear();

  const cargarVentas = async () => {
    try {
      const data = await ventaServices.getVentas(mes, ano);

      let filtradas = data.filter(
        (v) => Number(v.restaurante_id) === Number(restaurante_id)
      );

      if (selectedDate) {
        filtradas = filtradas.filter((v) => v.fecha === selectedDate);
      }

      filtradas.sort((a, b) => new Date(b.fecha) - new Date(a.fecha));
      setVentas(filtradas);
    } catch (error) {
      setMensaje("Error al cargar ventas");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarVentas();
    const el = document.getElementsByClassName("custom-sidebar")[0];
    if (el) el.scrollTo(0, 0);
  }, [selectedDate]);

  const total = ventas.reduce((acc, v) => acc + parseFloat(v.monto), 0);
  const diasUnicos = [...new Set(ventas.map((v) => v.fecha))];
  const promedio = diasUnicos.length > 0 ? total / diasUnicos.length : 0;

  const abrirModalEdicion = (venta) => {
    setVentaSeleccionada(venta);
    setNuevoMonto(venta.monto);
    const modal = new bootstrap.Modal(document.getElementById("editarModal"));
    modal.show();
  };

  const guardarEdicion = async () => {
    try {
      await ventaServices.editarVenta(ventaSeleccionada.id, {
        monto: parseFloat(nuevoMonto),
      });
      setMensaje("Venta actualizada con éxito");
      setTimeout(() => setMensaje(""), 2000);
      const modal = bootstrap.Modal.getInstance(document.getElementById("editarModal"));
      modal.hide();
      setVentaSeleccionada(null);
      cargarVentas();
    } catch (error) {
      setMensaje("Error al actualizar venta");
      setTimeout(() => setMensaje(""), 2000);
    }
  };

  const eliminarVenta = async (id) => {
    if (!window.confirm("¿Estás seguro de eliminar esta venta?")) return;
    try {
      await ventaServices.eliminarVenta(id);
      setMensaje("Venta eliminada correctamente");
      setTimeout(() => setMensaje(""), 2000);
      cargarVentas();
    } catch (error) {
      setMensaje("Error al eliminar venta");
      setTimeout(() => setMensaje(""), 2000);
    }
  };

  return (
    <div className="dashboard-container ">
      <div className="mb-2">
        <button className="btn btn-outline-secondary btn-sm" onClick={() => navigate("/admin/dashboard")}>
          ← Volver
        </button>
      </div>

      <h1 className="dashboard-title mb-3">Ventas del restaurante</h1>

      <div className="d-flex align-items-center mb-3 flex-wrap gap-2">
        <label className="me-2">Filtrar por fecha:</label>
        <input
          type="date"
          className="form-control w-auto me-2"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
        />
        <button className="btn btn-success" onClick={() => setSelectedDate("")}>
          Ver todo el mes
        </button>
      </div>

      {mensaje && (
        <div className={`alert mt-2 ${mensaje.includes("éxito") || mensaje.includes("eliminada") ? "alert-success" : "alert-danger"}`}>
          {mensaje}
        </div>
      )}

      {loading ? (
        <p>Cargando...</p>
      ) : ventas.length === 0 ? (
        <p>No hay ventas registradas este mes.</p>
      ) : (
        <>
          <div className="rounded shadow-sm p-2 col-sm-12 col-md-7 col-lg-6 col-xl-4 col-xxl-3 text-center bg-info-subtle d-flex flex-direction-row">
            <div className="icono-circular ms-2 me-4 rounded-circle bg-white text-info mt-1">📈</div>
            <div className="d-flex flex-column text-start">
              <h6 className="fw-bold text-info">Promedio diario: €{promedio.toFixed(2)}</h6>
              <div className="fs-5 text-info">Total: €{total.toFixed(2)}</div>
            </div>
          </div>


          <div className="table-responsive">
            <table className="table table-striped users-table mt-3 ps-0">
              <thead>
                <tr>
                  <th>Fecha</th>
                  <th>Monto ({simbolo})</th>
                  <th>Turno</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {ventas.map((v) => (
                  <tr key={v.id}>
                    <td>{v.fecha}</td>
                    <td>{v.monto}</td>
                    <td>{v.turno || "-"}</td>
                    <td>
                      <button className="action-icon-button edit-button" onClick={() => abrirModalEdicion(v)} title="Editar">
                        ✏️
                      </button>
                      <button className="action-icon-button delete-button" onClick={() => eliminarVenta(v.id)} title="Eliminar">
                        🗑️
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}

      {/* Modal de edición */}
      <div className="modal fade" id="editarModal" tabIndex="-1" aria-labelledby="editarModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="editarModalLabel">Editar Monto</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Cerrar"></button>
            </div>
            <div className="modal-body">
              <label>Monto ({simbolo})</label>
              <input
                type="number"
                className="form-control"
                value={nuevoMonto}
                onChange={(e) => setNuevoMonto(e.target.value)}
              />
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                Cancelar
              </button>
              <button type="button" className="btn btn-primary" onClick={guardarEdicion}>
                Guardar cambios
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

