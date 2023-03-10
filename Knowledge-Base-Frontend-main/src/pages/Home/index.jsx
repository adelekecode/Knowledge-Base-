import React, { useContext, useEffect } from "react";
import { AppContext } from "../../contexts/AppProvider";
import Card from "./Card";

const Home = () => {
  const { categoryData, fetchData, homeData } = useContext(AppContext);

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <div id="Home" className={""}>
        <section
          id="Into-section"
          className="w-full"
          style={{ backgroundColor: `${homeData?.colour || "#344cb1"}` }}
        >
          <div
            className={` flex flex-col items-center py-[3.4rem] px-8 pt-[6rem] SmallPhones:px-4 `}
            style={{
              maxWidth: "1666px",
              margin: "0 auto",
            }}
          >
            <h1
              className={
                " text-white text-[2.8rem] font-bold text-center SmallPhones:text-[1.2rem] SmallPhones:w-full Tablet:text-[2rem]"
              }
            >
              {homeData?.title || "DataOculi Knowledgebase"}
            </h1>
            <p
              className={
                " text-white text-[1.2rem] mt-4 mb-12 flex items-center w-[75%] text-center SmallPhones:text-base SmallPhones:w-full SmallPhones:text-left justify-center SmallPhones:text-[0.8rem] "
              }
            >
              {homeData?.body ||
                "A premium WordPress theme with integrated Knowledge Base <br />Lorem ipsum dolor sit amet consectetur, adipisicing elit. Magni ametrecusandae quam aliquam commodi inventore maiores magnam nisi earumalias? Quae nam doloribus illum et corporis id laboriosam solutaculpa."}
            </p>
          </div>
        </section>
        <section
          id="Main-section"
          className={
            " bg-HomeBG w-full flex flex-col gap-12 px-12 mt-24 SmallPhones:mt-16 mb-24 SmallPhones:px-8 Mobile_L_425:px-4"
          }
          style={{
            maxWidth: "1666px",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          <div className={" self-center flex flex-col gap-[8px] mb-4"}>
            <h1
              className={
                "font-bold text-[2.3rem] text-center text-FontPrimaryColor SmallPhones:text-center SmallPhones:mb-2 SmallPhones:w-full Tablet:text-[2rem] SmallPhones:text-[1.2rem]"
              }
            >
              Categories
            </h1>
          </div>
          {categoryData.length ? (
            <main
              className={
                "grid grid-cols-3 gap-10 SmallPhones:grid-cols-1 Tablet:grid-cols-2 "
              }
            >
              {categoryData?.map((item) => (
                <Card key={item.id} cardData={item} />
              ))}
            </main>
          ) : (
            <div className="h-[60vh] w-[80%] Mobile_L_425:w-[100%] grid place-content-center bg-HomeEmptyDataBackgroundImage mx-auto">
              <p className=" text-xl font-medium SmallPhones:text-[1.2rem] Mobile_L_425:text-[0.8rem]">
                No Category Available
              </p>
            </div>
          )}
        </section>
      </div>
    </>
  );
};

export default Home;
