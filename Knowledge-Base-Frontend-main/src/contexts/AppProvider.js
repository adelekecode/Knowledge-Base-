import React, { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createAxiosInstance } from "../api/axios";
import { notifyError, notifySuccess } from "../components/ToastAlert";

export const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [userData, setUserData] = useState(
    {
      userID: localStorage.getItem("userID"),
      name: localStorage.getItem("name"),
      email: localStorage.getItem("email"),
      userRole: localStorage.getItem("userRole"),
      accessToken: localStorage.getItem("accessToken"),
      refreshToken: localStorage.getItem("refreshToken"),
    } || {}
  );

  const userEmail = userData["email"];
  const userRole = userData["userRole"];
  const [categoryData, setCategoryData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [homeData, setHomeData] = useState({});
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const response = await createAxiosInstance().get("/category/data/list");
      if (response.status === 200) {
        setCategoryData(response.data);
      }
    } catch (err) {
      console.log("ERROR: ", err);
      if (err.response?.status === 401) {
        notifyError("You not authenticated, please login and try again");
      }
    }
  };

  function updateUserStorage(data) {
    localStorage.setItem("accessToken", data["access_token"]);
    localStorage.setItem("email", data["email"]);
    localStorage.setItem("refreshToken", data["refresh_token"]);
    localStorage.setItem("userRole", data["role"]);
    localStorage.setItem("name", data["name"]);
    localStorage.setItem("userID", data["id"]);

    setUserData({
      userID: data["id"],
      name: data["name"],
      email: data["email"],
      userRole: data["role"],
      accessToken: data["access_token"],
      refreshToken: data["refresh_token"],
    });
  }

  const fetchHomeData = async () => {
    createAxiosInstance()
      .get("/admin/profile")
      .then((response) => {
        if (response.status === 200) {
          setHomeData(response.data.page_data);
        }
      })
      .catch((err) => {
        console.log("ERROR: ", err);
        throw new Error(err?.message);
      });
  };

  useEffect(() => {
    if (
      userData.email &&
      userData.accessToken &&
      userData.refreshToken &&
      userData.userRole &&
      userData.name
    ) {
      fetchHomeData();
    }
  }, [setHomeData, userData]);

  function logoutHandler() {
    setLoading(true);
    const refreshToken = localStorage.getItem("refreshToken");

    createAxiosInstance()
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
        updateUserStorage,
        userEmail,
        userRole,
        categoryData,
        setCategoryData,
        fetchData,
        loading,
        setLoading,
        userData,
        homeData,
        setHomeData,
        fetchHomeData,
        logoutHandler,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
