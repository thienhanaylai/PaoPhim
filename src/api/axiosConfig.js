import axios from "axios";

const axiosClient = axios.create({
  baseURL: " https://phimapi.com/",
  headers: {
    "Content-Type": "application/json",
  },
});

axiosClient.interceptors.response.use(
  response => response.data,
  error => {
    return Promise.reject(error);
  },
);

export default axiosClient;
