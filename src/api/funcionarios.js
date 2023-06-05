import axios from "axios";

//Servicio encargado de realizacion peticiones HTTP para la obtencion de los funcionarios de la universidad

/**
   * Método que realiza la petición HTTP para traer  personas unicas de tipo distinct por unidad
   * @param {unity} unity - Unidad seleccionada
   * @Return Lista de personas
   * @throws Exception
   */
export const getPeopleDistinct = async (unity) => {
  try {
    const response = await axios.get(
      `http://localhost:9090/api/v1/personal/getPersonasDistinct/${unity}`
    );
    return response.data;
  } catch (error) {
    console.error(error);
    return [];
  }
};

/**
   * Método que realiza la petición HTTP para traer personas de una unidad
   * @param {unidad} unity - Unidad seleccionada
   * @Return Lista de personas
   * @throws Exception
   */
export const getEmployeeByUnity = async (unity) => {
  try {
    const response = await axios.get(
      `http://localhost:9090/api/v1/personal/findPersonalByUnidad/${unity}`
    );
    const list = response.data.sort((a, b) => {
      const nameA = a.nombre.toLowerCase();
      const nameB = b.nombre.toLowerCase();

      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }
      return 0;
    });

    return list;
  } catch (error) {
    console.error(error);
    return [];
  }
};

/**
   * Método que realiza la petición HTTP para traer persona por su cedula (id)
   * @param {id} id - id de la persona
   * @Return person
   * @throws Exception
   */
export const findPersonById = async (id) => {
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

/**
   * Método que realiza la petición HTTP para guardar una persona
   * @param {person} person  Persona a guardar
   * @param {unity} unity  Unidad a guardar la persona
   * @throws Exception
   */
export const getSavePersona = async (person, unity) => {
  const model = { ...person, unidad: unity };

  axios
    .post("http://localhost:9090/api/v1/personal/savePersona", model)
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.error(error);
    });
};
/**
   * Método que realiza la petición HTTP para eliminar una persona por cedula
   * @param {id} id id (cedula) de la persona e eliminar
   * @param {unity} unity unidad de la persona e eliminar
   * @throws Exception
   */
export const deletePersonById = async (id, unity) => {
  try {
    await axios.get(
      `http://localhost:9090/api/v1/personal/deletePersonaById/${id}/${unity}`
    );
  } catch (error) {
    console.error(error);
  }
};

/**
   * Método que realiza la petición HTTP para actualizar el id_jerar (posición en una sección) de una persona
   * @param {id} id  id jerarquico a actualizar
   * @param {cedula} cedula  cedula de la persona a actualizar id jerarquico
   * @param {unity} unity  unidad de la persona a actualizar id jerarquico
   * @throws Exception
   */
export const updateIdJerarByCedulaUnd = async (id, cedula, unity) => {
  try {
    await axios.get(
      `http://localhost:9090/api/v1/personal/updateIdJerarByCedulaUnd/${id}/${cedula}/${unity}`
    );
  } catch (error) {
    console.error(error);
  }
};

/**
   * Método que realiza la petición HTTP que actualiza una persona  su id_jerar a default
   * @param {cedula} cedula  cedula de la persona a actualizar id_jerar a default (0)
   * @param {unity} unity  unidad de la persona a actualizar id_jerar a default (0)
   * @throws Exception
   */
export const updateIdJerarDefault = async (cedula, unity) => {
  try {
    await axios.get(
      `http://localhost:9090/api/v1/personal/updateIdJerarByCedulaUnd/${cedula}/${unity}`
    );
  } catch (error) {
    console.error(error);
  }
};

/**
   * Método que realiza la petición HTTP para actualizar el Id_jerar de todas las personas de una unidad
   * @param {id_jerar} id_jerar  id_jerar a actualizar
   * @param {unity} unity  unidad de pertenencia
   * @throws Exception
   */
export const updateIdJerarDefaultALlSection = async (id_jerar, unity) => {
  try {
    await axios.get(
      `http://localhost:9090/api/v1/personal/updateIdJerarDefaultAllSection/${id_jerar}/${unity}`
    );
  } catch (error) {
    console.error(error);
  }
};
