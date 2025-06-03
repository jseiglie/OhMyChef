import { Link } from "react-router-dom";
import InfoCard from "../../components/InforCard";
import { FaUser, FaPlus, FaUtensils, FaCog } from 'react-icons/fa';


export const AdminDashboard = () => {
  return (
    <div className="container d-flex flex-column mt-4">
      <h1>Bienvenido, Admin</h1>


      <div className="row col-12 mt-4">
        <Link to="usuarios" className="col-sm-12 col-md-12 col-lg-6 col-xl-4 mb-4 text-decoration-none">
          <InfoCard
            icon={<FaUser size={30} />}
            title="ver usuarios"
            bgColor="bg-warning"
            iconColor="text-dark"
          />
        </Link>


        <Link to="crear-usuario" className="col-sm-12 col-md-12 col-lg-6 col-xl-4 mb-4 text-decoration-none">
          <InfoCard
            icon={<FaPlus size={30} />}
            title="Crear usuarios"
            bgColor="bg-warning"
            iconColor="text-dark"
          />
        </Link>

        <Link to="restaurantes" className="col-sm-12 col-md-12 col-lg-6 col-xl-4 mb-4 text-decoration-none">
          <InfoCard
            icon={<FaUtensils size={30} />}
            title="Ver restaurantes"
            bgColor="bg-success"
            iconColor="text-white"
          />
        </Link>

        <Link to="crear-restaurante" className="col-sm-12 col-md-12 col-lg-6 col-xl-4 mb-4 text-decoration-none">
          <InfoCard
            icon={<FaPlus size={30} />}
            title="Crear restaurantes"
            bgColor="bg-success"
            iconColor="text-white"
          />
        </Link>

        <Link to="settings" className="col-sm-12 col-md-12 col-lg-6 col-xl-4 mb-4 text-decoration-none">
          <InfoCard
            icon={<FaCog size={30} />}
            title="Ajustes"
            bgColor="bg-secondary"
            iconColor="text-white"
          />
        </Link>


      </div>
    </div>
  );
};