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
    <div className="container-fluid py-4">
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-3">
        <div>
          <h1 className="h3">Usuarios</h1>
          <p className="text-muted mb-2">Maneja todos tus usuarios</p>
        </div>
        <button
          className="btn bg-orange"
          onClick={() => {
            setEditingUser(null);
            setIsModalOpen(true);
          }}
        >
          + Add User
        </button>
      </div>

      <div className="table-responsive">
        <table className="table table-striped table-hover align-middle text-center">
          <thead className="table-dark">
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
                  <div className="fw-semibold">{user.name}</div>
                  <div className="text-muted small">{user.email}</div>
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
                      ✏️
                    </button>
                    <button
                      className="btn btn-sm btn-outline-danger"
                      onClick={() => handleDelete(user.id)}
                      title="Delete"
                    >
                      🗑️
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50 d-flex justify-content-center align-items-center z-3">
          <div className="bg-white rounded p-4 shadow" style={{ minWidth: '300px', maxWidth: '500px', width: '90%' }}>
            <h2 className="h5 mb-3">{editingUser ? 'Editar Usuario' : 'Crear Usuario'}</h2>
            <form onSubmit={handleSubmit} className="row g-3">
              <div className="col-12">
                <input
                  type="text"
                  name="name"
                  className="form-control"
                  placeholder="Nombre"
                  value={userData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="col-12">
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  placeholder="Correo electrónico"
                  value={userData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="col-12">
                <select
                  name="role"
                  className="form-select"
                  value={userData.role}
                  onChange={handleChange}
                >
                  <option value="admin">Admin</option>
                  <option value="chef">Chef</option>
                </select>
              </div>
              <div className="col-12">
                <select
                  name="status"
                  className="form-select"
                  value={userData.status}
                  onChange={handleChange}
                >
                  <option value="active">Activo</option>
                  <option value="inactive">Inactivo</option>
                </select>
              </div>
              <div className="col-12">
                <input
                  type="text"
                  name="restaurant"
                  className="form-control"
                  placeholder="Restaurante"
                  value={userData.restaurant}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="col-12 d-flex justify-content-end gap-2">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancelar
                </button>
                <button type="submit" className="btn btn-success">
                  Guardar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>

  );
};

export default Usuarios;
