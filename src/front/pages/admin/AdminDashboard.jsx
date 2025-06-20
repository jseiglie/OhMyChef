import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React from 'react';
import AdminDashboardBB from "../../components/AdminDashboardBB";
import RestaurantDetail from '../../components/RestaurantDetail';
import { QuickActionsAdmin } from '../../components/QuickActionsAdmin';

export const AdminDashboard = () => {
  return <AdminDashboardBB />;
};

export function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AdminDashboardBB />} />
        <Route path="/restaurante/:id" element={<RestaurantDetail />} />
      </Routes>
    </Router>
  );
}
