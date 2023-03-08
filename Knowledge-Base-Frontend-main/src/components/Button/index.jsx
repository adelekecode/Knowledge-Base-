import React from "react";
import { useContext } from "react";
import { AppContext } from "../../contexts/AppProvider";
import styled from "styled-components";
const ButtonStyled = styled.button`
  background-color: ${(prop) => prop.color || "#2579ff"};
  border-color: ${(prop) => !prop.disabled && (prop.color || "#2579ff")};
  &:hover {
    border-color: ${(prop) => prop.color || "#2579ff"};
    color: ${(prop) => prop.color || "#2579ff"};
  }
`;

const Button = ({
  children,
  className,
  htmlFor,
  type,
  onClickHandler,
  disabled,
}) => {
  const { homeData } = useContext(AppContext);

  return (
    <ButtonStyled
      color={homeData?.colour}
      disabled={disabled || false}
      type={`${type || "button"}`}
      onClick={onClickHandler}
      htmlFor={htmlFor || null}
      className={`btn p-2 px-6 rounded-md text-white border hover:bg-white transition capitalize SmallPhones:p-4 SmallPhones:py-1 text-base ${
        className || ""
      } `}
    >
      {children}
    </ButtonStyled>
  );
};

export default Button;
