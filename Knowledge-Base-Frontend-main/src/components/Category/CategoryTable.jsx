import React, { Fragment } from "react";
import { MdDeleteOutline } from "react-icons/md";
import { FiEdit } from "react-icons/fi";
import moment from "moment";

const CategoryTable = ({ data, editHandler, deleteHandler, tableLoading }) => {
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
    </tr>
  );
  const elements = Array(8).fill(element);

  return (
    <div
      className="Data-Table-Container w-full max-w-[73.5vw] mx-auto overflow-x-auto h-DashboardTable RangeForPhone:max-w-full"
      id="Data-CategoryTable-Container"
    >
      <table className="table w-full">
        <thead>
          <tr>
            <th>S/N</th>
            <th>NAME</th>
            <th>CREATED AT</th>
            <th>ACTION</th>
          </tr>
        </thead>
        {data?.length >= 1 && (
          <tbody>
            {data.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>
                  {item.time
                    ? moment.utc(item.time).local().format("HH:mm - DD/MM/YYYY")
                    : "00:00 - 12-03-2023"}
                </td>
                <td>
                  <div className={"flex items-center justify-between px-2"}>
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
          <p>{"No Category Found"}</p>
        </div>
      )}
    </div>
  );
};

export default CategoryTable;
