import axios from "axios";

export const BaseURL =
  process.env.REACT_APP_API_URL || "http://localhost:8000/";

export default axios.create({
  baseURL: BaseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

// export function createAxiosInstance() {
//   const accessToken = localStorage.getItem("accessToken");
//   return axios.create({
//     baseURL: BaseURL,
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${accessToken}`,
//     },
//   });
// }
