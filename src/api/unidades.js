import axios from "axios";

//Servicio encargado de realizacion peticiones HTTP para la obtencion de las areas de la universidad

//Metodo recursivo para la jerarquizacion de las areas de la universidad
function createTree(organigrama, id) {
  var node = {};
  organigrama.filter((obj) => obj.id === id).forEach((obj) => (node = obj));
  var childrenIds = organigrama
    .filter((obj) => obj.parent_id === id)
    .map((obj) => obj.id);
  node.children = childrenIds.map((childId) =>
    createTree(organigrama, childId)
  );
  return node;
}

export const getUnidades = async () => {
  try {
    const response = await axios.get(
      "http://localhost:9090/api/v1/unidades/getUnidades"
    );

    var organigrama = response.data;
    let json = createTree(organigrama, null);
    return json;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const getUnidadNameById = async (id) => {
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
