import React, { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { notifyError, notifySuccess } from "../components/ToastAlert";

import createAxiosInstance from "../api/axios";
export const AppContext = createContext();

const AppProvider = ({ children }) => {
  const userID = localStorage.getItem("userID");
  const userName = localStorage.getItem("name");
  const userEmail = localStorage.getItem("email");
  const userRole = localStorage.getItem("userRole");
  const [userAccessToken, setUserAccessToken] = useState(
    localStorage.getItem("accessToken")
  );
  const userRefreshToken = localStorage.getItem("refreshToken");

  // function createAxiosInstance() {
  //   const accessToken = localStorage.getItem("accessToken");
  //   return axios.create({
  //     baseURL: BaseURL,
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: `Bearer ${accessToken}`,
  //     },
  //   });
  // }

  const [categoryData, setCategoryData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [homeData, setHomeData] = useState({});
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const response = await createAxiosInstance.get("/category/data/list");
      if (response.status === 200) {
        setCategoryData(response.data);
      }
    } catch (err) {
      console.log("ERROR: ", err);
      if (err.response?.status === 401) {
        throw new Error("You are not authorized");
      }
    }
  };

  const fetchHomeData = async () => {
    createAxiosInstance
      .get("/admin/profile")
      .then((response) => {
        if (response.status === 200) {
          setHomeData(response.data.page_data);
        }
      })
      .catch((err) => {
        console.log("ERROR: ", err);
        // return navigate("/login");
      });
  };

  useEffect(() => {
    if (
      userID &&
      userAccessToken &&
      userRefreshToken &&
      userRole &&
      userName &&
      userEmail
    ) {
      fetchHomeData();
    }
  }, []);

  function logoutHandler() {
    setLoading(true);
    const refreshToken = userRefreshToken;

    createAxiosInstance
      .post("/auth/logout", JSON.stringify({ refresh: refreshToken }))
      .then((res) => {
        if (res.status === 204) {
          localStorage.clear();
          setLoading(false);
          navigate("/login");
          notifySuccess("You have been logged out");
        }
      })
      .catch((err) => {
        if (err.res?.status === 401) {
          setLoading(false);
          notifyError("You are not authorized");
        } else if (err.res?.status === 400) {
          setLoading(false);
          notifyError("Error occurred while logging out, please try again");
        } else if (err.res?.status === 500) {
          setLoading(false);
          notifyError("Server Error, please try again");
        }
      });
  }

  return (
    <AppContext.Provider
      value={{
        userID,
        userRole,
        userName,
        userEmail,
        userAccessToken,
        userRefreshToken,
        categoryData,
        setCategoryData,
        fetchData,
        loading,
        setLoading,
        homeData,
        setHomeData,
        fetchHomeData,
        logoutHandler,
        setUserAccessToken,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
