const backendUrl = import.meta.env.VITE_BACKEND_URL;
const token = () => sessionStorage.getItem("token");
const adminService = {
  getRestaurantes: async () => {
    const res = await fetch(`${backendUrl}/api/restaurantes`, {
      headers: { Authorization: `Bearer ${token()}` },
    });
    return await res.json();
  },
  getResumenPorcentaje: async (restaurante_id, mes, ano) => {
    const res = await fetch(
      `${backendUrl}/api/admin/resumen-porcentaje?restaurante_id=${restaurante_id}&mes=${mes}&ano=${ano}`,
      {
        headers: { Authorization: `Bearer ${token()}` },
      }
    );
    if (!res.ok) throw new Error("Error en resumen");
    return await res.json();
  },
  getResumenAdminGastos: async (mes, ano) => {
    try {
      const response = await fetch(
        `${backendUrl}/api/admin/gastos/resumen?mes=${mes}&ano=${ano}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token()}`,
          },
        }
      );
      if (!response.ok) throw new Error("Error al obtener resumen");
      return await response.json();
    } catch (error) {
      console.error("Error en getResumenAdminGastos:", error);
      return null;
    }
  },
  getResumenGeneral: async (mes, ano) => {
    const res = await fetch(
      `${backendUrl}/api/admin/resumen-general?mes=${mes}&ano=${ano}`,
      {
        headers: { Authorization: `Bearer ${token()}` },
      }
    );
    if (!res.ok) throw new Error("Error al cargar resumen general");
    return await res.json();
  },
  getVentasDiarias: async (restaurante_id, mes, ano) => {
    const res = await fetch(
      `${backendUrl}/api/admin/ventas-diarias?restaurante_id=${restaurante_id}&mes=${mes}&ano=${ano}`,
      {
        headers: { Authorization: `Bearer ${token()}` },
      }
    );
    if (!res.ok) throw new Error("Error al cargar ventas diarias");
    return await res.json();
  },
  getGastoPorRestaurante: async (mes, ano) => {
    const res = await fetch(
      `${backendUrl}/api/admin/gasto-restaurantes?mes=${mes}&ano=${ano}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token()}`,
        },
      }
    );
    if (!res.ok) throw new Error("Error al obtener gasto por restaurante");
    return await res.json();
  },
  getGastoDiario: async (restaurante_id, mes, ano) => {
    const res = await fetch(
      `${backendUrl}/api/admin/gastos/resumen-diario?restaurante_id=${restaurante_id}&mes=${mes}&ano=${ano}`,
      {
        headers: { Authorization: `Bearer ${token()}` },
      }
    );
    if (!res.ok) throw new Error("Error al obtener resumen diario de gastos");
    return await res.json();
  },
  getResumenGastoDiario: async (restaurante_id, mes, ano) => {
    const res = await fetch(
      `${backendUrl}/api/admin/resumen-gasto-diario?restaurante_id=${restaurante_id}&mes=${mes}&ano=${ano}`,
      {
        headers: { Authorization: `Bearer ${token()}` },
      }
    );
    const contentType = res.headers.get("content-type");
    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(`Error ${res.status}: ${errorText}`);
    }
    if (contentType && contentType.includes("application/json")) {
      return await res.json();
    } else {
      const text = await res.text();
      throw new Error(`Respuesta no JSON: ${text}`);
    }
  },
  getGastosPorDia: async (restaurante_id, mes, ano) => {
    const res = await fetch(
      `${backendUrl}/api/admin/gastos/por-dia?restaurante_id=${restaurante_id}&mes=${mes}&ano=${ano}`,
      {
        headers: { Authorization: `Bearer ${token()}` },
      }
    );
    if (!res.ok) throw new Error("Error al obtener gastos por día");
    return await res.json();
  },
  getVentasPorRestaurante: async (restauranteId, mes, ano) => {
    const res = await fetch(
      `${backendUrl}/api/ventas?restaurante_id=${restauranteId}&mes=${mes}&ano=${ano}`,
      {
        headers: { Authorization: `Bearer ${token()}` },
      }
    );
    if (!res.ok) throw new Error("Error al obtener ventas");
    return await res.json();
  },
};

export default adminService;




















