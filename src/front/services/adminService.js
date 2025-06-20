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
  getResumenAdminGastos: async (mes, ano) => {
    try {
      const response = await fetch(`${backendUrl}/api/admin/gastos/resumen?mes=${mes}&ano=${ano}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token()}`
        }
      });
      if (!response.ok) throw new Error("Error al obtener resumen");
      return await response.json();
    } catch (error) {
      console.error("Error en getResumenAdminGastos:", error);
      return null;
    }
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










