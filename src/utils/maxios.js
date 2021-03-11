import axios from "axios";

const maxios = axios.create({
  baseURL: "http://localhost:5000",
});

maxios.defaults.headers.common["Content-Type"] = "application/json";
maxios.defaults.headers.common[
  "Authorization"
] = `Bearer ${localStorage.getItem("token")}`;

maxios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      window.location.href = "/";
    } else {
      return Promise.reject(error);
    }
  }
);

export default maxios;
