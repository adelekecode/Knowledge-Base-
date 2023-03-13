import React, { useState } from "react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "../../api/axios";
// import { Footer } from "../../components";
import SideImage from "../../assets/images/8401.jpg";
import Input from "../../components/Input";
import { notifyError, notifySuccess } from "../../components/ToastAlert";
import { AppContext } from "../../contexts/AppProvider";
import { validEmailHandler } from "../../helper/EmailValidation";

const Button = styled.button`
  background-color: ${(prop) => prop?.color || "#2579ff"};
  border-color: ${(prop) => prop?.color || "#2579ff"};
  &:hover {
    color: ${(prop) => prop?.color || "#2579ff"};
    border-color: ${(prop) => prop?.color || "#2579ff"};
  }
`;

const Lgoin = () => {
  const { setLoading, updateUserStorage, homeData } = useContext(AppContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  function formSubmitHandler(e) {
    e.preventDefault();
    if (!email.trim() && !password.trim()) {
      setEmailError(true);
      setPasswordError(true);
      return;
    }
    if (!validEmailHandler(email)) {
      setEmailError(false);
      setPasswordError(false);
      notifyError("Invalid email address");
      return;
    }
    if (!(password.trim().length >= 8)) {
      setEmailError(false);
      setPasswordError(false);
      notifyError("Password must be at least 8 characters");
      return;
    }
    setLoading(true);

    axios
      .post(
        "/auth/user/login",
        JSON.stringify({ email: email, password: password })
      )
      .then((response) => {
        if (response.status === 200 || response.status === 201) {
          const userData = response.data.data;
          console.log(userData);
          localStorage.setItem("accessToken", userData["access_token"]);
          localStorage.setItem("email", userData["email"]);
          localStorage.setItem("refreshToken", userData["refresh_token"]);
          localStorage.setItem("userRole", userData["role"]);
          localStorage.setItem("name", userData["name"]);
          localStorage.setItem("userID", userData["id"]);
          // updateUserStorage(response.data.data);
          setLoading(false);
          notifySuccess("Logged in successfully");
          if (userData["role"] === "admin") {
            navigate("/dashboard");
          } else {
            navigate("/");
          }
        } else {
          setLoading(false);
          notifyError("Something went wrong, please try again ");
          throw new Error("Something went wrong, please try again ");
        }
      })
      .catch((err) => {
        if (err.response?.status === 403) {
          setLoading(false);
          notifyError("User with email and password does not exist");
        }
      });
  }

  return (
    <div
      className={"flex flex-col justify-between"}
      style={{ maxWidth: "1666px", margin: "0 auto" }}
    >
      <div
        className={
          "grid grid-cols-loginPage RangeForPhone:grid-cols-1 h-[inherit] w-full min-h-screen"
        }
      >
        <div
          className={
            "w-[inherit] bg-gray-100 flex flex-col justify-center items-center gap-6 p-[7rem] Tablet:p-[3rem] SmallPhones:p-[1rem]"
          }
        >
          <h1
            className={
              "w-full text-center font-bold text-[1.3rem] text-FontPrimaryColor Tablet:w-[80%]"
            }
          >
            Log Into Your Account
          </h1>
          <div
            className={
              "w-full flex flex-col gap-4 Tablet:w-[80%] SmallPhones:w-[100%]"
            }
          >
            <div className={"w-full flex flex-col gap-1"}>
              <Input
                type={"email"}
                placeholder={"Enter your Email"}
                value={email}
                onChangeHandler={(e) => setEmail(e.target.value)}
              />
              <small
                className={`text-[0.8rem]`}
                style={{
                  color: `${emailError ? "red" : "transparent"}`,
                }}
              >
                This field cannot be empty
              </small>
            </div>
            <div className={"w-full flex flex-col gap-1"}>
              <Input
                type={"password"}
                placeholder={"Enter your password"}
                value={password}
                onChangeHandler={(e) => setPassword(e.target.value)}
              />
              <small
                className={`text-[0.8rem]`}
                style={{
                  color: `${passwordError ? "red" : "transparent"}`,
                }}
              >
                This field cannot be empty
              </small>
            </div>
            <Button
              color={homeData.colour}
              className={
                " w-full rounded-lg p-[0.8rem] text-white border hover:bg-white font-medium"
              }
              onClick={formSubmitHandler}
              type="submit"
            >
              Login
            </Button>
          </div>
        </div>
        <figure
          className={
            "w-full grid place-content-center p-20 RangeForPhone:hidden"
          }
        >
          <img className={"w-full object-cover"} src={SideImage} alt="" />
        </figure>
      </div>
    </div>
  );
};

export default Lgoin;
