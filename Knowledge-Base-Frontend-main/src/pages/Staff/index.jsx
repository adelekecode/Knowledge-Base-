import React, { useState, useEffect, useContext } from "react";
import PageTitle from "../../components/PageTitle";
import Input from "../../components/Input";
import Button from "../../components/Button";
import {
  LabelContainer,
  ModalDisplayButton,
  StaffTable,
} from "../../components";
import Pagination from "../../components/Pagination";
import { notifyError, notifySuccess } from "../../components/ToastAlert";
import { validEmailHandler } from "../../helper/EmailValidation";
import { useRef } from "react";
import { AppContext } from "../../contexts/AppProvider";
import createAxiosInstance from "../../api/axios";

const Staff = () => {
  const [StaffTableData, setStaffTableData] = useState([]);
  const [filteredStaffTableData, setFilteredStaffTableData] = useState(null);

  const [searchVal, setSearchVal] = useState("");
  const [selectedVal, setSelectedVal] = useState("");

  const [roleVal, setRoleVal] = useState("staff");
  const [nameVal, setNameVal] = useState("");
  const [emailVal, setEmailVal] = useState("");

  const [currPage, setCurrPage] = useState(1);
  const rowsPerPage = 8;
  const lastPage = Math.ceil(StaffTableData?.length / rowsPerPage);
  const lastPostIndex = currPage * rowsPerPage;
  const firstPostIndex = lastPostIndex - rowsPerPage;

  const currentData = filteredStaffTableData?.slice(
    firstPostIndex,
    lastPostIndex
  );
  const [currentStaff, setCurrentStaff] = useState(["active", null]);
  const modalRef = useRef();
  const [tableLoading, setTableLoading] = useState(false);

  // ? Staff
  const fetchStaffData = async () => {
    try {
      setTableLoading(true);
      const response = await createAxiosInstance.get("/auth/all_users");
      if (response.status === 200) {
        setStaffTableData(response.data);
        setFilteredStaffTableData(response.data);
      } else {
        notifyError("Something went wrong please reload the page");
        throw new Error("Network error occurred");
      }
    } catch (err) {
      if (err.response.status === 401) {
        return notifyError("Something went wrong. Please try again later.");
      }
    } finally {
      setTableLoading(false);
    }
  };

  useEffect(() => {
    fetchStaffData();
  }, []);

  function stateHandler(item) {
    setEmailVal(item.email);
    setNameVal(item.name);
    setRoleVal(item.role);
  }
  function defualtStateHandler() {
    setEmailVal("");
    setNameVal("");
    setRoleVal("staff");
    setCurrentStaff(["active", null]);
  }

  function emptyFieldsHandler() {
    if (!nameVal || !validEmailHandler(emailVal)) {
      return false;
    }
    return true;
  }

  function formSubmitHandler(e) {
    e.preventDefault();

    if (!emptyFieldsHandler()) {
      notifyError("Invalid name or email");
      return;
    }

    if (roleVal === "staff") {
      createAxiosInstance
        .post(
          "/auth/register/user",
          JSON.stringify({
            name: nameVal,
            email: emailVal,
          })
        )
        .then((response) => {
          if (response.status === 200 || response.status === 201) {
            defualtStateHandler();
            notifySuccess("Staff has been created");
            modalRef.current.checked = false;
            fetchStaffData();
            //? NOTE: Email notifications
          }
        })
        .catch((err) => {
          console.log(err);
          if (err.response?.status === 400) {
            notifyError("Email is already in use");
          } else if (err.response?.status === 401) {
            throw new Error(err.message);
          } else if (err.response?.status === 500) {
            notifyError("An error occurred, Please reload the page");
          }
        });
    } else if (roleVal === "admin") {
      createAxiosInstance
        .post(
          "/auth/register/admin",
          JSON.stringify({
            name: nameVal,
            email: emailVal,
          })
        )
        .then((response) => {
          if (response.status === 200 || response.status === 201) {
            defualtStateHandler();
            notifySuccess("Admin has been created");
            modalRef.current.checked = false;
            fetchStaffData();
            //? NOTE: Email notifications
          }
        })
        .catch((err) => {
          console.log(err);
          if (err.response?.status === 400) {
            notifyError("Email is already in use");
          } else if (err.response?.status === 401) {
            throw new Error(err.message);
          } else if (err.response?.status === 500) {
            notifyError("An error occurred, Please reload the page");
          }
        });
    }
  }

  function blockUserHandler(e) {
    e.preventDefault();

    createAxiosInstance
      .delete(`/auth/userinfo/${currentStaff[1].id}`)
      .then((response) => {
        if (response.status === 200) {
          defualtStateHandler();
          modalRef.current.checked = false;
          fetchStaffData();
          notifySuccess("User has been blocked");
        }
      })
      .catch((err) => {
        console.log(err);
        if (err.response?.status === 401) {
          notifyError("You must be an administrator to block a user");
        } else if (err.response?.status === 404) {
          notifyError("This user is already inactive");
        }
      });
  }

  function unBlockUserHandler(e) {
    e.preventDefault();

    createAxiosInstance
      .patch(`/auth/userinfo/${currentStaff[1].id}`)
      .then((response) => {
        if (response.status === 200) {
          defualtStateHandler();
          modalRef.current.checked = false;
          fetchStaffData();

          notifySuccess("User has been unblocked");
        }
      })
      .catch((err) => {
        console.log(err);
        if (err.response?.status === 401) {
          notifyError("You must be an administrator to unblock a user");
        } else if (err.response?.status === 404) {
          notifyError("This user is already inactive");
        }
      });
  }

  return (
    <div>
      <PageTitle>All Users</PageTitle>

      <section className={"w-full flex flex-col gap-8 "}>
        <div
          className={
            "grid grid-cols-ArticleSearchBar gap-8 bg-base-200 p-4 rounded-lg Tablet_768:grid-cols-2 Mobile_L_425:grid-cols-1"
          }
        >
          <Input
            placeholder={"Search by name"}
            type={"search"}
            value={searchVal}
            onChangeHandler={(e) => {
              setSearchVal(e.target.value);
              setFilteredStaffTableData(
                StaffTableData?.filter((item) =>
                  item.name
                    .toLowerCase()
                    .includes(e.target.value.toLowerCase().trim())
                )
              );
            }}
          />
          <select
            name="staff-role-dropdown"
            className="select w-full border border-gray-300"
            id="staff-role-dropdown"
            value={selectedVal}
            onChange={(e) => {
              setSelectedVal(e.target.value);
              setFilteredStaffTableData(
                StaffTableData?.filter((item) => {
                  if (e.target.value === "") {
                    return item;
                  } else {
                    return item.role === e.target.value;
                  }
                })
              );
            }}
          >
            <option value={""}>All</option>
            <option value="staff">Staff</option>
            <option value="admin">Admin</option>
          </select>
          <ModalDisplayButton className={"Tablet_768:col-span-2"}>
            Add User
          </ModalDisplayButton>
        </div>

        <StaffTable
          onActionClick={(state, item) => {
            setCurrentStaff([state, item]);
            stateHandler(item);
          }}
          data={currentData}
          tableLoading={tableLoading}
        />

        {StaffTableData?.length > 0 && (
          <div className={"w-full flex items-center justify-end"}>
            <Pagination
              currPage={currPage}
              lastPage={lastPage}
              setCurrPage={setCurrPage}
              pages={lastPage}
            />
          </div>
        )}
      </section>

      <input
        type="checkbox"
        id="my-modal-3"
        ref={modalRef}
        className="modal-toggle"
      />
      <div className="modal RangeForPhone:z-[1000] SmallPhones$Tablets:p-4">
        <form
          className="modal-box relative max-w-none w-[700px] SmallPhones$Tablets:w-[500px] "
          onSubmit={(e) => {
            if (currentStaff[1]) {
              if (currentStaff[0] === "active") {
                return blockUserHandler(e);
              } else if (currentStaff[0] === "inactive") {
                return unBlockUserHandler(e);
              }
            } else {
              return formSubmitHandler(e);
            }
          }}
        >
          <label
            htmlFor="my-modal-3"
            className="btn btn-sm btn-circle absolute right-2 top-2"
            onClick={() => {
              setCurrentStaff(["active", null]);
              defualtStateHandler();
            }}
          >
            ✕
          </label>
          <div className={"mb-10"}>
            <h1 className="font-semibold text-2xl pb-1">
              {currentStaff[1]
                ? currentStaff[0] === "active"
                  ? "Block a User"
                  : "Unblock a User"
                : "Add a User"}
            </h1>
          </div>

          <main className={"flex flex-col gap-8 px-6 Mobile_L_425:p-0"}>
            <LabelContainer
              className={
                "SmallPhones$Tablets:flex-col SmallPhones$Tablets:w-full SmallPhones$Tablets:items-start SmallPhones$Tablets:gap-2"
              }
              label={"Name"}
              htmlFor={"user-name"}
            >
              <Input
                className={"w-[60%] SmallPhones$Tablets:w-full"}
                readOnly={currentStaff[1] && true}
                id={"user-name"}
                type={"text"}
                placeholder={"Type in a name"}
                value={nameVal}
                onChangeHandler={(e) => setNameVal(e.target.value)}
              />
            </LabelContainer>
            <LabelContainer
              className={
                "SmallPhones$Tablets:flex-col SmallPhones$Tablets:w-full SmallPhones$Tablets:items-start SmallPhones$Tablets:gap-2"
              }
              label={"Email"}
              htmlFor={"user-email"}
            >
              <Input
                className={"w-[60%] SmallPhones$Tablets:w-full"}
                readOnly={currentStaff[1] && true}
                id={"user-email"}
                type={"email"}
                placeholder={"Type in an email address"}
                value={emailVal}
                onChangeHandler={(e) => setEmailVal(e.target.value)}
              />
            </LabelContainer>
            <LabelContainer
              className={
                "SmallPhones$Tablets:flex-col SmallPhones$Tablets:w-full SmallPhones$Tablets:items-start SmallPhones$Tablets:gap-2"
              }
              // className={"flex items-center justify-between gap-4"}
              label={"Role"}
              htmlFor={"user-role"}
            >
              <select
                name="user-role-dropdown"
                className="select w-[60%] border border-gray-300 SmallPhones$Tablets:w-full"
                id="user-role-dropdown"
                value={roleVal}
                disabled={currentStaff[1] && true}
                onChange={(e) => setRoleVal(e.target.value)}
              >
                <option value="staff">Staff</option>
                <option value="admin">Admin</option>
              </select>
            </LabelContainer>
          </main>

          <div className="modal-action mt-9">
            <Button
              disabled={!emptyFieldsHandler() && true}
              className={`cursor-pointer ${
                currentStaff[1]
                  ? currentStaff[0] === "active"
                    ? "border-red-600 bg-red-600 hover:bg-white hover:border-red-600 hover:text-red-600"
                    : "border-gray-600 bg-gray-600 hover:bg-white hover:border-gray-600 hover:text-gray-600"
                  : "border-blue-600 bg-blue-600 hover:bg-white hover:border-blue-600 hover:text-blue-600"
              }`}
              type={"submit"}
              style={{
                backgroundColor: `${
                  currentStaff[0] === "active" ? "red" : "#2579ff"
                }`,
                // borderColor: `${homeData?.colour || "#2579ff"}`,
              }}
            >
              {currentStaff[1]
                ? currentStaff[0] === "active"
                  ? "Block a User"
                  : "Unblock a User"
                : "Add a User"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Staff;
