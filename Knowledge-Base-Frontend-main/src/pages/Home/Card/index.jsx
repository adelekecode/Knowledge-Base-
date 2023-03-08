import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { HiArrowNarrowRight } from "react-icons/hi";
import { SiReadthedocs } from "react-icons/si";
import ArticleDetailModalDisplay from "../../../components/ArticleDetailModalDisplay";
import slugify from "slugify";
import { v4 as uuidv4 } from "uuid";
import { AppContext } from "../../../contexts/AppProvider";
import styled from "styled-components";

const P = styled.p`
  &:hover {
    color: ${(prop) => prop.color || "#2579ff"};
  }
`;
const ViewMoreP = styled.p`
  color: ${(prop) => prop.color || "#2579ff"};
`;
const ViewMoreDiv = styled.div`
  &:hover {
    text-decoration-color: ${(prop) => prop.color || "#2579ff"};
  }
`;
const Div = styled.div`
  &:hover {
    color: ${(prop) => prop.color || "#2579ff"};
  }
`;

const Card = ({ cardData }) => {
  const { homeData } = useContext(AppContext);
  const navigate = useNavigate();
  const [itemModalDisplay, setItemModalDisplay] = useState(null);

  return (
    <>
      <div
        className={
          " border hover:shadow-lg hover:shadow-gray-300 rounded-lg p-7 px-9 flex flex-col cursor-pointer gap-5 bg-white"
        }
        style={{ transition: "all 0.2s linear", backgroundColor: "#4040404" }}
      >
        <div
          style={
            !(cardData.articles.length > 0)
              ? {
                  height: "100%",
                  display: "grid",
                  placeContent: "center",
                }
              : {}
          }
        >
          <div id="card-title">
            <h2 className={" font-medium text-FontPrimaryColor text-2xl"}>
              {cardData.name || "Lorem ipsum dolor"}
            </h2>
            <p style={{ color: "#677789" }} className={"font-normal text-sm"}>
              {cardData.articles.length || "0"} articles
            </p>
          </div>
        </div>
        {cardData.articles.length > 0 && (
          <div className={" flex flex-col gap-2"}>
            {cardData.articles.slice(0, 5).map((item, index) => (
              <div key={uuidv4()}>
                <Div
                  className={
                    " flex flex-row items-center gap-2 no-underline w-full pb-2 pt-2"
                  }
                  style={{
                    borderBottom: `${
                      item.id ===
                      cardData.articles[cardData.articles.length - 1].id
                        ? "none"
                        : "1px solid #6777894A"
                    }`,
                  }}
                  onClick={() => setItemModalDisplay(item.id)}
                >
                  <SiReadthedocs className={" text-gray-600"} />
                  <P className={`text-gray-600`} color={homeData.colour}>
                    {item.title}
                  </P>
                </Div>
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
        )}
        {cardData.articles.length > 5 && (
          <ViewMoreDiv
            color={homeData.colour}
            className={`flex items-center w-fit hover:underline transition cursor-pointer hover:gap-3 ease-in-out duration-1000 `}
            onClick={() =>
              navigate(
                "./view/" +
                  cardData.id +
                  "/" +
                  slugify(cardData.name, {
                    strict: true,
                    remove: /[*+~.()'"!:@]/g,
                    lower: true,
                  })
                    .trim()
                    .replaceAll(" ", "-")
              )
            }
          >
            <ViewMoreP color={homeData.colour} className={`font-semibold`}>
              View More
            </ViewMoreP>
            <HiArrowNarrowRight
              size={24}
              color={`${homeData.colour || "#2579ff"}`}
            />
          </ViewMoreDiv>
        )}
      </div>
    </>
  );
};

export default Card;
