import axios from "axios";

const getFuncionarios = async () => {
    try {
      const response = await axios.get('http://localhost:9090/api/v1/personal/getPersonal');
      return response.data;
    } catch (error) {
      console.error(error);
      return [];
    }
  };
/*   
  const getFuncionariosByUnidad = async () => {
    try {
      const response = await axios.get('https://jsonplaceholder.typicode.com/users/${unidad}');
      return response.data;
    } catch (error) {
      console.error(error);
      return [];
    }
  }; */
