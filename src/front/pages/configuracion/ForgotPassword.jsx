import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {

  const [emailConfirmed, setEmailConfirmed] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!emailConfirmed) {
      // Verifica si el email existe
      try {
        const resp = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/forgot-password`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        });
        const data = await resp.json();
        if (resp.ok) {
          setEmailConfirmed(true); // Mostrar campos de nueva contraseña
          setMessage(null);        // Elimina la alerta de "Revisa tu correo"
        } else {
          setMessage(data.msg);
        }
      } catch (error) {
        console.error(error);
        setMessage("Ocurrió un error al procesar tu solicitud.");
      }
    } else {
      // Enviar nueva contraseña
      if (newPassword !== confirmPassword) {
        return setMessage("Las contraseñas no coinciden.");
      }
      try {
        const resp = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/reset-password`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, new_password: newPassword }),
        });
        const data = await resp.json();
        setMessage(data.msg);
      } catch (error) {
        console.error(error);
        setMessage("Ocurrió un error al actualizar la contraseña.");
      }
    }
  };
  return (
    <div className="container mt-5" style={{ maxWidth: "500px" }}>
      <h2>Recuperar contraseña</h2>
      {message && (
        <div className={`alert mt-3 ${message.includes("correctamente") ? "alert-success" : "alert-danger"}`}>
          {message}
        </div>
      )}
      <form onSubmit={handleSubmit}>
        {!emailConfirmed ? (
          <>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Correo electrónico</label>
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="Introduce tu correo"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </>
        ) : (
          <>
            <div className="mb-3">
              <label htmlFor="newPassword" className="form-label">Nueva contraseña</label>
              <input
                type="password"
                className="form-control"
                id="newPassword"
                placeholder="Introduce tu nueva contraseña"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="confirmPassword" className="form-label">Confirmar contraseña</label>
              <input
                type="password"
                className="form-control"
                id="confirmPassword"
                placeholder="Confirma tu nueva contraseña"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
          </>
        )}
        <button type="submit" className="btn btn-primary w-100">
          {emailConfirmed ? "Actualizar contraseña" : "Enviar"}
        </button>
      </form>
      {message === "Contraseña actualizada correctamente" && (
        <button className="btn btn-success w-100 mt-3" onClick={() => navigate("/")}>
          Volver al login
        </button>
      )}
    </div>
  );
};
export default ForgotPassword;

























