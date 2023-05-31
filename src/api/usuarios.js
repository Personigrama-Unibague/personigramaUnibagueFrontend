import axios from "axios";

//Servicio encargado de realizacion peticiones HTTP para la obtencion de los usuarios

export const getSaveNewUser = async (user, password) => {
  try {
    const response = await axios.get(
      `http://localhost:9090/api/v1/login/saveNewUser/${user}/${password}`
    );
    return response.data;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const getPersonal = async () => {
  try {
    const response = await axios.get(
      `http://localhost:9090/api/v1/login/findAllUsers`
    );
    return response.data;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const getDeleteUser = async (id) => {
  try {
    const response = await axios.get(
      `http://localhost:9090/api/v1/login/deleteUser/${id}`
    );
    return response.data;
  } catch (error) {
    console.error(error);
    return [];
  }
};
