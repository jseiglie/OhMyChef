import { Link } from "react-router-dom";
import InfoCard from "../../components/InforCard";
import { FaUser, FaPlus, FaUtensils, FaCog } from 'react-icons/fa';
import AdminDashboardBB from "../../components/AdminDashboardBB";
import RestaurantDetail from '../../components/RestaurantDetail';


export const AdminDashboard = () => {
  return (

    <AdminDashboardBB />
  );
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AdminDashboard />} />
        <Route path="/restaurant/:id" element={<RestaurantDetail />} />
      </Routes>
    </Router>
  );
}

export default App;