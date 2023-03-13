import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../../contexts/AppProvider";
import { BsFillPersonFill } from "react-icons/bs";
import { FiMenu } from "react-icons/fi";
import Logo from "../Logo";

const Header = ({ setResponsive, responsive }) => {
  const { userName } = useContext(AppContext);

  return (
    <div
      className={
        "flex items-center gap-[3rem] self-center py-[1rem] px-6 w-full justify-between border-b"
      }
    >
      <div>
        <FiMenu
          onClick={() => setResponsive(!responsive)}
          className={"AllLaptop:hidden cursor-pointer"}
          size={24}
        />
      </div>
      <div className="AllLaptop:hidden ">
        <Logo />
      </div>
      <Link
        to="/profile"
        className={"flex items-center gap-4 flex-row-reverse"}
      >
        <p className={"font-medium text-lg Mobile_L_425:hidden"}>{userName}</p>
        <div
          className={
            "grid place-content-center border border-gray-300 p-[0.5rem] rounded-full"
          }
        >
          <BsFillPersonFill size={20} />
        </div>
      </Link>
    </div>
  );
};

export default Header;
