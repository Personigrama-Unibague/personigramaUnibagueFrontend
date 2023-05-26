import axios from "axios";


export const getAllRolesByUnidad = async (unidad) => {
  try {
    const response = await axios.get(
      `http://localhost:9090/api/v1/roles/getAllRolesByUnidad/${unidad}`
    );
    return response.data;
  } catch (error) {
    console.error(error);
    return [];
  }
};



