import axios from "axios";
import dayjs from "dayjs";
import jwt_decode from "jwt-decode";

export const BaseURL =
  process.env.REACT_APP_API_URL || "http://localhost:8000/";

const createAxiosInstance = axios.create({
  baseURL: BaseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const createAxiosFormInstance = axios.create({
  baseURL: BaseURL,
  headers: {
    "Content-Type": "multipart/form-data",
  },
});

async function refreshToken(config) {
  const token = localStorage.getItem("accessToken");

  if (token) {
    console.log("token: ", token);
    const decode = jwt_decode(token);
    const tokenIsValid = dayjs().diff(dayjs.unix(decode.exp)) < 1;

    if (!tokenIsValid) {
      try {
        const refresh = localStorage.getItem("refreshToken");
        const { data } = await axios.post(`${BaseURL}/auth/refresh`, {
          refresh,
        });

        localStorage.setItem("accessToken", data.access);
        config.headers.Authorization = `Bearer ${data.access}`;
      } catch (error) {
        console.error(error);
        // Handle error refreshing token
        localStorage.clear();
        window.location.href = "/login";
      }
    } else {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }

  return config;
}

createAxiosInstance.interceptors.request.use(
  async (config) => {
    return await refreshToken(config);
  },
  (error) => {
    return Promise.reject(error);
  }
);

createAxiosFormInstance.interceptors.response.use(
  async (config) => {
    const x = await refreshToken(config);
    return x;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default createAxiosInstance;
