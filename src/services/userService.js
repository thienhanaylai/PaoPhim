import axios from "axios";

const authAxios = axios.create({
  baseURL: import.meta.env.VITE_PAOPIHM_API,
  headers: { "Content-Type": "application/json" },
});

authAxios.interceptors.request.use(config => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

authAxios.interceptors.response.use(
  res => res.data,
  err => Promise.reject(err),
);

const userService = {
  login: ({ login, password }) => authAxios.post("/api/v1/users/login", { login, password }),
  getFavoriteMovie: ({ userId }) => authAxios.get(`/api/v1/users/favorite-movie/${userId}`),
  addFavoriteMovie: ({ userId, movieData }) => authAxios.post("/api/v1/users/add-favorite-movie", { userId, movieData }),
  deleteFavoriteMovie: ({ userId, slug }) => authAxios.post("/api/v1/users/remove-favorite-movie", { userId, slug }),
};

export default userService;
