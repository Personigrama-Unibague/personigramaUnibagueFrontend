import axios from "axios";

export const getAllRolesByUnidad = async (unidad) => {
  try {
    const response = await axios.get(
      `http://localhost:9090/api/v1/roles/getAllRolesByUnidad/${unidad}`
    );
    const list = response.data.sort((a, b) => a.id_jerar - b.id_jerar);
    return list;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const saveRol = async (id_jerar, nombre, unidad) => {
  try {
    const response = await axios.get(
      `http://localhost:9090/api/v1/roles/saveRol/${id_jerar}/${nombre}/${unidad}`
    );
    return response.data;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const deleteRolById = async (id, unidad) => {
  try {
    const response = await axios.get(
      `http://localhost:9090/api/v1/roles/deleteRolById/${id}/${unidad}`
    );
    return response.data;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const updateNameById = async (id, nombre) => {
  try {
    const response = await axios.get(
      `http://localhost:9090/api/v1/roles/updateNameById/${id}/${nombre}`
    );
    return response.data;
  } catch (error) {
    console.error(error);
    return [];
  }
};
