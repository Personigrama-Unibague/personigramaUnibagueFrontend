import axios from "axios";
import { API_URL } from "../config/config";

//Servicio encargado de realizacion peticiones HTTP para la obtencion de las unidades de la universidad

/**
 * Método recursivo para la jerarquización de unidades de la Universidad
 * @param {organigram} organigram JSON del organigrama de la Universidad
 * @param {id} id id de cada unidad
 * @Return True o False
 */

function createTree(organigram) {
  var tree = [];
  var map = {};

  organigram.forEach((node) => {
    map[node.id] = { ...node, children: [] };
  });

  organigram.forEach((node) => {
    if (node.parent_id && map[node.parent_id]) {
      map[node.parent_id].children.push(map[node.id]);
    } else {
      tree.push(map[node.id]);
    }
  });

  return {
    children: tree,
  };
}

/**
 * Método que realiza la petición HTTP para traer  todas las unidades
 * @Return Lista de unidades
 */
export const getUnities = async () => {
  try {
    const response = await axios.get(`${API_URL}/api/v1/unidades/getUnidades`);

    var organigram = response.data;
    let json = createTree(organigram, null);
    return json;
  } catch (error) {
    console.error(error);
    return [];
  }
};

/**
 * Método que realiza la petición HTTP para obtener el nombre de una unidad
 * @param {id} id id de la unidad
 * @Return Nombre de la unidad
 */
export const getUnityNameById = async (id) => {
  try {
    const response = await axios.get(
      `${API_URL}/api/v1/unidades/getUnidadNameById/${id}`
    );

    var name = response.data;
    return name;
  } catch (error) {
    console.error(error);
    return [];
  }
};
