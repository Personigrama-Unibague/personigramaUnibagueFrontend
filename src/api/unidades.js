import axios from "axios";

//Servicio encargado de realizacion peticiones HTTP para la obtencion de las unidades de la universidad

/**
   * Método recursivo para la jerarquización de unidades de la Universidad
   * @param {organigram} organigram JSON del organigrama de la Universidad 
   * @param {id} id id de cada unidad
   * @Return True o False
   */
function createTree(organigram, id) {
  var node = {};
  organigram.filter((obj) => obj.id === id).forEach((obj) => (node = obj));
  var childrenIds = organigram
    .filter((obj) => obj.parent_id === id)
    .map((obj) => obj.id);
  node.children = childrenIds.map((childId) =>
    createTree(organigram, childId)
  );
  return node;
}

/**
   * Método que realiza la petición HTTP para traer  todas las unidades
   * @Return Lista de unidades
   */
export const getUnities = async () => {
  try {
    const response = await axios.get(
      "http://localhost:9090/api/v1/unidades/getUnidades"
    );

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
      `http://localhost:9090/api/v1/unidades/getUnidadNameById/${id}`
    );

    var name = response.data;
    return name;
  } catch (error) {
    console.error(error);
    return [];
  }
};


/* const getUnidadesByUnidad = async () => {
  try {
    const response = await axios.get(
      "https://jsonplaceholder.typicode.com/users/${unidad}"
    );
    return response.data;
  } catch (error) {
    console.error(error);
    return [];
  } */
