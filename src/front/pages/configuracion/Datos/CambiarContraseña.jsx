import React from "react";

export const CambiarContraseña = () => {
  return (
    <div className="card p-4 mb-4">
      <h4>Cambiar contraseña</h4>
      <form>
        <div className="mb-3">
          <label className="form-label">Contraseña actual</label>
          <input type="password" className="form-control" placeholder="Contraseña actual" />
        </div>
        <div className="mb-3">
          <label className="form-label">Nueva contraseña</label>
          <input type="password" className="form-control" placeholder="Nueva contraseña" />
        </div>
        <div className="mb-3">
          <label className="form-label">Confirmar nueva contraseña</label>
          <input type="password" className="form-control" placeholder="Repite nueva contraseña" />
        </div>
        <button type="submit" className="btn btn-primary">Actualizar contraseña</button>
      </form>
    </div>
  );
};
