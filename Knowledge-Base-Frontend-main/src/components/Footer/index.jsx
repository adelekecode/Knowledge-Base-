import React, { useContext } from "react";
import { AppContext } from "../../contexts/AppProvider";

const Footer = () => {
  const { homeData } = useContext(AppContext);
  return (
    <footer
      id="Footer"
      className={` flex items-center justify-center p-3 text-white font-normal text-[0.8rem] justify-self-end`}
      style={{ backgroundColor: `${homeData?.colour || "#344cb1"}` }}
    >
      <p>All rights reserved @Getmobile</p>
    </footer>
  );
};

export default Footer;
