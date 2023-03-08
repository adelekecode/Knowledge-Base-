import React, { Fragment } from "react";
import { MdDeleteOutline } from "react-icons/md";
import { FiEdit } from "react-icons/fi";
import moment from "moment";
import styled from "styled-components";
import { useContext } from "react";
import { AppContext } from "../../contexts/AppProvider";

const A = styled.a`
  &:hover {
    color: ${(prop) => prop?.color || "#2579ff"};
  }
`;

const Table = ({ data, editHandler, deleteHandler, tableLoading }) => {
  const { homeData } = useContext(AppContext);
  const element = (
    <tr className="animate-pulse">
      <td className=" py-3">
        <p className=" w-[100%] bg-gray-200 h-8 rounded-2xl"></p>
      </td>
      <td className=" py-3">
        <p className=" w-[100%] bg-gray-200 h-8 rounded-2xl"></p>
      </td>
      <td className=" py-3">
        <p className=" w-[100%] bg-gray-200 h-8 rounded-2xl"></p>
      </td>
      <td className=" py-3">
        <p className=" w-[100%] bg-gray-200 h-8 rounded-2xl"></p>
      </td>
      <td className=" py-3">
        <p className=" w-[100%] bg-gray-200 h-8 rounded-2xl"></p>
      </td>
      <td className=" py-3">
        <p className=" w-[100%] bg-gray-200 h-8 rounded-2xl"></p>
      </td>
      <td className=" py-3">
        <p className=" w-[100%] bg-gray-200 h-8 rounded-2xl"></p>
      </td>
    </tr>
  );
  const elements = Array(8).fill(element);
  return (
    <div
      className="Data-Table-Container w-full max-w-[73.5vw] mx-auto overflow-x-auto h-DashboardTable RangeForPhone:max-w-full"
      id="Data-ArticleTable-Container"
    >
      <table className="table w-full">
        <thead>
          <tr>
            <th>S/N</th>
            <th>TITLE</th>
            <th>GLOSSARY LINK</th>
            <th>PLAYBOOK LINK</th>
            <th>CATEGORY</th>
            <th>CREATED AT</th>
            <th>ACTION</th>
          </tr>
        </thead>
        {data?.length >= 1 && (
          <tbody>
            {data?.map((item) => (
              <tr key={item.article_id}>
                <th>{item.article_id}</th>
                <td>{item.title}</td>
                <td>
                  <A
                    color={homeData.colour}
                    target="_blank"
                    rel="noreferrer"
                    href={item.data_glossary}
                    className={"underline"}
                  >
                    {item.data_glossary}
                  </A>
                </td>
                <td>
                  <A
                    color={homeData.colour}
                    target="_blank"
                    rel="noreferrer"
                    href={item.play_book}
                    className={"underline"}
                  >
                    {item.play_book}
                  </A>
                </td>
                <td>{item.category_name}</td>
                <td>
                  {item.article_time
                    ? moment
                        .utc(item.article_time)
                        .local()
                        .format("HH:mm - DD/MM/YYYY")
                    : "00:00 - 12-03-2023"}
                </td>
                <td>
                  <div className={"flex items-center justify-between gap-8"}>
                    <label htmlFor="my-modal-3">
                      <FiEdit
                        className=" cursor-pointer"
                        onClick={() => editHandler(["edit", item])}
                      />
                    </label>
                    <label htmlFor="my-modal-3">
                      <MdDeleteOutline
                        onClick={() => deleteHandler(["delete", item])}
                        className=" cursor-pointer"
                        size={20}
                      />
                    </label>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        )}
        {tableLoading && (
          <tbody>
            {elements.map((item, index) => (
              <Fragment key={index}>{item}</Fragment>
            ))}
          </tbody>
        )}
      </table>
      {!(data?.length >= 1) && (
        <div className={"w-full  grid place-content-center h-[90%]"}>
          <p>{"No Article Found"}</p>
        </div>
      )}
    </div>
  );
};

export default Table;
