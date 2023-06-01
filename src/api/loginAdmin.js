import axios from "axios";

export const getPersonal = async (user, password) => {
    try {
      const response = await axios.get(
        `http://localhost:9090/api/v1/login/loginAuthentication/${user}/${password}`
      );
      return response.data;
    } catch (error) {
      console.error(error);
      return [];
    }
  };