import axios from "axios";

export const getUnidades = async () => {
  try {
    const response = await axios.get(
      "http://localhost:9090/api/v1/unidades/getUnidades"
    );
    return response.data;
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

