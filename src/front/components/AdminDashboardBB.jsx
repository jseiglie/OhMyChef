import { Link } from 'react-router-dom';
import React from 'react';
import '../styles/AdminDashboardBB.css';

const AdminDashboard = () => {
  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Admin Dashboard</h1>
      <p className="dashboard-welcome">Welcome back, Sarah. Here's what's happening today.</p>

      <div className="restaurant-cards">
        {[1, 2, 3, 4].map((num) => (
          <div key={num} className="restaurant-card">
            <h3>RESTAURANTE # {num}</h3>
            <div className="card-metrics">
              <div className="metric">
                <p className="label">VENTAS mes</p>
                <p className="value">$2500</p>
                <p className="change down">-8.2% vs last month</p>
              </div>
              <div className="metric">
                <p className="label">GASTOS mes</p>
                <p className="value">27%</p>
                <p className="status">Dentro rango</p>
              </div>
            </div>
            <Link to={`/restaurant/${num}`} className="view-link">View All</Link>
          </div>
        ))}
      </div>

      <div className="quick-actions">
        <h2>Quick Actions</h2>
        <div className="actions">
          <div className="action-card">
            <button className="action-btn">+ Crear Restaurante</button>
            <p>Editar Restaurante</p>
          </div>
          <div className="action-card">
            <button className="action-btn">👤 Manage Users</button>
            <p>Editar usuarios</p>
          </div>
          <div className="action-card">
            <button className="action-btn">🏠 Volver Dashboard</button>
            <p>Menu principal del admin</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
