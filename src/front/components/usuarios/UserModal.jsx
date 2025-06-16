import React, { useState, useEffect } from 'react';
import '../styles/UserModal.css'; 

const UserModal = ({ isOpen, onClose, onSave, initialData }) => {
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    role: 'chef',
    status: 'active',
    restaurant: '',
  });

  useEffect(() => {
    if (initialData) {
      setUserData(initialData);
    }
  }, [initialData]);

  const handleChange = e => {
    const { name, value } = e.target;
    setUserData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    onSave(userData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <h2>{initialData ? 'Editar Usuario' : 'Crear Usuario'}</h2>
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
            <button type="button" onClick={onClose}>Cancelar</button>
            <button type="submit">Guardar</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserModal;
