import axios from "axios";

const apiUrl ="https://api.care4edu.com/c4e/asat";
const username = "admin";
const password = "Smarter@1234";

export const c4eApi = axios.create({
    baseURL: apiUrl,
    auth: {
      username: username,
      password: password,
    },
    headers: {
      "Content-Type": "application/json",
    },
});

export const apiData = {
    apiUrl,
    username,
    password
}