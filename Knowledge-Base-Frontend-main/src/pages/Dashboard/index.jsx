import React, { useContext, useEffect, useState } from "react";
import ColorCard from "../../components/Dashboard/ColorCard";
import { MdOutlineArticle, MdOutlineVisibility } from "react-icons/md";
import { BiCategory } from "react-icons/bi";
import PageTitle from "../../components/PageTitle";
import BarChart from "../../components/Dashboard/BarChart";
import { createAxiosInstance } from "../../api/axios";
import { AppContext } from "../../contexts/AppProvider";

const Dashboard = () => {
  const { homeData } = useContext(AppContext);
  const [numCategory, setNumCategory] = useState(0);
  const [numArticle, setNumArticle] = useState(0);
  const [numVisit, setNumVisit] = useState(0);
  // const currentDate = new Date();
  const [monthData, setMonthData] = useState([]);

  useEffect(() => {
    createAxiosInstance()
      .get("/admin/category/total")
      .then((response) => setNumCategory(response.data.total_category))
      .catch((err) => {
        console.log(err);
        throw new Error("Network error occurred");
      });
    createAxiosInstance()
      .get("/admin/articles/total")
      .then((response) => setNumArticle(response.data.total_articles))
      .catch((err) => {
        console.log(err);
        throw new Error("Network error occurred");
      });
    createAxiosInstance()
      .get("/admin/total/visits")
      .then((response) => {
        setNumVisit(response.data.total_vist);
      })
      .catch((err) => {
        console.log(err);
        throw new Error("Network error occurred");
      });
    createAxiosInstance()
      .get("/admin/chart/data/2023")
      .then((response) => {
        setMonthData(response.data.month_data);
      })
      .catch((err) => {
        console.log(err);
        throw new Error("Network error occurred");
      });
  }, []);

  return (
    <>
      <PageTitle>Dashboard Overview</PageTitle>
      <section className={"p-4 w-full pb-16 SmallPhones:p-0"}>
        <div
          id="ColorCardContainer"
          className={
            "grid grid-cols-3 gap-10 w-full mb-12 SmallPhones:grid-cols-1 SmallPhones:p-2 Tablet:grid-cols-2"
          }
        >
          <ColorCard
            Icon={BiCategory}
            title={"Number of Categories"}
            number={numCategory}
            className={"text-white"}
            style={{ backgroundColor: `${homeData?.colour || "#2579ff"}` }}
          />
          <ColorCard
            Icon={MdOutlineArticle}
            title={"Number of Articles"}
            number={numArticle}
            className={"text-white bg-teal-600"}
          />
          <ColorCard
            Icon={MdOutlineVisibility}
            title={"Number of Visit"}
            number={numVisit}
            className={"text-white bg-green-600"}
            containerClassName={"Tablet:col-span-2"}
          />
        </div>
        <BarChart monthData={monthData} colour={homeData?.colour} />
      </section>
    </>
  );
};

export default Dashboard;
