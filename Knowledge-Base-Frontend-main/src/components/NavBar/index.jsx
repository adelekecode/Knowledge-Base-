import React from "react";
import Logo from "../Logo";
import Button from "../Button";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "../../contexts/AppProvider";
import { BsFillPersonFill, } from "react-icons/bs";
import { useState } from "react";
import { TiArrowSortedDown, TiArrowSortedUp } from "react-icons/ti";

const NavBar = () => {
  const { userData, logoutHandler } = useContext(AppContext);
  const [menuDisplay, setMenuDisplay] = useState(false);
  return (
    <nav className="w-full ">
      <div
        id="Navbar"
        style={{
          maxWidth: "1666px",
          margin: "0 auto",
          transition: "all 0.3s",
        }}
        className={
          " flex items-center justify-between py-4 px-8 w-full SmallPhones:px-4"
        }
      >
        <Logo />
        {userData.userRole === "staff" && (
          <div className="relative">
            <div
              className={"flex items-center gap-2 cursor-pointer"}
              onClick={() => setMenuDisplay(!menuDisplay)}
            >
              <div
                className={
                  "grid place-content-center border rounded-full border-gray-400 p-2"
                }
              >
                <BsFillPersonFill size={20} />
              </div>
              {menuDisplay ? <TiArrowSortedUp /> : <TiArrowSortedDown />}
            </div>
            {menuDisplay && (
              <div className="absolute top-[2.5rem] right-[2.5rem] bg-white p-7 flex flex-col gap-5 rounded-lg">
                <Link
                  to="/staff/profile"
                  className={"flex items-center justify-start gap-4"}
                >
                  <p className={"font-medium text-lg underline"}>
                    {/* {userData?.name.slice(0, 5) + "..."} */}
                    Profile
                  </p>
                </Link>
                <Button
                  className={" font-normal"}
                  onClickHandler={() => logoutHandler()}
                >
                  Logout
                </Button>
              </div>
            )}
          </div>
        )}
        {userData.userRole === "admin" && (
          <Link to="/dashboard">
            <Button>Dashboard</Button>
          </Link>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
