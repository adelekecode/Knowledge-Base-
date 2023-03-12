import React, { useContext, useRef, useState } from "react";
import PageTitle from "../../components/PageTitle";
import Button from "../../components/Button";
import {
  CategoryTable,
  LabelContainer,
  ModalDisplayButton,
} from "../../components";
import Input from "../../components/Input";
import Pagination from "../../components/Pagination";
import { notifyError, notifySuccess } from "../../components/ToastAlert";
import { DashboardContext } from "../../contexts/DashboardProvider";
import { AppContext } from "../../contexts/AppProvider";

const Category = () => {
  const { createAxiosInstance } = useContext(AppContext);
  const {
    CategoryTableData,
    filteredCategoryTableData,
    setFilteredCategoryTableData,
    fetchCategoryData,
    tableLoading,
  } = useContext(DashboardContext);
  const [searchVal, setSearchVal] = useState("");
  const [categoryVal, setCategoryVal] = useState("");

  const [currPage, setCurrPage] = useState(1);
  const rowsPerPage = 8;
  const lastPage = Math.ceil(CategoryTableData?.length / rowsPerPage);
  const lastPostIndex = currPage * rowsPerPage;
  const firstPostIndex = lastPostIndex - rowsPerPage;
  const currentData = filteredCategoryTableData?.slice(
    firstPostIndex,
    lastPostIndex
  );

  const [currentCategory, setCurrentCategory] = useState([]);

  const modalRef = useRef();

  function changeFormText() {
    if (currentCategory[0] === "edit" && currentCategory[1]) {
      return "Edit Category";
    } else if (currentCategory[0] === "delete" && currentCategory[1]) {
      return "Delete Category";
    } else {
      return "Add Category";
    }
  }

  function formSubmitHandler(e) {
    e.preventDefault();

    if (!categoryVal.trim()) {
      notifyError("Category input cannot be empty");
      return;
    }

    createAxiosInstance()
      .post(
        "/category/create",
        JSON.stringify({
          name: categoryVal,
        })
      )
      .then((response) => {
        if (response.status === 200 || response.status === 201) {
          setCategoryVal("");
          notifySuccess("Category has been successfully created");
          modalRef.current.checked = false;
          fetchCategoryData();
        } else {
          notifyError("Something went wrong please try again");
        }
      })
      .catch((err) => {
        console.log(err);
        if (err.response?.status === 401) {
          return notifyError(
            "You are not authenticated, please login and try again"
          );
        } else if (err.response?.status === 400) {
          return notifyError("Category data is invalid");
        }
      });
  }

  function editCategoryHandler(e) {
    e.preventDefault();

    if (!categoryVal.trim()) {
      notifyError("Category input cannot be empty");
      return;
    }

    createAxiosInstance()
      .put(
        `/category/update/${currentCategory[1].id}`,
        JSON.stringify({
          name: categoryVal,
        })
      )
      .then((response) => {
        if (response.status === 200) {
          setCategoryVal("");
          setCurrentCategory([]);
          notifySuccess("Category has been successfully updated");
          modalRef.current.checked = false;
          fetchCategoryData();
        }
      })
      .catch((err) => {
        console.log(err);
        if (err.response?.status === 401) {
          return notifyError(
            "You are not authenticated, please login and try again"
          );
        } else if (err.response?.status === 404) {
          return notifyError("This category does not exist");
        }
      });
  }

  function deleteCategoryHandler(e) {
    e.preventDefault();

    createAxiosInstance()
      .delete(`/category/update/${currentCategory[1].id}`)
      .then((response) => {
        if (response.status === 200) {
          setCategoryVal("");
          setCurrentCategory([]);
          notifySuccess("Category has been successfully deleted");
          modalRef.current.checked = false;
          fetchCategoryData();
        }
      })
      .catch((err) => {
        console.log(err);
        if (err.response?.status === 401) {
          return notifyError(
            "You are not authenticated, please login and try again"
          );
        } else if (err.response?.status === 404) {
          return notifyError("This category does not exist");
        }
      });
  }

  return (
    <div>
      <PageTitle>Category</PageTitle>

      <section className={"w-full flex flex-col gap-8 "}>
        <div
          className={
            "grid grid-cols-CategorySearchBar gap-8 bg-base-200 p-4 rounded-lg Mobile_L_425:grid-cols-1"
          }
        >
          <Input
            placeholder={"Search by name"}
            type={"search"}
            value={searchVal}
            onChangeHandler={(e) => {
              setSearchVal(e.target.value);
              setFilteredCategoryTableData(
                CategoryTableData?.filter((item) =>
                  item.name
                    .toLowerCase()
                    .includes(e.target.value.toLowerCase().trim())
                )
              );
            }}
          />
          <ModalDisplayButton>Add Category</ModalDisplayButton>
        </div>

        <CategoryTable
          editHandler={(item) => {
            setCurrentCategory(item);
            setCategoryVal(item[1].name);
          }}
          deleteHandler={(item) => {
            setCurrentCategory(item);
            setCategoryVal(item[1].name);
          }}
          data={currentData}
          tableLoading={tableLoading}
        />

        {CategoryTableData?.length > 0 && (
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
        ref={modalRef}
        id="my-modal-3"
        className="modal-toggle"
      />
      <div className="modal RangeForPhone:z-[1000] SmallPhones$Tablets:p-4">
        <form
          className="modal-box relative max-w-xl px-8 w-[700px] SmallPhones$Tablets:px-4"
          onSubmit={(e) => {
            if (currentCategory[0] === "edit" && currentCategory[1]) {
              return editCategoryHandler(e);
            } else if (currentCategory[0] === "delete" && currentCategory[1]) {
              return deleteCategoryHandler(e);
            } else {
              return formSubmitHandler(e);
            }
          }}
        >
          <label
            htmlFor="my-modal-3"
            className="btn btn-sm btn-circle absolute right-2 top-2"
            onClick={() => {
              setCurrentCategory([]);
              setCategoryVal("");
            }}
          >
            ✕
          </label>
          <div className={"mb-10"}>
            <h1 className="font-semibold text-2xl pb-1">{changeFormText()}</h1>
          </div>

          <LabelContainer
            label={"Category"}
            htmlFor={"category-input"}
            className={"Mobile_L_425:flex-col"}
            labelClassName={"Mobile_L_425:self-start Mobile_L_425:mb-2"}
          >
            <Input
              id={"category-input"}
              readOnly={currentCategory[0] === "delete"}
              className={"w-[70%] Mobile_L_425:w-[100%]"}
              placeholder={"Type in a category"}
              value={categoryVal}
              onChangeHandler={(e) => setCategoryVal(e.target.value)}
            />
          </LabelContainer>

          <div className="modal-action mt-10">
            <label>
              <Button
                disabled={!categoryVal.trim() && true}
                type={"submit"}
                className={
                  currentCategory[0] === "delete" &&
                  "border-red-600 bg-red-600 hover:bg-white hover:border-red-600 hover:text-red-600"
                }
              >
                {changeFormText()}
              </Button>
            </label>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Category;
