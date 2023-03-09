import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../api/axios";
import { notifyError } from "../ToastAlert";
import { AppContext } from "../../contexts/AppProvider";

const ProtectRoutes = ({ children }) => {
  const { userData } = useContext(AppContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (
      !userData.email &&
      !userData.accessToken &&
      !userData.refreshToken &&
      !userData.userRole &&
      !userData.name
    ) {
      console.log("this is the error");
      return navigate("/login");
    }
  });

  if (
    userData.email &&
    userData.accessToken &&
    userData.refreshToken &&
    userData.userRole &&
    userData.name
  ) {
    axios
      .post(
        "/auth/token/verify",
        JSON.stringify({ token: userData.accessToken })
      )
      .then((response) => {})
      .catch((error) => {
        if (error.response?.status === 401) {
          console.log("Token is invalid");
          axios
            .post(
              "/auth/refresh",
              JSON.stringify({
                refresh: userData.refreshToken,
              })
            )
            .then((res) => {
              console.log("token now available");
              console.log(res.data["access"]);
              localStorage.setItem("accessToken", res.data["access"]);
              // if (res.status === 200) {
              // }
            });
          // .catch((err) => {
          //   if (err.response?.status === 401) {
          //     console.log("error again");
          //     notifyError("You token has expired, please login again");
          //     return navigate("/login");
          //   }
          // });
        } else {
          throw new Error("Network Error Occured");
        }
      });

    return children;
  }
};

export default ProtectRoutes;
