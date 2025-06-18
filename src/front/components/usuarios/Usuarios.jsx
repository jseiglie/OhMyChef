import React, { useState } from 'react';
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


  const [users, setUsers] = useState([
    { id: 1, name: 'Sarah Johnson', email: 'sarah@ohmychef.com', role: 'admin', status: 'active', restaurant: 'Italian Bistro' },
    { id: 2, name: 'Marco Rossi', email: 'marco@ohmychef.com', role: 'chef', status: 'active', restaurant: 'Sushi Central' },
    { id: 3, name: 'Emily Chen', email: 'emily@ohmychef.com', role: 'chef', status: 'inactive', restaurant: 'Burger Joint' },
    { id: 4, name: 'David Lee', email: 'david@ohmychef.com', role: 'admin', status: 'active', restaurant: 'Pizza Palace' },
    { id: 5, name: 'Laura Martinez', email: 'laura@ohmychef.com', role: 'viewer', status: 'active', restaurant: 'Taco Town' },
  ]);

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) || user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = selectedRole === 'All Roles' || user.role === selectedRole.toLowerCase();
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

  const handleSaveUser = (userData) => {
    if (userData.id) {
      setUsers(users.map(user =>
        user.id === userData.id ? userData : user
      ));
    } else {
      const newId = users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1;
      setUsers([...users, { ...userData, id: newId }]);
    }
    setIsModalOpen(false);
  };

  const handleDeleteUser = (userId) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar a este usuario?')) {
      setUsers(users.filter(user => user.id !== userId));
    }
  };

  const handleRemoveRole = (userId) => {
    const userToUpdate = users.find(user => user.id === userId);

    if (!userToUpdate) {
      console.warn(`Usuario con ID ${userId} no encontrado.`);
      return;
    }

    if (userToUpdate.role === 'viewer') {
      alert(`El usuario ${userToUpdate.name} ya es un 'viewer'. No se puede eliminar el rol.`);
      return;
    }
    if (window.confirm(`¿Estás seguro de que quieres cambiar el rol de "${userToUpdate.name}" a "viewer"?`)) {
      console.log(`Simulando llamada a API para actualizar rol del usuario ${userId} a 'viewer'`);
      setTimeout(() => {
        setUsers(prevUsers =>
          prevUsers.map(user =>
            user.id === userId ? { ...user, role: 'viewer' } : user
          )
        );
        alert(`El rol de ${userToUpdate.name} ha sido cambiado a 'viewer'.`);
        console.log(`Rol del usuario ${userId} actualizado a 'viewer' en el estado local.`);
      }, 500);
    }
  };

  const handleActivateUser = (userId) => {
    const userToUpdate = users.find(user => user.id === userId);

    if (!userToUpdate) {
      console.warn(`Usuario con ID ${userId} no encontrado.`);
      return;
    }

    if (userToUpdate.status === 'active') {
      alert(`El usuario ${userToUpdate.name} ya está "activo".`);
      return;
    }

    if (window.confirm(`¿Estás seguro de que quieres activar a "${userToUpdate.name}"?`)) {
      console.log(`Simulando llamada a API para activar el usuario ${userId}`);

      setTimeout(() => {
        setUsers(prevUsers =>
          prevUsers.map(user =>
            user.id === userId ? { ...user, status: 'active' } : user
          )
        );
        alert(`El usuario ${userToUpdate.name} ha sido activado.`);
        console.log(`Estado del usuario ${userId} actualizado a 'active' en el estado local.`);
      }, 500);
    }
  };


  return (
    <div className="dashboard-container users-container">
      <div className="users-header">
        <div className="header-text">
          <h1>Usuarios</h1>
          <p>Maneja todos tus usuarios</p>
        </div>
        <button className="btn btn-success" onClick={handleAddUser}>
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
          <option value="Admin">Admin</option>
          <option value="Chef">Chef</option>
          <option value="Viewer">Viewer</option>
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
      <div className="table-responsive">
        <table className="table table-striped users-table">
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
                      <div className="user-name">{user.name}</div>
                      <div className="user-email">{user.email}</div>
                    </div>
                  </div>
                </td>
                <td>
                  <span className={`badge bg-${user.role === 'admin' ? 'primary' : 'warning'} text-white`}>
                    {user.role}
                  </span>
                </td>
                <td>
                  <span className={`badge bg-${user.status === 'active' ? 'success' : 'secondary'}`}>
                    {user.status}
                  </span>
                </td>
                <td>{user.restaurant}</td>
                <td>
                  <div className="d-flex justify-content-start gap-2">
                    <button
                      className="btn btn-sm btn-outline-primary"
                      onClick={() => handleEdit(user)}
                      title="Edit"
                    >
                      :lápiz2:
                    </button>
                    <button
                      className="btn btn-sm btn-outline-danger"
                      onClick={() => handleDelete(user.id)}
                      title="Delete"
                    >
                      :papelera:
                    </button>
                    {user.status === 'inactive' && (
                      <button
                        className="btn btn-sm btn-outline-success"
                        onClick={() => handleActivateUser(user.id)}
                        title="Activate"
                      >
                        :marca_de_verificación_blanca:
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {isModalOpen && (
        <UserModal
          user={currentUser}
          onSave={handleSaveUser}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
};
export default Users;


















