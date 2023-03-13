import React from "react";
import { NotFound } from "../../pages";

const AdminRoutes = ({ children }) => {
  const userRole = localStorage.getItem("userRole");
  if (userRole === "admin") {
    return children;
  } else {
    return <NotFound />;
  }
};

export default AdminRoutes;
