import React from "react";

const ColorCard = ({
  title,
  Icon,
  className,
  number,
  containerClassName,
  style,
}) => {
  return (
    <>
      <div
        className={`flex justify-center text-center h-full ${
          containerClassName || ""
        }`}
      >
        <div
          className={`w-full p-6 rounded-lg ${className} shadow-lg shadow-gray-300`}
          style={style || {}}
        >
          <div className={`text-center inline-block text-3xl`}>
            <Icon />
          </div>
          <div>
            <p className="mb-3 text-base font-medium text-gray-50 ">{title}</p>
            <p className="text-3xl font-bold leading-none text-gray-50">
              {number}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ColorCard;
