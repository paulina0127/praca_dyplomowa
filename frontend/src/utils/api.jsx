import axios from "axios";

const userTokens = JSON.parse(localStorage.getItem("userTokens"));
const headers = userTokens
  ? {
      Authorization: `JWT ${userTokens.access}`,
      "Content-Type": "application/json",
    }
  : {
      "Content-Type": "application/json",
    };

const api = axios.create({
  baseURL: "http://127.0.0.1:8000",
  headers: headers,
});

export default api;
