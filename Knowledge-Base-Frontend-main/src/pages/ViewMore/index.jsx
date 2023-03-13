import React, { useContext, useEffect, useState } from "react";
import Pagination from "../../components/Pagination";
import { useNavigate, useParams } from "react-router-dom";
import Input from "../../components/Input";
import ArticleDetailModalDisplay from "../../components/ArticleDetailModalDisplay";
import styled from "styled-components";
import { SiReadthedocs } from "react-icons/si";
import { AppContext } from "../../contexts/AppProvider";

const P = styled.p`
  &:hover {
    color: ${(prop) => prop.color || "#2579ff"};
  }
`;

const ViewMore = () => {
  const { createAxiosInstance, homeData } = useContext(AppContext);
  const { cardID } = useParams();
  const navigate = useNavigate();
  const [articleData, setArticleData] = useState([]);
  const [currPage, setCurrPage] = useState(1);
  const rowsPerPage = 8;
  const lastPage = Math.ceil(articleData?.length / rowsPerPage);
  const lastPostIndex = currPage * rowsPerPage;
  const firstPostIndex = lastPostIndex - rowsPerPage;
  const [filteredArticleData, setFilteredArticleData] = useState([
    ...articleData,
  ]);
  const currentData = filteredArticleData?.slice(firstPostIndex, lastPostIndex);

  const [searchFilterVal, setSearchFilterVal] = useState("");
  const [categoryName, setCategoryName] = useState("");
  const [itemModalDisplay, setItemModalDisplay] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await createAxiosInstance().get(
          `/category/articles/${cardID}`
        );
        if (response.status === 200) {
          setCategoryName(response.data.category_name);
          setArticleData(response.data.article);
          setFilteredArticleData(response.data.article);
        }
      } catch (err) {
        console.log(err);
        if (err.response?.status === 404) {
          navigate("*");
        }
      }
    };
    fetchData();
  }, [cardID, setArticleData]);

  return (
    <div className={" w-full mt-12 mb-32 SmallPhones:px-4 SmallPhones:mt-12"}>
      <div
        id="View-Head"
        className="mx-auto w-[46%] SmallPhones:w-full  flex flex-col items-center gap-10"
      >
        <h1 className={"font-bold text-4xl text-FontPrimaryColor"}>
          {categoryName || "Food"}
        </h1>
        <Input
          type="text"
          placeholder="Search for an article..."
          className="input input-bordered w-full SmallPhones:w-full"
          value={searchFilterVal}
          onChangeHandler={(e) => {
            setSearchFilterVal(e.target.value);
            setFilteredArticleData(
              articleData.filter((item) =>
                item.title
                  .toLowerCase()
                  .includes(e.target.value.toLowerCase().trim())
              )
            );
          }}
        />
      </div>
      <main
        className={
          "border border-gray-200 w-[80%] mx-auto mt-24 rounded-xl p-6 flex flex-col bg-white  "
        }
      >
        <div
          className="SmallPhones:w-full overflow-x-auto"
          id={"view-more-page"}
        >
          <div className=" SmallPhones$Tablets:min-w-[40rem] SmallPhones:min-w-[32rem] ">
            {currentData.length >= 1 ? (
              <div className={"grid grid-cols-3 "}>
                {currentData.map((item) => (
                  <div key={item.id}>
                    <div
                      className={
                        " flex flex-row items-center gap-2 no-underline w-full pb-2 pt-2"
                      }
                    >
                      <SiReadthedocs className={" text-gray-600"} />
                      <div
                        className={`py-[1.2rem] p-2  ${
                          item.id === currentData.length ||
                          item.id === currentData.length - 1 ||
                          item.id === currentData.length - 2
                            ? "border-b-none"
                            : "border-b"
                        }`}
                      >
                        <P
                          className="cursor-pointer"
                          key={item.id}
                          onClick={() => setItemModalDisplay(item.id)}
                          color={homeData.colour}
                        >
                          {item.title}
                        </P>
                      </div>
                    </div>
                    {itemModalDisplay === item.id && (
                      <div
                        className={
                          " bg-ArticleModal fixed z-[9999] w-[100%] left-0 top-0 h-[100vh] grid place-content-center cursor-default"
                        }
                        style={{
                          display: `${itemModalDisplay ? "grid" : "none"}`,
                        }}
                      >
                        <ArticleDetailModalDisplay
                          displayFunc={() => setItemModalDisplay(null)}
                          data={item}
                        />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="w-full grid place-content-center">
                <p className="p-14 font-semibold text-xl SmallPhones:p-8">{`No Articles in ${categoryName}`}</p>
              </div>
            )}
          </div>
        </div>
        <div className="mt-6 self-end">
          <Pagination
            currPage={currPage}
            lastPage={lastPage}
            setCurrPage={setCurrPage}
            pages={lastPage}
          />
        </div>
      </main>
    </div>
  );
};

export default ViewMore;
