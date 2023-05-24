import axios from "axios";
import localBackend from "./local-backend";

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

maxios.interceptors.request.use(
  function (config: any) {
    if (!localStorage.getItem("token")) {
      localBackend.resolve(
        config.url ?? "",
        config.method ?? "get",
        config.data
      );
      return;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

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
