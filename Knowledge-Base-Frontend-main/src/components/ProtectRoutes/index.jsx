import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../api/axios";
import { notifyError } from "../ToastAlert";
import { AppContext } from "../../contexts/AppProvider";

const ProtectRoutes = ({ children }) => {
  const { userData, setUserData } = useContext(AppContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (
      !userData.email &&
      !userData.accessToken &&
      !userData.refreshToken &&
      !userData.userRole &&
      !userData.name
    ) {
      return navigate("/login");
    }
  });

  (async function () {
    if (
      userData.email &&
      userData.accessToken &&
      userData.refreshToken &&
      userData.userRole &&
      userData.name
    ) {
      try {
        await axios
          .post("/auth/token/verify", { token: userData.accessToken })
          .then((response) => console.log("res: /> ", response))
          .catch(async (error) => {
            if (error.response?.status === 401) {
              await axios
                .post("/auth/refresh", {
                  refresh: userData.refreshToken,
                })
                .then((res) => {
                  localStorage.setItem("accessToken", res.data.access);
                  setUserData((prev) => ({
                    ...prev,
                    accessToken: res.data.access,
                  }));
                })
                .catch((err) => {
                  console.log(err);
                  if (err.response?.status === 401) {
                    notifyError("You token has expired, please login again");
                    return navigate("/login");
                  }
                });
            } else {
              throw new Error("Network Error Occured");
            }
          });
      } catch (error) {
        console.log(error);
      }
    }
  })();

  return children;
};

export default ProtectRoutes;
