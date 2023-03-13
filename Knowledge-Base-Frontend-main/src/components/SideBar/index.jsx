import React, { useContext } from "react";
import Logo from "../Logo";
import { FiGrid, FiList } from "react-icons/fi";
import { BsPersonLinesFill } from "react-icons/bs";
import { MdOutlineArticle } from "react-icons/md";
import { IoMdSettings, IoIosCloseCircleOutline } from "react-icons/io";
import { NavLink } from "react-router-dom";
import Button from "../Button";
import { AppContext } from "../../contexts/AppProvider";
import styled from "styled-components";
const Span = styled.span`
  background-color: ${(prop) => prop.color || "#2579ff"};
`;
const Li = styled.li`
  &:hover {
    color: ${(prop) => prop.color || "#2579ff"};
  }
`;

const Sidebar = ({ responsive, setResponsive }) => {
  const { homeData, logoutHandler } = useContext(AppContext);
  const sidebarData = [
    {
      id: 1,
      path: "/dashboard", // the url
      icon: FiGrid, // icon
      name: "Dashboard", // name that appear in Sidebar
    },
    {
      id: 2,
      path: "/category",
      icon: FiList,
      name: "Category",
    },
    {
      id: 3,
      path: "/article",
      icon: MdOutlineArticle,
      name: "Article",
    },
    {
      id: 4,
      path: "/staff",
      icon: BsPersonLinesFill,
      name: "Users",
    },
    {
      id: 5,
      path: "/setting",
      icon: IoMdSettings,
      name: "Settings",
    },
  ];

  return (
    <>
      <div
        className={` ${
          responsive &&
          " RangeForPhone:w-full RangeForPhone:fixed RangeForPhone:bg-[#00000033] RangeForPhone:h-screen RangeForPhone:z-[100]"
        }`}
      ></div>
      <aside
        className={`z-[101] flex-shrink-0 ${
          responsive ? "" : "hidden"
        } shadow-sm w-64 overflow-y-auto bg-white  lg:block border-r RangeForPhone:fixed RangeForPhone:h-screen`}
      >
        <div className="py-4 text-gray-500 RangeForPhone:h-full RangeForPhone:relative">
          <div className="my-auto ml-8 pt-5 w-fit h-fit RangeForPhone:hidden">
            <Logo className={""} />
          </div>
          <div className="flex items-center justify-end pr-6 AllLaptop:hidden">
            <IoIosCloseCircleOutline
              size={24}
              onClick={() => setResponsive(!responsive)}
              className={" cursor-pointer"}
            />
          </div>
          <div className="mt-11 RangeForPhone:mt-4">
            {sidebarData.map((route) => (
              <NavLink
                key={route.id}
                to={route.path}
                style={{
                  color: ({ isActive }) => {
                    console.log(isActive);
                  },
                }}
                onClick={() => setResponsive(!responsive)}
              >
                <Li
                  className={`relative py-4 flex items-center w-full text-sm font-semibold transition-colors duration-150 gap-6 cursor-pointer`}
                  key={route.name}
                  color={homeData?.colour}
                >
                  <Span
                    className={`inset-y-0 left-0 w-1 h-[2.5rem] rounded-tr-lg rounded-br-lg`}
                    aria-hidden="true"
                    color={homeData?.colour}
                  ></Span>

                  <div className={"flex items-center"}>
                    <route.icon className="w-5 h-5" aria-hidden="true" />
                    <span className="ml-4">{route.name}</span>
                  </div>
                </Li>
              </NavLink>
            ))}
          </div>
          <span className="lg:fixed bottom-0 px-6 py-6 w-64 mx-auto relative mt-3 flex justify-center RangeForPhone:w-full RangeForPhone:mt-8">
            <Button className={"px-9"} onClickHandler={() => logoutHandler()}>
              Logout
            </Button>
          </span>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
