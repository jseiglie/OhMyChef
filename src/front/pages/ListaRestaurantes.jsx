import React, { useState } from "react";

const ListaRestaurantes = ({ restaurantes }) => {
  const [therestaurante, setTherestaurante] = useState(null);

  const handlerditar = (restauranteSeleccionado) => {
    console.log("Restaurante seleccionado:", restauranteSeleccionado);
    setTherestaurante(restauranteSeleccionado);
  };

  return (
    <div className="container">
      <h5 className="mb-3">Lista de Restaurantes</h5>
      <ul className="list-group">
        {restaurantes.map((restaurante) => (
          <li
            key={restaurante.id}
            className="list-group-item d-flex justify-content-between align-items-center"
          >
            <div>
              <strong>{restaurante.nombre}</strong>
              <br />
              <small className="text-muted">{restaurante.direccion}</small>
              <br />
              <small className="text-muted">{restaurante.email_contacto}</small>
            </div>

            <div className="d-flex align-items-center gap-2">
              <span className="badge bg-secondary">{`ID: ${restaurante.id}`}</span>

              <button
                type="button"
                onClick={() => handlerditar(restaurante)}
                className="btn btn-sm btn-primary"
              >
                Editar
              </button>
              <button type="button" className="btn btn-sm btn-danger">
                Eliminar
              </button>
            </div>
          </li>
        ))}
      </ul>


    </div>
  );
};

export default ListaRestaurantes;
