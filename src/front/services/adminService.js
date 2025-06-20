const backendUrl = import.meta.env.VITE_BACKEND_URL;

const token = () => sessionStorage.getItem("token");

const adminService = {
  getRestaurantes: async () => {
    const res = await fetch(`${backendUrl}/api/restaurantes`, {
      headers: { Authorization: `Bearer ${token()}` }
    });
    return await res.json();
  },

  getResumenPorcentaje: async (restaurante_id, mes, ano) => {
    const res = await fetch(`${backendUrl}/api/admin/resumen-porcentaje?restaurante_id=${restaurante_id}&mes=${mes}&ano=${ano}`, {
      headers: { Authorization: `Bearer ${token()}` }
    });
    if (!res.ok) throw new Error("Error en resumen");
    return await res.json();
  },

  getResumenGeneral: async (mes, ano) => {
    const res = await fetch(`${backendUrl}/api/admin/resumen-general?mes=${mes}&ano=${ano}`, {
      headers: { Authorization: `Bearer ${token()}` }
    });
    if (!res.ok) throw new Error("Error al cargar resumen general");
    return await res.json();
  },

  getVentasDiarias: async (restaurante_id, mes, ano) => {
    const res = await fetch(`${backendUrl}/api/admin/ventas-diarias?restaurante_id=${restaurante_id}&mes=${mes}&ano=${ano}`, {
      headers: { Authorization: `Bearer ${token()}` }
    });
    if (!res.ok) throw new Error("Error al cargar ventas diarias");
    return await res.json();
  }
};


export default adminService;
