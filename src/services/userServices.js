const userServices = {};
const backendUrl = import.meta.env.VITE_BACKEND_URL;

userServices.register = async (formData) => {
  try {
    const resp = await fetch(backendUrl + "/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    if (!resp.ok) throw Error("something went wrong");
    const data = await resp.json();

    return data;
  } catch (error) {
    console.log(error);
  }
};

const getUserinfo = async () => {
  try {
    const token = sessionStorage.getItem("token");
    const response = await fetch(`${backendUrl}/api/private`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

   
    if (!response.ok) {
      throw new Error("No se pudo obtener la información del usuario");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error en getUserinfo:", error);
    throw error;
  }
};

userServices.login = async (formData) => {
  debugger;
  try {
    const resp = await fetch(backendUrl + "/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    if (!resp.ok) throw Error("something went wrong");
    const data = await resp.json();
    sessionStorage.setItem("token", data.token);

    return data;
  } catch (error) {
    console.log(error);
  }
};

export default userServices;
