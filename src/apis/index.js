import axios from "axios";

// Criando uma instancia "pré-configurada" do Axios, com a raiz do endereço do nosso servidor
const api = axios.create({
  baseURL: "http://localhost:4000/api",
});

const storedUser = localStorage.getItem("loggedInUser");

const loggedInUser = JSON.parse(storedUser || '""');

api.interceptors.request.use((config) => {
  config.headers = {
    Authorization: `Bearer ${loggedInUser.token}`,
  };

  return config;
});

export default api;
