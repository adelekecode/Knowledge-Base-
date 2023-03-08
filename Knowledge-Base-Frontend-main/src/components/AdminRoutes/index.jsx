import React, { useContext } from "react";
import { AppContext } from "../../contexts/AppProvider";
import { NotFound } from "../../pages";

const AdminRoutes = ({ children }) => {
  const { userData } = useContext(AppContext);
  if (userData.userRole === "admin") {
    return children;
  } else {
    return <NotFound />;
  }
};

export default AdminRoutes;
