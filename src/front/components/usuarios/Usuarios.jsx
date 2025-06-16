import React, { useState, useEffect } from 'react';
import "../../styles/Usuarios.css";
import "../../styles/UserModal.css";

const mockUsers = [
  {
    id: 1,
    name: 'Sarah Johnson',
    email: 'sarah@ohmychef.com',
    role: 'admin',
    status: 'active',
    restaurant: 'OhMyChef HQ',
  },
  {
    id: 2,
    name: 'Marco Rossi',
    email: 'marco@ohmychef.com',
    role: 'chef',
    status: 'active',
    restaurant: 'Pasta Viva',
  },
  {
    id: 3,
    name: 'Emily Chen',
    email: 'emily@ohmychef.com',
    role: 'chef',
    status: 'inactive',
    restaurant: 'Asian Bites',
  },
];

const Usuarios = () => {
  const [users, setUsers] = useState(mockUsers);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    role: 'chef',
    status: 'active',
    restaurant: '',
  });

  useEffect(() => {
    if (editingUser) {
      setUserData(editingUser);
    } else {
      setUserData({
        name: '',
        email: '',
        role: 'chef',
        status: 'active',
        restaurant: '',
      });
    }
  }, [editingUser]);

  const handleChange = e => {
    const { name, value } = e.target;
    setUserData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (editingUser) {
      setUsers(prev =>
        prev.map(u => (u.id === editingUser.id ? { ...userData, id: u.id } : u))
      );
    } else {
      setUsers(prev => [...prev, { ...userData, id: Date.now() }]);
    }
    setIsModalOpen(false);
    setEditingUser(null);
  };

  const handleEdit = user => {
    setEditingUser(user);
    setIsModalOpen(true);
  };

  const handleDelete = id => {
    setUsers(prev => prev.filter(u => u.id !== id));
  };

  return (
    <div className="usuarios-container">
      <div className="usuarios-header">
        <div>
          <h1 className="usuarios-title">Usuarios</h1>
          <p className="usuarios-subtitle">maneja todos tus usuarios</p>
        </div>
        <button
          className="add-user-button"
          onClick={() => {
            setEditingUser(null);
            setIsModalOpen(true);
          }}
        >
          + Add User
        </button>
      </div>

      <table className="usuarios-table">
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
          {users.map(user => (
            <tr key={user.id}>
              <td>
                <div className="user-info-name">{user.name}</div>
                <div className="user-info-email">{user.email}</div>
              </td>
              <td>
                <span className={`badge ${user.role}`}>{user.role}</span>
              </td>
              <td>
                <span className={`badge ${user.status}`}>{user.status}</span>
              </td>
              <td>{user.restaurant}</td>
              <td>
                <div className="user-actions">
                  <button onClick={() => handleEdit(user)} title="Edit">✏️</button>
                  <button onClick={() => handleDelete(user.id)} title="Delete" className="delete">🗑️</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {isModalOpen && (
        <div className="modal-backdrop">
          <div className="modal">
            <h2>{editingUser ? 'Editar Usuario' : 'Crear Usuario'}</h2>
            <form onSubmit={handleSubmit} className="modal-form">
              <input
                type="text"
                name="name"
                placeholder="Nombre"
                value={userData.name}
                onChange={handleChange}
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Correo electrónico"
                value={userData.email}
                onChange={handleChange}
                required
              />
              <select name="role" value={userData.role} onChange={handleChange}>
                <option value="admin">Admin</option>
                <option value="chef">Chef</option>
              </select>
              <select name="status" value={userData.status} onChange={handleChange}>
                <option value="active">Activo</option>
                <option value="inactive">Inactivo</option>
              </select>
              <input
                type="text"
                name="restaurant"
                placeholder="Restaurante"
                value={userData.restaurant}
                onChange={handleChange}
                required
              />
              <div className="modal-actions">
                <button type="button" onClick={() => setIsModalOpen(false)}>Cancelar</button>
                <button type="submit">Guardar</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Usuarios;
