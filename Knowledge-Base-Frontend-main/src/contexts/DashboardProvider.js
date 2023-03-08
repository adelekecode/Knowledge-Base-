import React, { createContext, useEffect } from "react";
import { useState } from "react";
import { createAxiosInstance } from "../api/axios";
import { notifyError } from "../components/ToastAlert";

export const DashboardContext = createContext();

const DashboardProvider = ({ children }) => {
  const [CategoryTableData, setCategoryTableData] = useState([]);

  const [filteredCategoryTableData, setFilteredCategoryTableData] =
    useState(null);
  const [filteredArticleTableData, setFilteredArticleTableData] =
    useState(null);
  const [filteredStaffTableData, setFilteredStaffTableData] = useState(null);

  const [tableLoading, setTableLoading] = useState(false);

  // ? Category
  const fetchCategoryData = async () => {
    try {
      setTableLoading(true);
      const response = await createAxiosInstance().get("/category/all");
      if (response.status === 200) {
        setCategoryTableData(response.data["all categories"]);
        setFilteredCategoryTableData(response.data["all categories"]);
      }
    } catch (err) {
      console.log(err);
      throw new Error("Something went wrong. Please try again later.");
    } finally {
      setTableLoading(false);
    }
  };
  useEffect(() => {
    fetchCategoryData();
  }, []);

  //! NOTE: This function is not used anywhere
  function getCategoryHandler() {
    createAxiosInstance()
      .get("/category/all")
      .then((response) => {
        if (response.status === 200) {
          return response.data;
        } else {
          notifyError("Something went wrong please reload the page");
        }
      })
      .then((data) => {
        setCategoryTableData(data["all categories"]);
      })
      .catch((err) => {
        console.log(err);
        // notifyError("Network error occurred");
        throw new Error("Network error occurred");
      });
  }

  return (
    <DashboardContext.Provider
      value={{
        CategoryTableData,
        setCategoryTableData,
        getCategoryHandler,
        filteredCategoryTableData,
        setFilteredCategoryTableData,
        filteredArticleTableData,
        setFilteredArticleTableData,
        filteredStaffTableData,
        setFilteredStaffTableData,
        fetchCategoryData,
        tableLoading,
        setTableLoading,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
};

export default DashboardProvider;
