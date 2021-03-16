import axios from "axios";

const maxios = axios.create({
  baseURL:
    process.env.NODE_ENV === "development"
      ? "http://localhost:3333"
      : "https://swag-gp-backend.osinachi.me",
});

maxios.defaults.headers.common["Content-Type"] = "application/json";
maxios.defaults.headers.common[
  "Authorization"
] = `Bearer ${localStorage.getItem("token")}`;

maxios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      window.location.href = "/auth/login";
    } else {
      return Promise.reject(error);
    }
  }
);

export default maxios;
