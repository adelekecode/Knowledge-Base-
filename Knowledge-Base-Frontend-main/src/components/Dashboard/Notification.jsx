import React from "react";
import { FaTimes } from "react-icons/fa";

const Notification = ({ title, timeStamp }) => {
  return (
    <div
      className={"flex items-center hover:bg-gray-100 p-4 justify-between px-6"}
    >
      <div>
        <h1>{title}</h1>
        <p>{timeStamp}</p>
      </div>
      <FaTimes className={"cursor-pointer"} />
    </div>
  );
};

export default Notification;
