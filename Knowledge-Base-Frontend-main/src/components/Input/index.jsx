import React from "react";

const Input = ({
  value,
  onChangeHandler,
  type,
  placeholder,
  id,
  className,
  readOnly,
}) => {
  return (
    <input
      id={id || undefined}
      type={type || "text"}
      readOnly={readOnly || false}
      placeholder={placeholder || "Search by title"}
      className={`input w-full  border border-gray-300 ${className || ""}`}
      value={value}
      onChange={onChangeHandler}
    />
  );
};

export default Input;
