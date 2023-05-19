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
      `http://localhost:9090/api/v1/personal/findPersonalByUnidad/${id}`
    );
    return response.data;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const findPersonaById = async (id) => {
  try {
    const response = await axios.get(
      `http://localhost:9090/api/v1/personal/findPersonaById/${id}`
    );
    return response.data;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const getAgregarPersona = async (persona, unidad) => {

  const modelo = {...persona, unidad: unidad}

  console.log(modelo);
  axios
    .post("http://localhost:9090/api/v1/personal/agregarPersona", modelo)
    .then((response) => {})
    .catch((error) => {
      console.error(error);
    });
};

export const deletePersonaById = async (id) => {
  try {
    const response = await axios.get(
      `http://localhost:9090/api/v1/personal/deletePersonaById/${id}`
    );
    return response.data;
  } catch (error) {
    console.error(error);
    return [];
  }
};
