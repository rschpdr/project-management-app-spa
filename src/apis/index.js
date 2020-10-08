import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:4000/api",
});

const loggedInUser = localStorage.getItem("loggedInUser");

const storedUser = JSON.parse(loggedInUser || '""');

api.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    if (storedUser.token) {
      config.headers = {
        Authorization: `Bearer ${storedUser.token}`,
      };
    }
    return config;
  },
  function (error) {
    // Do something with request error
    console.error(error);
  }
);

export default api;
