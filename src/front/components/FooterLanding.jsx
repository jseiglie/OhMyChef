import React from "react";
import { useNavigate } from "react-router-dom";
export const FooterLanding = () => {
  const navigate = useNavigate();

  return (
    <footer className="footer-landing contacto text-center py-0">
      <p className="mb-0 text-muted">
        <span onClick={() => navigate("/sobrenosotros")}>Sobre nosotros</span> /
        <span>contacto</span>
      </p>
    </footer>
  );
};

