import React, { useState, useEffect, useContext, useRef } from "react";
import { Link } from "react-router-dom";
import PageTitle from "../../components/PageTitle";
import LabelContainer from "../../components/LabelContainer";
import Input from "../../components/Input";
import Button from "../../components/Button";
import { useDropzone } from "react-dropzone";
import { FiUploadCloud } from "react-icons/fi";
import { ColorPickerPalette } from "../../components";
import { useColor } from "react-color-palette";
import axios, { BaseURL } from "../../api/axios";
import { notifyError, notifySuccess } from "../../components/ToastAlert";
import { AppContext } from "../../contexts/AppProvider";
import { createAxiosInstance } from "../../api/axios";
import styled from "styled-components";

const Span = styled.span`
  color: ${(prop) => prop.color || "#2579ff"};
`;

const Setting = () => {
  const { setLoading, fetchHomeData, homeData } = useContext(AppContext);

  const defaultLogo = homeData?.image || "";
  const defaultTitleText = homeData?.title || "DataOcli Knowledgebase";
  const defaultBodyText =
    homeData?.body ||
    "A premium WordPress theme with integrated Knowledge Base Lorem ipsum dolor sit amet consectetur, adipisicing elit. Magni amet recusandae quam aliquam commodi inventore maiores magnam nisi earum alias? Quae nam doloribus illum et corporis id laboriosam soluta culpa.";
  const [files, setFiles] = useState(defaultLogo);
  const [titleText, setTitleText] = useState(defaultTitleText);
  const [bodyText, setBodyText] = useState(defaultBodyText);
  const [defaultColor, setDefaultColor] = useState(
    `${homeData?.colour || "#344cb1"}`
  );
  const [color, setColor] = useColor("hex", defaultColor);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await createAxiosInstance().get("/admin/profile");
        if (response.status === 200) {
          const data = response.data.page_data;
          setFiles(data.image);
          setBodyText(data.body);
          setTitleText(data.title);
          setDefaultColor(data.colour || "#344cb1");
        }
      } catch (err) {
        if (err.response?.status === 401) {
          notifyError("You not authenticated, please login and try again");
          setLoading(false);
        }
      }
    };
    fetchData();
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    multiple: false,
    maxSize: 5000000,
    accept: {
      "image/png": [".png"],
      "image/jpeg": [".jpg", ".jpeg"],
      "image/svg": [".svg"],
      "text/html": [".html", ".htm"],
    },
    onDrop: (acceptedFiles) => {
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
    },
  });

  useEffect(
    () => () => {
      // Make sure to revoke the data uris to avoid memory leaks
      if (!(typeof files === "string")) {
        files?.forEach((file) => URL.revokeObjectURL(file.preview));
      }
    },
    [files]
  );

  function previewHanlder() {
    const logoPreview = files.map((file) => (
      <div
        key={file.name}
        className="border border-gray-500 w-fit rounded-lg p-1"
      >
        <div className=" w-[6rem] h-[6rem] grid place-content-center border border-gray-400 rounded-md">
          {file.preview.startsWith("blob") ? (
            <img
              className="inline-flex border-2 border-gray-100 w-full max-h-24"
              src={file.preview}
              alt={file.name}
            />
          ) : (
            <img
              className="inline-flex border-2 border-gray-100 w-full max-h-24"
              src={`http://localhost:8000${file.preview}`}
              alt={file.name}
            />
          )}
        </div>
      </div>
    ));
    return logoPreview;
  }

  function formSubmitHandler(e) {
    e.preventDefault();
    setLoading(true);

    function createAxiosInstance() {
      const accessToken = localStorage.getItem("accessToken");
      return axios.create({
        baseURL: BaseURL,
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${accessToken}`,
        },
      });
    }

    const formData = new FormData();
    formData.append("title", titleText);
    formData.append("body", bodyText);
    formData.append("colour", color.hex);

    //! NOTE: This will give error if db is cleared
    if (!(typeof files === "string") || defaultLogo) {
      formData.append("image", files[0]);
    }

    createAxiosInstance()
      .put("/admin/profile", formData)
      .then((response) => {
        if (response.status === 200) {
          fetchHomeData();
          setLoading(false);
          notifySuccess("Homepage has been updated");
        }
      })
      .catch((err) => {
        console.log(err);
        if (err.response?.status === 401) {
          setLoading(false);
          notifyError("You are not authorized to access this page");
        } else if (err.response?.status === 400) {
          setLoading(false);
          notifyError("Settings data is not valid");
        } else {
          setLoading(false);
          notifyError("Something went wrong, please try again");
          throw new Error(err.message);
        }
      });
  }
  const logoInput = useRef(null);

  function fileUploadHandler(e) {
    const fileUploaded = e.target.files[0];
    fileUploaded.preview = URL.createObjectURL(fileUploaded);
    setFiles([fileUploaded]);
  }

  return (
    <div>
      <PageTitle>Settings</PageTitle>

      <section
        className={
          "w-full border border-gray-200 p-9 py-10 rounded-xl Settings_Page_620:px-4"
        }
      >
        <form onSubmit={formSubmitHandler}>
          <main className={"flex flex-col gap-8"}>
            <LabelContainer
              className={"Settings_Page_620:flex-col items-start"}
              htmlFor={"Logo-input"}
              label={"Logo"}
              labelClassName={
                "Settings_Page_620:mb-4 Settings_Page_620:self-start"
              }
            >
              <div className="w-[60%] RangeForPhone:flex RangeForPhone:flex-row RangeForPhone:justify-center RangeForPhone:gap-8">
                <div
                  className="px-6 pt-5 pb-6 border-2 border-gray-300 dark:border-gray-500 border-dashed rounded-md cursor-pointer mb-2 RangeForPhone:hidden"
                  {...getRootProps()}
                >
                  <input {...getInputProps()} className=" outline-0 border-0" />
                  <Span
                    className="mx-auto flex justify-center"
                    color={homeData.colour}
                  >
                    <FiUploadCloud className="text-3xl " />
                  </Span>
                  <p className="text-sm mt-2 flex justify-center">
                    Drag your image here
                  </p>
                  <em className="text-xs text-gray-400 flex justify-center">
                    (Only *.jpeg, *.svg and *.png images will be accepted)
                  </em>
                </div>
                <div className={" AllLaptop:hidden self-start"}>
                  <input
                    ref={logoInput}
                    onChange={fileUploadHandler}
                    type={"file"}
                    style={{ display: "none" }}
                  />
                  <Button onClickHandler={() => logoInput.current.click()}>
                    Upload Logo
                  </Button>
                </div>
                {files?.length ? (
                  typeof files === "string" ? (
                    <div className="border border-gray-500 w-fit rounded-lg p-1">
                      <div className=" w-[6rem] h-[6rem] grid place-content-center border border-gray-400 rounded-md">
                        <img
                          className="inline-flex border-2 border-gray-100 w-full max-h-24"
                          src={`http://localhost:8000${files}`}
                          alt={"Logo"}
                        />
                      </div>
                    </div>
                  ) : (
                    previewHanlder()
                  )
                ) : (
                  <div>
                    <div className="border border-gray-500 w-fit rounded-lg p-1">
                      <p className="w-[6rem] h-[6rem] grid place-content-center border border-gray-400 rounded-md">
                        Logo
                      </p>
                    </div>
                  </div>
                )}
                {/* )} */}
              </div>
            </LabelContainer>

            <LabelContainer
              className={"Settings_Page_620:flex-col items-start"}
              htmlFor={"title-text"}
              label={"Title Text"}
              labelClassName={
                " Settings_Page_620:mb-4 Settings_Page_620:self-start"
              }
            >
              <Input
                id={"title-text"}
                type={"text"}
                className={
                  "input input-bordered w-[60%] Settings_Page_620:self-start Settings_Page_620:w-full"
                }
                placeholder={"Type in a title for the home page..."}
                value={titleText}
                onChangeHandler={(e) => setTitleText(e.target.value)}
              />
            </LabelContainer>
            <LabelContainer
              className={"Settings_Page_620:flex-col items-start"}
              htmlFor={"body-text"}
              label={"Body Text"}
              labelClassName={
                " Settings_Page_620:mb-4 Settings_Page_620:self-start"
              }
            >
              <textarea
                id="body-text"
                className="textarea textarea-bordered w-[60%] h-60 Settings_Page_620:self-start Settings_Page_620:w-full"
                placeholder="Type in a body text for the home page..."
                value={bodyText}
                onChange={(e) => setBodyText(e.target.value)}
              ></textarea>
            </LabelContainer>
            <LabelContainer
              className={"Settings_Page_620:flex-col items-start"}
              htmlFor={"colo-picker-palette"}
              label={"Color Palette"}
              labelClassName={
                " Settings_Page_620:mb-4 Settings_Page_620:self-start"
              }
            >
              <div className=" Settings_Page_620:self-start Settings_Page_620:w-full">
                <ColorPickerPalette color={color} setColor={setColor} />
                <div className="flex pl-3 items-center gap-3 mt-4">
                  <div
                    className={` w-4 h-4 rounded-full`}
                    style={{
                      backgroundColor: `${homeData?.colour || "#2579ff"}`,
                    }}
                  ></div>
                  <p>Current color state</p>
                </div>
              </div>
            </LabelContainer>
          </main>

          <div className={"w-full flex items-center justify-between mt-16"}>
            <Link to={"/"} className={"underline self-end"}>
              {"<-- Go to Home"}
            </Link>
            <Button type={"submit"} className={``}>
              Update Homepage
            </Button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default Setting;
