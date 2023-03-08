import React from "react";
import { Footer, NavBar } from "..";

const Layout = ({ children }) => {
  return (
    <div
      id="Layout"
      className={
        " min-h-screen flex flex-col justify-start relative bg-HomeBG "
      }
    >
      <div className={" min-h-screen bg-transparent"}>
        <NavBar />
        {children}
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
