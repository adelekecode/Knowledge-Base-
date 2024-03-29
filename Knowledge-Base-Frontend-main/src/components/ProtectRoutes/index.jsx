import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../api/axios";
import { AppContext } from "../../contexts/AppProvider";
import { notifyError } from "../ToastAlert";

const ProtectRoutes = ({ children }) => {
  const { setUserAccessToken } = useContext(AppContext);
  const navigate = useNavigate();
  const userID = localStorage.getItem("userID");
  const name = localStorage.getItem("name");
  const email = localStorage.getItem("email");
  const userRole = localStorage.getItem("userRole");
  const accessToken = localStorage.getItem("accessToken");
  const refreshToken = localStorage.getItem("refreshToken");

  useEffect(() => {
    if (
      !email ||
      !accessToken ||
      !refreshToken ||
      !userRole ||
      !name ||
      !userID
    ) {
      localStorage.clear();
      notifyError("You are not authorized");
      return navigate("/login");
    } else {
      (async function () {
        const refreshToken = localStorage.getItem("refreshToken");
        await axios
          .post("/auth/refresh", {
            refresh: refreshToken,
          })
          .then((res) => {
            localStorage.setItem("accessToken", res.data.access);
            setUserAccessToken(res.data.access);
          })
          .catch((err) => {
            console.log(err);
            if (err.response?.status === 401) {
              notifyError("You token has expired, please login again");
              return navigate("/login");
            }
          });
      })();
    }
  }, []);

  // setInterval(() => {
  //   console.log("inter");
  //   try {
  //     (async function () {
  //       const refreshToken = localStorage.getItem("refreshToken");
  //       await axios
  //         .post("/auth/refresh", {
  //           refresh: refreshToken,
  //         })
  //         .then((res) => {
  //           localStorage.setItem("accessToken", res.data.access);
  //           setUserAccessToken(res.data.access);
  //         })
  //         .catch((err) => {
  //           console.log(err);
  //           if (err.response?.status === 401) {
  //             notifyError("You token has expired, please login again");
  //             return navigate("/login");
  //           }
  //         });
  //     })();
  //   } catch (error) {
  //     console.log("error in try block: > ", error);
  //   }
  // }, 270000);

  return children;
};

export default ProtectRoutes;
