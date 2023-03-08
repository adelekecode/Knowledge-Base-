import React from "react";
import { useContext } from "react";
import { AppContext } from "../../contexts/AppProvider";

const ArticleDetailModalDisplay = ({ data, displayFunc }) => {
  const { homeData } = useContext(AppContext);
  return (
    <div className="card w-96 bg-base-100 shadow-xl SmallPhones:w-[100%]">
      <div className="card-body">
        <div className="card-actions justify-end">
          <button
            className="btn btn-square btn-sm"
            onClick={() => displayFunc()}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <h1
          className={
            " font-medium text-xl flex items-center justify-center mb-4 capitalize SmallPhones:mt-4"
          }
        >
          {data.title}
        </h1>
        <div className={" flex flex-col gap-7 mx-auto p-4"}>
          <a
            href={data.data_glossary || "https://github.com/henzyd"}
            rel="noreferrer"
            target="_blank"
            className={`underline hover:text-[${
              homeData?.colour || "#2579ff"
            }]`}
          >
            {data.data_glossary}
          </a>
          <a
            href={data.play_book || "https://github.com/henzyd"}
            className={`underline hover:text-[${
              homeData?.colour || "#2579ff"
            }]`}
            rel="noreferrer"
            target="_blank"
          >
            {data.play_book}
          </a>
        </div>
      </div>
    </div>
  );
};

export default ArticleDetailModalDisplay;
