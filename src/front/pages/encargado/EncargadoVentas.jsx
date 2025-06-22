import React, { useEffect, useState } from "react";
import useGlobalReducer from "../../hooks/useGlobalReducer";
import ventaServices from "../../services/ventaServices";
import { Link } from "react-router-dom";
import { MonedaSimbolo } from "../../services/MonedaSimbolo";

export const EncargadoVentas = () => {

  const simbolo = MonedaSimbolo();
  const { store } = useGlobalReducer();
  const user = store.user;

  const [ventas, setVentas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [ventaSeleccionada, setVentaSeleccionada] = useState(null);
  const [nuevoMonto, setNuevoMonto] = useState("");
  const [mensaje, setMensaje] = useState("");
  const meses = [
    "enero",
    "febrero",
    "marzo",
    "abril",
    "mayo",
    "junio",
    "julio",
    "agosto",
    "septiembre",
    "octubre",
    "noviembre",
    "diciembre"
  ];


  const fechaactual = new Date();
  const mesactual = fechaactual.getMonth() + 1;

  const getFecha = (thefecha) => {

    const fecha = new Date(thefecha);
    const mes = fecha.getMonth() + 1; // +1 porque getMonth() da 0 para enero
    return mes

  }

  const cargarVentas = async () => {
    try {

      const data = await ventaServices.getVentas();

      const ventasRestaurante = data.filter(
        (venta) => (venta.restaurante_id === user.restaurante_id && getFecha(venta.fecha) === mesactual)
      );

      setVentas(ventasRestaurante);
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
  }, []);

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
    <div className="dashboard-container">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h1 className="dashboard-title">Ventas del restaurante</h1>
        <Link to="/encargado/registrar-venta" className="btn btn-success">
          <i className="bi bi-plus-circle me-2"></i>Registrar nueva venta
        </Link>
      </div>

      {/* Mensaje tipo GastoForm */}
      {mensaje && (
        <div
          className={`alert mt-2 ${mensaje.toLowerCase().includes("éxito") ||
            mensaje.toLowerCase().includes("eliminada")
            ? "alert-success"
            : "alert-danger"
            }`}
        >
          {mensaje}
        </div>
      )}

      {loading ? (
        <p>Cargando...</p>
      ) : ventas.length === 0 ? (
        <p>No hay ventas registradas.</p>
      ) : (
        <>
          {/* <p className="mt-3">
            <strong>Total:</strong> €{total.toFixed(2)}<br />
            <strong>Promedio diario:</strong> €{promedio.toFixed(2)}
          </p>
 */}


          <div className="rounded shadow-sm p-2 col-sm-12 col-md-7 col-lg-6 col-xl-4 col-xxl-3 text-center bg-info-subtle  d-flex flex-direction-row  ">
            <div className="icono-circular ms-2 me-4 rounded-circle bg-white text-info mt-1">
              📈</div>
            <div className="d-flex flex-column text-start">
              <h6 className="fw-bold text-info strong">Promedio diario: <span className="fw-bold">€{promedio.toFixed(2)}</span> </h6>
              <div className="fs-5 text-info strong">Total: <span className="fw-bold">€{total.toFixed(2)}</span></div>
              <p className="fs-5 text-info strong mb-0"> mes: <span className="color-orange">{meses[mesactual - 1].toUpperCase()}</span></p>
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

                      <button class="action-icon-button edit-button"
                        onClick={() => abrirModalEdicion(v)}
                        title="Edit User"><svg
                          xmlns="http://www.w3.org/2000/svg" width="20"
                          height="20" viewBox="0 0 24 24" fill="none"
                          stroke="currentColor" stroke-width="2" stroke-linecap="round"
                          stroke-linejoin="round" class="feather feather-edit-2">
                          <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z">
                          </path>
                        </svg>
                      </button>

                      <button class="action-icon-button delete-button"
                        onClick={() => eliminarVenta(v.id)}
                        title="Delete User"><svg xmlns="http://www.w3.org/2000/svg"
                          width="20" height="20" viewBox="0 0 24 24" fill="none"
                          stroke="currentColor" stroke-width="2" stroke-linecap="round"
                          stroke-linejoin="round" class="feather feather-trash-2">
                          <polyline points="3 6 5 6 21 6"></polyline>
                          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2">
                          </path>
                          <line x1="10" y1="11" x2="10" y2="17">
                          </line><line x1="14" y1="11" x2="14" y2="17"></line>
                        </svg>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}

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
