import axios from "axios";

const authAxios = axios.create({
  baseURL: import.meta.env.VITE_PAOPHIM_API,
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
  getFavoriteMovie: ({ userId }) => authAxios.get(`/api/v1/favorite/favorite-movie/${userId}`),
  addFavoriteMovie: ({ userId, movieData }) => authAxios.post("/api/v1/favorite/add-favorite-movie", { userId, movieData }),
  deleteFavoriteMovie: ({ userId, slug }) => authAxios.post("/api/v1/favorite/remove-favorite-movie", { userId, slug }),
};

export default userService;
