import axios from "axios";

//Servicio encargado de realizacion peticiones HTTP para la obtencion de los usuarios

/**
   * Método que realiza la petición HTTP para guardar un nuevo usuario
   * @param {user} user - Username del nuevo admin 
   * @param {password} password - Contraseña del nuevo admin 
   * @Return HTTP Response
   * @throws Exception
   */
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

/**
   * Método que realiza la petición HTTP para traer todos los usuarios Admins 
   * @Return Lista de usuarios
   * @throws Exception
   */
export const getAllUsers = async () => {
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

/**
   * Método que realiza la petición HTTP para eliminar un usuario
   * @param {id} id - id del usuario a eliminar 
   * @throws Exception
   */
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
