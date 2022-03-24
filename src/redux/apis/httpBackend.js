import axios from "axios";

export const baseUrl = "http://35.201.2.209:8000";

const fetchClient = () => {
  const defaultOptions = {
    baseURL: baseUrl,
    headers: {
      "Content-Type": "application/json",
    },
  };

  let instance = axios.create(defaultOptions);
  instance.interceptors.request.use(function (config) {
    const token = localStorage.getItem("auth_token");
    config.headers.Authorization = token ? `Bearer ${token}` : "";
    return config;
  });
  return instance;
};

export default fetchClient();
