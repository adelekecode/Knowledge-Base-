import React, { Fragment } from "react";
import { MdBlock } from "react-icons/md";
import { CgUnblock } from "react-icons/cg";
import moment from "moment";
import { notifySuccess } from "../ToastAlert";

const StaffTable = ({ data, onActionClick, tableLoading }) => {
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

  async function copyToClip(item) {
    const userCopyData = `
    Full name: ${item.name}
    Email: ${item.email}
    Password: ${item.dummy_password}
    `;
    navigator.clipboard.writeText(userCopyData).then(() => {
      notifySuccess("User data copied");
    });
  }

  return (
    <div
      className="Data-Table-Container w-full max-w-[73.5vw] mx-auto overflow-x-auto h-DashboardTable RangeForPhone:max-w-full"
      id="Data-StaffTable-Container"
    >
      <table className="table w-full">
        <thead>
          <tr>
            <th>S/N</th>
            <th>NAME</th>
            <th>EMAIL</th>
            <th>ROLE</th>
            <th>STATUS</th>
            <th>LAST LOGIN</th>
            <th>ACTION</th>
          </tr>
        </thead>
        {data?.length >= 1 && (
          <tbody>
            {data.map((item) => (
              <tr key={item.id}>
                <td className="sticky left-0">{item.id}</td>
                <td>{item.name}</td>
                <td>{item.email}</td>
                <td>{item.role || "admin"}</td>
                <td>
                  <p
                    className={`border rounded-xl  grid place-content-center RangeForPhone:w-[4.5rem] ${
                      item.is_active
                        ? "text-green-500 border-green-500"
                        : " text-gray-500 border-gray-500"
                    }`}
                  >{`${item.is_active === true ? "active" : "inactive"}`}</p>
                </td>

                <td>
                  {item.last_login
                    ? moment
                        .utc(item.last_login)
                        .local()
                        .format("HH:mm - DD/MM/YYYY")
                    : "00:00 - 12-03-2023"}
                </td>
                <td>
                  <div className={"flex items-center justify-start  gap-6"}>
                    <label htmlFor="my-modal-3">
                      {item.is_active ? (
                        <MdBlock
                          onClick={() => onActionClick("active", item)}
                          className=" cursor-pointer"
                          color="red"
                        />
                      ) : (
                        <CgUnblock
                          onClick={() => onActionClick("inactive", item)}
                          className=" cursor-pointer"
                          color="gray"
                          size={19}
                        />
                      )}
                    </label>
                    <button
                      className="border rounded-full p-4 py-1 bg border-gray-500 hover:bg-gray-200 text-sm"
                      onClick={() => copyToClip(item)}
                    >
                      Copy
                    </button>
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
        <div className={"w-full grid place-content-center h-[90%]"}>
          <p>{"No user has been created"}</p>
        </div>
      )}
    </div>
  );
};

export default StaffTable;
