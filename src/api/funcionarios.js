import axios from "axios";

//Servicio encargado de realizacion peticiones HTTP para la obtencion de los funcionarios de la universidad

export const getPersonasDistinct = async (unidad) => {
  try {
    const response = await axios.get(
      `http://localhost:9090/api/v1/personal/getPersonasDistinct/${unidad}`
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

  axios
    .post("http://localhost:9090/api/v1/personal/agregarPersona", modelo)
    .then((response) => {console.log(response);})
    .catch((error) => {
      console.error(error);
    });
};

export const deletePersonaById = async (id, unidad) => {
  try {
    const response = await axios.get(
      `http://localhost:9090/api/v1/personal/deletePersonaById/${id}/${unidad}`
    );
    return response.data;
  } catch (error) {
    console.error(error);
    return [];
  }
};
