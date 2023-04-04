import React, { createContext, useEffect } from "react";
import { useState } from "react";
import createAxiosInstance from "../api/axios";

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
      const response = await createAxiosInstance.get("/category/all");
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

  return (
    <DashboardContext.Provider
      value={{
        CategoryTableData,
        setCategoryTableData,
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
