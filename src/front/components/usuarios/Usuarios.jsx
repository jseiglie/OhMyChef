import React, { useState, useEffect } from 'react';
import UserModal from "../../components/usuarios/UserModal.jsx";
import { FiPlus, FiUser, FiXCircle, FiEdit2, FiTrash2, FiCheckCircle } from 'react-icons/fi';
import "../../styles/Usuarios.css";
import "../../styles/UserModal.css";


const Users = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState('All Roles');
  const [selectedStatus, setSelectedStatus] = useState('All Status');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [restaurants, setRestaurants] = useState([]);


  const loadData = async () => {
    const token = sessionStorage.getItem("token");

    if (!token) {
      console.warn("No authentication token found. Please log in.");
      alert("Sesión expirada. Inicia sesión nuevamente.");
      return;
    }

    try {
      const usersRes = await fetch(import.meta.env.VITE_BACKEND_URL+"/api/usuarios", {
        headers: { Authorization: `Bearer ${token}` }
      });
      const usersData = await usersRes.json();
      if (usersRes.ok) {
        setUsers(usersData);
      } else {
        console.error("Error cargando usuarios:", usersData.error);
        setUsers([]);
      }
    } catch (err) {
      console.error("Error cargando usuarios", err);
      setUsers([]);
    }

    try {
      const restaurantsRes = await fetch(import.meta.env.VITE_BACKEND_URL+"/api/restaurantes", {
        headers: { Authorization: `Bearer ${token}` }
      });
      const restaurantsData = await restaurantsRes.json();
      if (restaurantsRes.ok) {
        setRestaurants(restaurantsData);
      } else {
        console.error("Error cargando restaurantes:", restaurantsData.error);
        setRestaurants([]);
      }
    } catch (err) {
      console.error("Error cargando restaurantes", err);
      setRestaurants([]);
    }
  };

  useEffect(() => {
    loadData();
  }, []);


  const filteredUsers = users.filter(user => {
    const matchesSearch = user.nombre.toLowerCase().includes(searchTerm.toLowerCase()) || user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = selectedRole === 'All Roles' || user.rol === selectedRole.toLowerCase();
    const matchesStatus = selectedStatus === 'All Status' || user.status === selectedStatus.toLowerCase();
    return matchesSearch && matchesRole && matchesStatus;
  });


  const handleAddUser = () => {
    setCurrentUser(null);
    setIsModalOpen(true);
  };

  const handleEditUser = (user) => {
    setCurrentUser(user);
    setIsModalOpen(true);
  };

  const handleSaveUser = async (userData) => {
    const token = localStorage.getItem("token");
    const adminEmail = localStorage.getItem("adminEmail");

    if (!token || !adminEmail) {
      alert("Sesión expirada. Inicia sesión nuevamente.");
      return;
    }


    const isValidAdmin = await validateAdminPassword(adminEmail, userData.adminPassword);
    if (!isValidAdmin) {
      alert("Contraseña del administrador incorrecta.");
      return;
    }


    const payload = {
      nombre: userData.nombre,
      email: userData.email,
      password: userData.password,
      rol: userData.rol,
      status: userData.status,
      restaurante_id: userData.rol === "admin" ? null : userData.restaurante_id,
      adminPassword: userData.adminPassword
    };

    try {
      let res;
      let result;

      if (currentUser) {
        res = await fetch(`/usuarios/${currentUser.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify(payload)
        });
        result = await res.json();
        if (!res.ok) {
          alert(result.error || "Error al actualizar usuario.");
          return;
        }
        setUsers(users.map(user => user.id === result.id ? result : user));
        alert("Usuario actualizado correctamente.");
      } else {
        res = await fetch("/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify(payload)
        });
        result = await res.json();
        if (!res.ok) {
          alert(result.error || "Error al registrar usuario.");
          return;
        }
        setUsers([...users, result]);
        alert("Usuario creado correctamente.");
      }

      setIsModalOpen(false);
      setCurrentUser(null);
      loadData();
    } catch (error) {
      console.error("Error al guardar usuario:", error);
      alert("Ocurrió un error inesperado al guardar el usuario.");
    }
  };


  const handleDeleteUser = async (userId) => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Sesión expirada. Inicia sesión nuevamente.");
      return;
    }

    if (window.confirm('¿Estás seguro de que quieres eliminar a este usuario?')) {
      try {
        const res = await fetch(`/usuarios/${userId}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        const result = await res.json();

        if (!res.ok) {
          alert(result.error || "Error al eliminar usuario.");
          return;
        }
        setUsers(users.filter(user => user.id !== userId));
        alert("Usuario eliminado correctamente.");
      } catch (error) {
        console.error("Error al eliminar:", error);
        alert("Ocurrió un error inesperado al eliminar el usuario.");
      }
    }
  };

  const handleRemoveRole = async (userId) => {
    const userToUpdate = users.find(user => user.id === userId);
    const token = localStorage.getItem("token");
    const adminEmail = localStorage.getItem("adminEmail");

    if (!userToUpdate) {
      console.warn(`Usuario con ID ${userId} no encontrado.`);
      return;
    }

    if (!token || !adminEmail) {
      alert("Sesión expirada. Inicia sesión nuevamente.");
      return;
    }

    if (userToUpdate.rol === 'chef') {
      alert(`El usuario ${userToUpdate.nombre} ya es un 'chef'. No se puede eliminar el rol más allá.`);
      return;
    }

    if (window.confirm(`¿Estás seguro de que quieres cambiar el rol de "${userToUpdate.nombre}" a "chef"?`)) {
      const adminPassword = prompt("Por favor, introduce tu contraseña de administrador para confirmar:");
      if (!adminPassword) return;

      const isValidAdmin = await validateAdminPassword(adminEmail, adminPassword);
      if (!isValidAdmin) {
        alert("Contraseña del administrador incorrecta.");
        return;
      }

      try {
        const payload = {
          ...userToUpdate,
          rol: 'chef',
          restaurante_id: userToUpdate.restaurante_id,
          adminPassword: adminPassword
        };

        const res = await fetch(`/usuarios/${userId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify(payload)
        });
        const result = await res.json();

        if (!res.ok) {
          alert(result.error || "Error al cambiar el rol del usuario.");
          return;
        }

        setUsers(prevUsers =>
          prevUsers.map(user =>
            user.id === userId ? { ...user, rol: 'chef' } : user
          )
        );
        alert(`El rol de ${userToUpdate.nombre} ha sido cambiado a 'chef'.`);
      } catch (error) {
        console.error("Error al cambiar rol:", error);
        alert("Ocurrió un error inesperado al cambiar el rol.");
      }
    }
  };


  const handleActivateUser = async (userId) => {
    const userToUpdate = users.find(user => user.id === userId);
    const token = localStorage.getItem("token");
    const adminEmail = localStorage.getItem("adminEmail");

    if (!userToUpdate) {
      console.warn(`Usuario con ID ${userId} no encontrado.`);
      return;
    }

    if (!token || !adminEmail) {
      alert("Sesión expirada. Inicia sesión nuevamente.");
      return;
    }

    if (userToUpdate.status === 'active') {
      alert(`El usuario ${userToUpdate.nombre} ya está "activo".`);
      return;
    }

    if (window.confirm(`¿Estás seguro de que quieres activar a "${userToUpdate.nombre}"?`)) {
      const adminPassword = prompt("Por favor, introduce tu contraseña de administrador para confirmar:");
      if (!adminPassword) return;

      const isValidAdmin = await validateAdminPassword(adminEmail, adminPassword);
      if (!isValidAdmin) {
        alert("Contraseña del administrador incorrecta.");
        return;
      }

      try {
        const payload = {
          ...userToUpdate,
          status: 'active',
          adminPassword: adminPassword
        };
        delete payload.password;

        const res = await fetch(`/usuarios/${userId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify(payload)
        });

        const result = await res.json();
        if (!res.ok) {
          alert(result.error || "Error al activar usuario.");
          return;
        }

        setUsers(prevUsers =>
          prevUsers.map(user =>
            user.id === userId ? { ...user, status: 'active' } : user
          )
        );
        alert(`El usuario ${userToUpdate.nombre} ha sido activado.`);
      } catch (error) {
        console.error("Error al activar usuario:", error);
        alert("Ocurrió un error inesperado al activar el usuario.");
      }
    }
  };


  const validateAdminPassword = async (adminEmail, password) => {
    try {
      const res = await fetch("/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: adminEmail, password })
      });
      return res.ok;
    } catch (error) {
      console.error("Error validating admin password:", error);
      return false;
    }
  };


  return (
    <div className="users-container">
      <div className="users-header">
        <div className="header-text">
          <h1>Usuarios</h1>
          <p>Maneja todos tus usuarios</p>
        </div>
        <button className="add-user-button" onClick={handleAddUser}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-plus">
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
          Add User
        </button>
      </div>
      <div className="users-filters">
        <input
          type="text"
          placeholder="Search users..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="filter-search-input"
        />
        <select
          value={selectedRole}
          onChange={(e) => setSelectedRole(e.target.value)}
          className="filter-dropdown"
        >
          <option value="All Roles">All Roles</option>
          <option value="Encargado">Encargado</option>
          <option value="Chef">Chef</option>
        </select>
        <select
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
          className="filter-dropdown"
        >
          <option value="All Status">All Status</option>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>
      </div>
      <table className="users-table">
        <thead>
          <tr>
            <th>User</th>
            <th>Role</th>
            <th>Status</th>
            <th>Restaurant</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map(user => (
            <tr key={user.id}>
              <td>
                <div className="user-info">
                  <div className="user-avatar">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-user">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                      <circle cx="12" cy="7" r="4"></circle>
                    </svg>
                  </div>
                  <div className="user-details">
                    <div className="user-name">{user.nombre}</div>
                    <div className="user-email">{user.email}</div>
                  </div>
                </div>
              </td>
              <td>
                <span className={`badge badge-${user.rol}`}>{user.rol}</span>
              </td>
              <td>
                <span className={`badge bg-${user.status === 'active' ? 'success' : 'secondary'}`}>
                  {user.status}
                </span>
              </td>
              <td className="actions-cell">
                {user.rol !== 'chef' && (
                  <button className="action-icon-button remove-role-button" onClick={() => handleRemoveRole(user.id)} title="Remove Role (to Chef)">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-x-circle">
                      <circle cx="12" cy="12" r="10"></circle>
                      <line x1="15" y1="9" x2="9" y2="15"></line>
                      <line x1="9" y1="9" x2="15" y2="15"></line>
                    </svg>
                  </button>
                )}
                <button className="action-icon-button edit-button" onClick={() => handleEditUser(user)} title="Edit User">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-edit-2">
                    <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path>
                  </svg>
                </button>
                <button className="action-icon-button delete-button" onClick={() => handleDeleteUser(user.id)} title="Delete User">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-trash-2">
                    <polyline points="3 6 5 6 21 6"></polyline>
                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                    <line x1="10" y1="11" x2="10" y2="17"></line>
                    <line x1="14" y1="11" x2="14" y2="17"></line>
                  </svg>
                </button>
                {user.status === 'inactive' && (
                  <button className="action-icon-button activate-button" onClick={() => handleActivateUser(user.id)} title="Activate User">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-check-circle">
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-8.8"></path>
                      <polyline points="22 4 12 14.01 9 11.01"></polyline>
                    </svg>
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {isModalOpen && (
        <UserModal
          user={currentUser}
          onSave={handleSaveUser}
          onClose={() => setIsModalOpen(false)}
          restaurants={restaurants}
        />
      )}
    </div>
  );
};
export default Users;


















