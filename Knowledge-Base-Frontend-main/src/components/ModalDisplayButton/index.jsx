import React from "react";
import { useContext } from "react";
import styled from "styled-components";
import { AppContext } from "../../contexts/AppProvider";

const Label = styled.label`
  background-color: ${(prop) => prop?.color || "#2579ff"};
  border-color: ${(prop) => prop?.color || "#2579ff"};
  &:hover {
    color: ${(prop) => prop?.color || "#2579ff"};
    border-color: ${(prop) => prop?.color || "#2579ff"};
  }
`;

const ModalDisplayButton = ({ children, className }) => {
  const { homeData } = useContext(AppContext);
  return (
    <Label
      color={homeData.colour}
      htmlFor="my-modal-3"
      className={`btn p-2 px-6 rounded-md text-white border hover:bg-white hover:border transition capitalize ${
        className || ""
      }`}
    >
      {children}
    </Label>
  );
};

export default ModalDisplayButton;
