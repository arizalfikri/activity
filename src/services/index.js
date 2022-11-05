import axios from "axios";

const Axios = axios.create({
  baseURL: "https://todo.api.devcode.gethired.id/",
});

export const actionAPI = async (method, url, ...rest) => {
  try {
    const response = await Axios[method](url, ...rest);
    return response?.data;
  } catch (error) {
    throw new Error(error);
  }
};
