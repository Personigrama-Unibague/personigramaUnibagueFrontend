import axios from "axios";

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
    let jsonFinal = JSON.stringify(json);
    console.log(jsonFinal);

    return jsonFinal;
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
