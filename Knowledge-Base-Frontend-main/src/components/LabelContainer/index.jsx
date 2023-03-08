import React from "react";

const LabelContainer = ({
  label,
  children,
  htmlFor,
  className,
  labelClassName,
}) => {
  return (
    <div className={`flex items-center justify-between ${className || ""}`}>
      <label
        htmlFor={htmlFor || "form-select-input"}
        className={`font-normal text-normal ${labelClassName || ""}`}
      >
        {label}
      </label>
      {children}
    </div>
  );
};

export default LabelContainer;
