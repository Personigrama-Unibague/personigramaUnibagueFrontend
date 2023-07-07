import axios from "axios";
import { API_URL } from "../config/config";

//Servicio encargado de realizacion peticiones HTTP para verificar si un usuario es admin

/**
 * Método que realiza la petición HTTP loguear un usuario admin
 * @param {user} user - Username del usuario admin
 * @param {password} password - password del usuario admin
 * @Return True o False
 */
export const authUser = async (user, password) => {
  try {
    const response = await axios.get(
      `${API_URL}/api/v1/login/loginAuthentication/${user}/${password}`
    );
    return response.data;
  } catch (error) {
    console.error(error);
    return [];
  }
};
