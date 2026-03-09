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

const authService = {
  login: ({ login, password }) => authAxios.post("/api/v1/users/login", { login, password }),
  register: ({ username, email, password }) => authAxios.post("/api/v1/users/register", { username, email, password }),
  getProfile: () => authAxios.get("/api/v1/users/me"),
  updateProfile: ({ username, email }) => authAxios.patch("/api/v1/users/me", { username, email }),
  changePassword: ({ currentPassword, newPassword }) =>
    authAxios.put("/api/v1/users/change-password", { currentPassword, newPassword }),
};

export default authService;
