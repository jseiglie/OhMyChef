import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React, { useEffect } from 'react';
import AdminDashboardBB from "../../components/AdminDashboardBB";
import RestaurantDetail from '../../components/RestaurantDetail';
import { QuickActionsAdmin } from '../../components/QuickActionsAdmin';

export const AdminDashboard = () => {
  useEffect(() => {
    const el = document.getElementsByClassName("custom-sidebar")[0];
    if (el) el.scrollTo(0, 0);
  }, []);
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
