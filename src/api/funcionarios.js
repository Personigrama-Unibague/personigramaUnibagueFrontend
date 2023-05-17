import axios from "axios";

//Servicio encargado de realizacion peticiones HTTP para la obtencion de los funcionarios de la universidad

export const getFuncionarios = async () => {
  try {
    const response = await axios.get(
      "http://localhost:9090/api/v1/personal/getPersonal"
    );
    return response.data;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const getFuncionariosByUnidad = async (id) => {
  try {
    const response = await axios.get(
      `http://localhost:9090/api/v1/personal/getPersonalByUnidad/${id}`
    );
    return response.data;
  } catch (error) {
    console.error(error);
    return [];
  }
};