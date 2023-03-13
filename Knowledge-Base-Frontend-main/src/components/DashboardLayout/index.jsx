import React from "react";
import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Sidebar } from "..";
import DashboardProvider from "../../contexts/DashboardProvider";
import Header from "../Dashboard/Header";

const DashoardLayout = () => {
  const [responsive, setResponsive] = useState(false);
  return (
    <DashboardProvider>
      <div
        className={"flex min-h-screen"}
        style={{ maxWidth: "1666px", margin: "0 auto" }}
      >
        <Sidebar responsive={responsive} setResponsive={setResponsive} />
        <div className={"flex flex-col w-full"}>
          <div>
            <Header setResponsive={setResponsive} responsive={responsive} />
          </div>
          <main className={"p-8 SmallPhones:p-4"}>
            <Outlet />
          </main>
        </div>
      </div>
    </DashboardProvider>
  );
};

export default DashoardLayout;
