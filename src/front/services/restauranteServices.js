const backendUrl = import.meta.env.VITE_BACKEND_URL;

const therestaurant = {};

therestaurant.crearRestaurante = async (restaurante) => {
  
  const token = sessionStorage.getItem("token");
  const response = await fetch(`${backendUrl}/api/restaurantes`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`, // si tu API requiere "Bearer"
    },
    body: JSON.stringify(restaurante),
  });

  if (!response.ok) {
    throw new Error("Error al registrar gasto");
  }

  return await response.json();
};

therestaurant.getRestaurantes = async (token) => {
  const response = await fetch(`${backendUrl}/api/restaurantes`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  await new Promise((res) => setTimeout(res, 2000));

  if (!response.ok)
    throw new Error("No se pudo obtener la información del los usuarios");
  const data = await response.json();
  return data;
};
export default therestaurant;
