import React, { useContext, useState, useRef, useEffect } from "react";
import {
  ArticleTable,
  LabelContainer,
  ModalDisplayButton,
} from "../../components";
import Pagination from "../../components/Pagination";
import Button from "../../components/Button";
import { DashboardContext } from "../../contexts/DashboardProvider";
import PageTitle from "../../components/PageTitle";
import Input from "../../components/Input";
import { notifyError, notifySuccess } from "../../components/ToastAlert";
import { AppContext } from "../../contexts/AppProvider";

const Article = () => {
  const { createAxiosInstance } = useContext(AppContext);
  const {
    CategoryTableData,
    filteredArticleTableData,
    setFilteredArticleTableData,
  } = useContext(DashboardContext);
  const [ArticleTableData, setArticleTableData] = useState([]);
  const [searchVal, setSearchVal] = useState("");
  const [selectedVal, setSelectedVal] = useState("");

  const [category, setCategory] = useState(""); //? NOTE initial should be null
  const [title, setTitle] = useState("");
  const [glossaryLink, setGlossaryLink] = useState("");
  const [playBookLink, setPlayBookLink] = useState("");

  const [currPage, setCurrPage] = useState(1);
  const rowsPerPage = 8;
  const lastPage = Math.ceil(ArticleTableData?.length / rowsPerPage);
  const lastPostIndex = currPage * rowsPerPage;
  const firstPostIndex = lastPostIndex - rowsPerPage;

  const currentData = filteredArticleTableData?.slice(
    firstPostIndex,
    lastPostIndex
  );
  const [currentArticle, setCurrentArticle] = useState([]);
  const modalRef = useRef();
  const [tableLoading, setTableLoading] = useState(false);

  // ? Articles
  const fetchArticleData = async () => {
    try {
      setTableLoading(true);
      const response = await createAxiosInstance().get(
        "/category/article/list"
      );
      if (response.status === 200) {
        setArticleTableData(response.data.flat());
        setFilteredArticleTableData(response.data.flat());
      }
    } catch (err) {
      console.log(err);
      // notifyError("Something went wrong. Please try again later.");
    } finally {
      setTableLoading(false);
    }
  };
  useEffect(() => {
    fetchArticleData();
  }, []);

  function changeFormText() {
    if (currentArticle[0] === "edit" && currentArticle[1]) {
      return "Edit Article";
    } else if (currentArticle[0] === "delete" && currentArticle[1]) {
      return "Delete Article";
    } else {
      return "Add Article";
    }
  }

  function defaultStateHandler() {
    setCategory("");
    setTitle("");
    setGlossaryLink("");
    setPlayBookLink("");
    setCurrentArticle([]);
  }

  function stateHandler(item) {
    setCategory(item[1].category_id);
    setTitle(item[1].title);
    setGlossaryLink(item[1].data_glossary);
    setPlayBookLink(item[1].play_book);
  }

  function checkEmptyFieldHandler() {
    if (
      !category ||
      !title.trim() ||
      !glossaryLink.trim() ||
      !playBookLink.trim()
    ) {
      return true;
    }
    return false;
  }

  function formSubmitHandler(e) {
    e.preventDefault();

    if (checkEmptyFieldHandler()) {
      notifyError("Article input cannot be empty");
    }

    createAxiosInstance()
      .post(
        "/category/article/create",
        JSON.stringify({
          category: category,
          title: title,
          data_glossary: glossaryLink,
          play_book: playBookLink,
        })
      )
      .then((response) => {
        if (response.status === 200 || response.status === 201) {
          defaultStateHandler();
          notifySuccess("Article has been successfully created");
          modalRef.current.checked = false;
          fetchArticleData();
        }
      })
      .catch((err) => {
        console.log(err);
        if (err.response?.status === 400) {
          notifyError("Glossary Link and PlayBook Link must be a valid URL");
        } else if (err.response?.status === 400) {
          notifyError("Article data is invalid");
        }
      });
  }

  function editArticleHandler(e) {
    e.preventDefault();

    if (checkEmptyFieldHandler()) {
      notifyError("Article input cannot be empty");
    }

    createAxiosInstance()
      .put(
        `/category/article/update/${currentArticle[1].article_id}`,
        JSON.stringify({
          category: category,
          title: title,
          data_glossary: glossaryLink,
          play_book: playBookLink,
        })
      )
      .then((response) => {
        if (response.status === 200) {
          defaultStateHandler();
          notifySuccess("Category has been successfully updated");
          modalRef.current.checked = false;
          fetchArticleData();
        }
      })
      .catch((err) => {
        console.log(err);
        if (err.response?.status === 404) {
          notifyError("This article does not exist");
        }
      });
  }

  function deleteArticleHandler(e) {
    e.preventDefault();

    if (checkEmptyFieldHandler()) {
      notifyError("Article input cannot be empty");
    }

    createAxiosInstance()
      .delete(`/category/article/update/${currentArticle[1].article_id}`)
      .then((response) => {
        if (response.status === 200) {
          defaultStateHandler();
          notifySuccess("Category has been successfully deleted");
          modalRef.current.checked = false;
          fetchArticleData();
        }
      })
      .catch((err) => {
        console.log(err);
        throw new Error("Network error occurred");
      });
  }

  return (
    <>
      <PageTitle>Article</PageTitle>
      <main className={"w-full flex flex-col gap-8"}>
        <div
          className={
            "w-full grid items-center justify-between gap-8 grid-cols-ArticleSearchBar bg-base-200 p-4 rounded-lg Tablet_768:grid-cols-2 Mobile_L_425:grid-cols-1"
          }
        >
          <Input
            type={"search"}
            value={searchVal}
            onChangeHandler={(e) => {
              setSearchVal(e.target.value);
              setFilteredArticleTableData(
                ArticleTableData?.filter((item) =>
                  item.title
                    .toLowerCase()
                    .includes(e.target.value.toLowerCase().trim())
                )
              );
            }}
          />
          <select
            id="search-select-input"
            className="select w-full border border-gray-300 text-FontPrimaryColor font-medium"
            value={selectedVal}
            onChange={(e) => {
              setSelectedVal(e.target.value);
              setFilteredArticleTableData(
                ArticleTableData?.filter((item) => {
                  if (e.target.value === "") {
                    return item;
                  } else {
                    return item.category_id === Number(e.target.value);
                  }
                })
              );
            }}
          >
            <option value={""}>All Category</option>
            {CategoryTableData?.map((item) => (
              <option key={item.id} value={`${item.id}`}>
                {item.name}
              </option>
            ))}
          </select>
          <ModalDisplayButton className={"Tablet_768:col-span-2"}>
            Add Article
          </ModalDisplayButton>
        </div>

        <ArticleTable
          editHandler={(item) => {
            setCurrentArticle(item);
            stateHandler(item);
          }}
          deleteHandler={(item) => {
            setCurrentArticle(item);
            stateHandler(item);
          }}
          data={currentData}
          tableLoading={tableLoading}
        />

        <div className=" flex items-center justify-end">
          {ArticleTableData?.length > 0 && (
            <Pagination
              currPage={currPage}
              lastPage={lastPage}
              setCurrPage={setCurrPage}
              pages={lastPage}
            />
          )}
        </div>
      </main>

      <input
        type="checkbox"
        id="my-modal-3"
        ref={modalRef}
        className="modal-toggle"
      />
      <div className="modal RangeForPhone:z-[1000] SmallPhones$Tablets:p-4">
        <form
          className="modal-box relative max-w-none w-[700px]"
          onSubmit={(e) => {
            if (currentArticle[0] === "edit" && currentArticle[1]) {
              return editArticleHandler(e);
            } else if (currentArticle[0] === "delete" && currentArticle[1]) {
              return deleteArticleHandler(e);
            } else {
              return formSubmitHandler(e);
            }
          }}
        >
          <label
            htmlFor="my-modal-3"
            className="btn btn-sm btn-circle absolute right-2 top-2"
            onClick={() => {
              setCurrentArticle([]);
              setCategory("");
              setTitle("");
              setGlossaryLink("");
              setPlayBookLink("");
            }}
          >
            ✕
          </label>
          <div className={"mb-10"}>
            <h1 className="font-semibold text-2xl pb-1">{changeFormText()}</h1>
          </div>

          <section
            className={
              "px-8 flex flex-col gap-8 w-[100%] SmallPhones$Tablets:px-0"
            }
          >
            <LabelContainer
              className={
                "SmallPhones$Tablets:flex-col SmallPhones$Tablets:w-full SmallPhones$Tablets:items-start SmallPhones$Tablets:gap-2"
              }
              label={"Category"}
              htmlFor={"form-select-input"}
            >
              <select
                id="form-select-input"
                className="select w-[60%] border border-gray-300 SmallPhones$Tablets:w-full"
                value={category}
                onChange={(e) => setCategory(Number(e.target.value))}
              >
                <option defaultValue={""}>Select a category</option>

                {CategoryTableData?.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                ))}
              </select>
            </LabelContainer>
            <LabelContainer
              className={
                "SmallPhones$Tablets:flex-col SmallPhones$Tablets:w-full SmallPhones$Tablets:items-start SmallPhones$Tablets:gap-2"
              }
              label={"Title"}
              htmlFor={"title-input"}
            >
              <Input
                id={"title-input"}
                readOnly={currentArticle[0] === "delete"}
                className={" w-[60%] SmallPhones$Tablets:w-full"}
                type="text"
                value={title}
                onChangeHandler={(e) => setTitle(e.target.value)}
                placeholder={"Type in a title"}
              />
            </LabelContainer>
            <LabelContainer
              className={
                "SmallPhones$Tablets:flex-col SmallPhones$Tablets:w-full SmallPhones$Tablets:items-start SmallPhones$Tablets:gap-2"
              }
              label={"Glossary Link"}
              htmlFor={"glossary-link-input"}
            >
              <Input
                id={"glossary-link-input"}
                readOnly={currentArticle[0] === "delete"}
                className={" w-[60%] SmallPhones$Tablets:w-full"}
                type="text"
                value={glossaryLink}
                onChangeHandler={(e) => setGlossaryLink(e.target.value)}
                placeholder={"https://example.com"}
              />
            </LabelContainer>
            <LabelContainer
              className={
                "SmallPhones$Tablets:flex-col SmallPhones$Tablets:w-full SmallPhones$Tablets:items-start SmallPhones$Tablets:gap-2"
              }
              label={"PlayBook Link"}
              htmlFor={"playbook-link-input"}
            >
              <Input
                id={"playbook-link-input"}
                readOnly={currentArticle[0] === "delete"}
                className={" w-[60%] SmallPhones$Tablets:w-full"}
                type="text"
                value={playBookLink}
                onChangeHandler={(e) => setPlayBookLink(e.target.value)}
                placeholder={"https://example.com"}
              />
            </LabelContainer>
          </section>

          <div className="modal-action">
            <Button
              className={
                currentArticle[0] === "delete" &&
                currentArticle[1] &&
                "border-red-600 bg-red-600 hover:bg-white hover:border-red-600 hover:text-red-600"
              }
              disabled={checkEmptyFieldHandler() && true}
              type={"submit"}
            >
              {changeFormText()}
            </Button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Article;
