import React from 'react';
import '../styles/RestaurantDetail.css';
import { useParams } from 'react-router-dom';

const RestaurantDetail = () => {
  const { id } = useParams();
  return (
    <div className="restaurant-detail-container">
      <header className="header-section">
        <button className="back-btn">← Ir a Ventas</button>
        <div className="title-group">
          <h2 className="title-gasto">Gastos</h2>
          <h2>RESTAURANTE #{id} </h2>
          <p className="date-highlight">Mes actual: <strong>Mayo 2025</strong></p>
        </div>
      </header>

      <section className="summary-section">
        <div className="summary-box blue">
          <p className="label">Gastos Actuales</p>
          <h3>2500 $</h3>
        </div>
        <div className="summary-box green">
          <p className="label">Porcentaje Gastos</p>
          <h3>27 %</h3>
        </div>
        <div className="filters-box">
          <div className="filters">
            <label>
              <input type="radio" defaultChecked /> Gastos por fechas
            </label>
            <label>
              <input type="radio" /> Gastos por proveedor
            </label>
          </div>
          <div className="date-pickers">
            <input type="date" />
            <span>to</span>
            <input type="date" />
            <select>
              <option>Last 7 days</option>
              <option>Last 30 days</option>
            </select>
          </div>
        </div>
      </section>

      <section className="cards-grid">
        <div className="card stat"><p>Total comprado</p><h4>$289,000</h4><span className="positive">+12.5%</span></div>
        <div className="card stat"><p>Total gastos</p><h4>$212,000</h4><span className="negative">-8.2%</span></div>
        <div className="card stat"><p>Nuevo gasto</p><h4>$77,000</h4><span className="positive">+15.3%</span></div>
        <div className="card stat"><p>Margen de gasto</p><h4>26.6%</h4><span className="positive">+2.1%</span></div>
      </section>

      <section className="chart-section">
        <div className="line-chart">
          {/* Aquí puedes integrar un gráfico con Recharts o Chart.js */}
          <p>📈 Gráfico de línea (placeholder)</p>
        </div>
        <div className="donut-chart">
          {/* Aquí puedes integrar un gráfico de pastel con Recharts */}
          <p>🧁 Relación por categoría (placeholder)</p>
        </div>
      </section>

      <div className="quick-actions">
        <h3>Quick Actions <span className="tag">Modificar</span></h3>
        <div className="actions">
          <div className="action-card">
            <button>+ Crear Restaurante</button>
            <p>Editar Restaurante</p>
          </div>
          <div className="action-card">
            <button>👤 Manage Users</button>
            <p>Editar usuarios</p>
          </div>
          <div className="action-card">
            <button>🏠 Volver Dashboard</button>
            <p>Menú principal del admin</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantDetail;