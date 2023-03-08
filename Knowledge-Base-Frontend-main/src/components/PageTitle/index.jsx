import React from "react";

const PageTitle = ({ children }) => {
  return (
    <h1
      className={
        " font-extrabold text-[1.2rem] text-DashboardFontPrimaryColor mb-4 SmallPhones:mt-6"
      }
    >
      {children}
    </h1>
  );
};

export default PageTitle;
