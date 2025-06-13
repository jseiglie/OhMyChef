import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import gastoServices from "../../services/GastoServices";
import useGlobalReducer from "../../hooks/useGlobalReducer";

export const DetalleGastosMensual = () => {
  const { store } = useGlobalReducer();
  const user = store.user;
  const navigate = useNavigate();

  // Estados para vista (mensual o diario)
  const [view, setView] = useState('mensual');

  // Estados para mes/año resumen mensual
  const hoy = new Date();
  const [mes, setMes] = useState(hoy.getMonth() + 1);
  const [ano, setAno] = useState(hoy.getFullYear());
  const [monthlyData, setMonthlyData] = useState({ datos: {}, proveedores: [], dias: [], totales: {} });

  // Estados para detalle diario
  const [selectedDate, setSelectedDate] = useState(hoy.toISOString().split('T')[0]);
  const [dailyData, setDailyData] = useState([]);
  const [filterProveedor, setFilterProveedor] = useState('');
  const [filterCategoria, setFilterCategoria] = useState('');
  const [proveedoresList, setProveedoresList] = useState([]);

  const [mensaje, setMensaje] = useState("");

  // Carga proveedores para filtros diarios y para mostrar nombre
  useEffect(() => {
    if (!user?.restaurante_id) return;
    gastoServices.getProveedores(user.restaurante_id)
      .then(list => setProveedoresList(list))
      .catch(() => { });
  }, [user]);

  // Efecto para resumen mensual
  useEffect(() => {
    if (view !== 'mensual' || !user?.restaurante_id) return;
    gastoServices.resumenMensual(mes, ano)
      .then(data => setMonthlyData(data))
      .catch(() => setMensaje("Error al obtener resumen mensual"));
  }, [view, mes, ano]);

  // Efecto para detalle diario
  useEffect(() => {
    if (view !== 'diario' || !user?.restaurante_id) return;
    gastoServices.getGastos(user.restaurante_id)
      .then(all => {
        const filtered = all.filter(g => g.fecha === selectedDate);
        setDailyData(filtered);
      })
      .catch(() => setMensaje("Error al obtener gastos diarios"));
  }, [view, selectedDate]);

  const handleMesChange = (e) => {
    const [year, month] = e.target.value.split("-");
    setAno(parseInt(year, 10));
    setMes(parseInt(month, 10));
  };

  const handleDateChange = (e) => setSelectedDate(e.target.value);
  const handleHoy = () => setSelectedDate(new Date().toISOString().split('T')[0]);

  const nombreMes = new Date(ano, mes - 1).toLocaleString("es", { month: "long", year: "numeric" });

  // Filtrar diario
  const displayedDaily = dailyData
    .filter(g => !filterProveedor || g.proveedor_id === parseInt(filterProveedor, 10))
    .filter(g => !filterCategoria || g.categoria === filterCategoria);

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Detalle de Gastos</h2>
        <button
          className="btn btn-success"
          onClick={() => navigate('/chef/gastos/registrar')}
        >
          + Registrar gasto
        </button>
      </div>

      {/* Toggle de vistas */}
      <div className="btn-group mb-3">
        <button
          className={`btn btn-outline-primary ${view === 'mensual' ? 'active' : ''}`}
          onClick={() => setView('mensual')}
        >Resumen Mensual</button>
        <button
          className={`btn btn-outline-primary ${view === 'diario' ? 'active' : ''}`}
          onClick={() => setView('diario')}
        >Detalle Diario</button>
      </div>

      {mensaje && <div className="alert alert-danger">{mensaje}</div>}

      {view === 'mensual' ? (
        <>
          <div className="mb-3">
            <h5 className="text-muted">Mes: {nombreMes.toUpperCase()}</h5>
            <input
              type="month"
              className="form-control w-auto"
              value={`${ano}-${String(mes).padStart(2, '0')}`}
              onChange={handleMesChange}
            />
          </div>
          <div className="table-responsive">
            <table className="table table-bordered table-sm">
              <thead>
                <tr>
                  <th>Proveedor</th>
                  {monthlyData.dias.map(d => (<th key={d}>{d}</th>))}
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {monthlyData.proveedores.map(prov => (
                  <tr key={prov}>
                    <td>{prov}</td>
                    {monthlyData.dias.map(d => (
                      <td key={d}>
                        {monthlyData.datos[prov]?.[d]?.toFixed(2) || '-'}
                      </td>
                    ))}
                    <td><strong>{monthlyData.totales[prov]?.toFixed(2) || '0.00'}</strong></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      ) : (
        <>
          <div className="d-flex align-items-center mb-3">
            <label className="me-2">Fecha:</label>
            <input
              type="date"
              className="form-control w-auto me-2"
              value={selectedDate}
              onChange={handleDateChange}
            />
            <button className="btn btn-success me-3" onClick={handleHoy}>Hoy</button>

            <label className="me-2">Proveedor:</label>
            <select
              className="form-select w-auto me-2"
              value={filterProveedor}
              onChange={e => setFilterProveedor(e.target.value)}
            >
              <option value="">Todos</option>
              {proveedoresList.map(p => (
                <option key={p.id} value={p.id}>{p.nombre}</option>
              ))}
            </select>

            <label className="me-2">Categoría:</label>
            <select
              className="form-select w-auto"
              value={filterCategoria}
              onChange={e => setFilterCategoria(e.target.value)}
            >
              <option value="">Todas</option>
              <option value="alimentos">Alimentos</option>
              <option value="bebidas">Bebidas</option>
              <option value="limpieza">Limpieza</option>
              <option value="otros">Otros</option>
            </select>
          </div>
          <div className="table-responsive">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>Proveedor</th>
                  <th>Categoría</th>
                  <th>Monto</th>
                  <th>Nota</th>
                </tr>
              </thead>
              <tbody>
                {displayedDaily.map(g => {
                  const provName = proveedoresList.find(p => p.id === g.proveedor_id)?.nombre || g.proveedor_id;
                  return (
                    <tr key={g.id}>
                      <td>{provName}</td>
                      <td>{g.categoria}</td>
                      <td>€{parseFloat(g.monto).toFixed(2)}</td>
                      <td>{g.nota}</td>
                    </tr>
                  );
                })}
                {displayedDaily.length === 0 && (
                  <tr><td colSpan={4} className="text-center">No hay gastos para esta fecha.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
};
