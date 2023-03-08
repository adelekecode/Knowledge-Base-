import React, { useContext } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { AppContext } from "../../contexts/AppProvider";

const Pagination = ({ lastPage, setCurrPage, currPage, pages }) => {
  const { homeData } = useContext(AppContext);
  let pageList = [];
  for (let i = 1; i <= pages; i++) {
    pageList.push(i);
  }

  return (
    <div className="paginate flex items-center gap-2">
      <button
        className="  w-8 h-8 font-bold bg-white rounded-lg text-black border-gray-500  border text-xs  flex items-center justify-center"
        onClick={() =>
          currPage === 1 ? setCurrPage(1) : setCurrPage((prev) => prev - 1)
        }
      >
        <FiChevronLeft />
      </button>
      <main className={"flex items-center gap-2"}>
        {pageList.map((page, index) => (
          <button
            key={index}
            className={`w-8 h-8 font-bold rounded-lg text-black border-gray-500  border text-xs ${
              currPage === page ? "text-white border-none" : "bg-white"
            }`}
            style={{
              backgroundColor: `${
                currPage === page ? `${homeData?.colour || "#2579ff"}` : "#fff"
              } `,
              color: `${currPage === page ? `${"#fff" || "#000"}` : "#fff"}`,
            }}
            onClick={() => setCurrPage(page)}
          >
            {page}
          </button>
        ))}
      </main>
      <button
        className="  w-8 h-8 font-bold bg-white rounded-lg text-black border-gray-500  border text-xs flex items-center justify-center"
        onClick={() =>
          currPage === lastPage
            ? setCurrPage(lastPage)
            : setCurrPage((prev) => prev + 1)
        }
      >
        <FiChevronRight />
      </button>
    </div>
  );
};

export default Pagination;
