import axios from "axios";

//Servicio encargado de realizacion peticiones HTTP para administrar los roles

/**
 * Método que realiza la petición HTTP para traer los roles por unidad
 * @param {unity} user unidad a la que pertenecen los roles
 * @Return Lista de roles
 * @throws Exception
 */
export const getAllRolesByUnity = async (unity) => {
  try {
    const response = await axios.get(
      `http://localhost:9090/api/v1/roles/getAllRolesByUnidad/${unity}`
    );
    const list = response.data.sort((a, b) => a.id_jerar - b.id_jerar);
    return list;
  } catch (error) {
    console.error(error);
    return [];
  }
};

/**
 * Método que realiza la petición HTTP guardar un nuevo rol en una unidad
 * @param {id_jerar} id_jerar de los roles
 * @param {name} name nombre del rol
 * @param {unity} unity unidad a la que pertenecen el
 * @Return HTTP response
 * @throws Exception
 */
export const saveRol = async (name, unity) => {
  try {
    const response = await axios.get(
      `http://localhost:9090/api/v1/roles/saveRol/${name}/${unity}`
    );
    return response.data;
  } catch (error) {
    console.error(error);
    return [];
  }
};

/**
 * Método que realiza la petición HTTP eliminar un  rol de una unidad
 * @param {id} id del rol a eliminar
 * @param {unity} unity unidad a la que pertenecen el
 * @Return HTTP response
 * @throws Exception
 */

export const deleteRolById = async (id, unity) => {
  try {
    const response = await axios.get(
      `http://localhost:9090/api/v1/roles/deleteRolById/${id}/${unity}`
    );
    return response.data;
  } catch (error) {
    console.error(error);
    return [];
  }
};

/**
 * Método que realiza la petición HTTP para actualizar el nombre de un rol
 * @param {id} id del rol a actualizar
 * @param {name} name nombre nuevo del rol
 * @Return HTTP response
 * @throws Exception
 */
export const updateNameById = async (id, name) => {
  try {
    const response = await axios.get(
      `http://localhost:9090/api/v1/roles/updateNameById/${id}/${name}`
    );
    return response.data;
  } catch (error) {
    console.error(error);
    return [];
  }
};

/**
 * Método que realiza la petición HTTP para actualizar el id_jerar de un rol
 * @param {id_antiguo} id_antiguo id_jerar actual del rol
 * @param {id_nuevo} id_nuevo id_jerar nuevo del rol
 * @param {unidad} unidaa unidad a la que pertenece el rol
 * @Return HTTP response
 * @throws Exception
 */
export const updateIdJerarRol = async (id_antiguo, id_nuevo, unidad) => {
  try {
    const response = await axios.get(
      `http://localhost:9090/api/v1/roles/updateIdJerarRol/${id_antiguo}/${id_nuevo}/${unidad}`
    );
    return response.data;
  } catch (error) {
    console.error(error);
    return [];
  }
};
