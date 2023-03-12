import React, { useContext, useState } from "react";
import Button from "../../components/Button";
import PageTitle from "../../components/PageTitle";
import { notifyError, notifySuccess } from "../../components/ToastAlert";
import { AppContext } from "../../contexts/AppProvider";
import Input from "../../components/Input";
import { LabelContainer } from "../../components";

const Profile = () => {
  const { userEmail, userData, createAxiosInstance } = useContext(AppContext);
  const [oldPasswordInput, setOldPasswordInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [passwordConfirmInput, setPasswordConfirmInput] = useState("");

  function validPasswordHandler() {
    if (
      oldPasswordInput.trim().length >= 8 &&
      passwordInput.trim().length >= 8 &&
      passwordConfirmInput.trim().length >= 8 &&
      passwordInput.trim() === passwordConfirmInput.trim()
    ) {
      return true;
    }
    return false;
  }

  function formSubmitHandler(e) {
    e.preventDefault();
    if (!passwordInput || !oldPasswordInput || !passwordConfirmInput) {
      notifyError("User Details cannot be empty");
      return;
    }
    if (!validPasswordHandler()) {
      notifyError("Invalid user data");
      return;
    }

    setOldPasswordInput("");
    setPasswordInput("");
    setPasswordConfirmInput("");
    createAxiosInstance()
      .post(
        `/auth/password`,
        JSON.stringify({
          old_password: oldPasswordInput,
          new_password: passwordInput,
        })
      )
      .then((response) => {
        if (response.status === 200) {
          notifySuccess("Your password has been updated");
        }
      })
      .catch((err) => {
        console.log(err);
        if (err.response.status === 400) {
          notifyError("Incorrect Old Password");
        } else if (err.response.status === 404) {
          notifyError(
            "An error has occurred password was not updated. Please try again"
          );
        } else if (err.response.status === 401) {
          notifyError(
            "You are not authorized to access this. Please login and try again"
          );
        } else {
          notifyError("Error updating user profile");
        }
      });
  }

  return (
    <>
      <PageTitle>Edit Profile</PageTitle>
      <div
        className={
          "w-full border border-gray-200 p-9 SmallPhones:px-4 py-10 rounded-xl"
        }
      >
        <form onSubmit={formSubmitHandler}>
          <main className={"flex flex-col gap-8 overflow-x-hidden"}>
            <LabelContainer
              labelClassName={"SmallPhones$Tablets:self-start mb-2"}
              className={"SmallPhones$Tablets:flex-col"}
              htmlFor={"name-input"}
              label={"Full Name"}
            >
              <p
                id="name-input"
                className="pl-5 w-[60%] SmallPhones$Tablets:w-[90%] Mobile_L_425:w-[100%] flex items-center  justify-start Mobile_L_425:pl-0"
              >
                {userData?.name}
              </p>
            </LabelContainer>
            <LabelContainer
              labelClassName={"SmallPhones$Tablets:self-start mb-2"}
              className={"SmallPhones$Tablets:flex-col"}
              htmlFor={"email-input"}
              label={"Email Address"}
            >
              <p className=" pl-5 w-[60%] SmallPhones$Tablets:w-[90%] Mobile_L_425:w-[100%] flex items-center justify-start Mobile_L_425:pl-0">
                {userEmail}
              </p>
            </LabelContainer>
            <LabelContainer
              labelClassName={"SmallPhones$Tablets:self-start mb-2"}
              className={"SmallPhones$Tablets:flex-col"}
              htmlFor={"old-password-input"}
              label={"Old Password"}
            >
              <Input
                id={"old-password-input"}
                type={"password"}
                className={
                  "input input-bordered w-[60%] SmallPhones$Tablets:w-[90%] Mobile_L_425:w-[100%]"
                }
                placeholder={"Type your old password"}
                value={oldPasswordInput}
                onChangeHandler={(e) => setOldPasswordInput(e.target.value)}
              />
            </LabelContainer>
            <LabelContainer
              labelClassName={"SmallPhones$Tablets:self-start mb-2"}
              className={"SmallPhones$Tablets:flex-col"}
              htmlFor={"password-input"}
              label={"New Password"}
            >
              <Input
                id={"password-input"}
                type={"password"}
                className={
                  "input input-bordered w-[60%] SmallPhones$Tablets:w-[90%] Mobile_L_425:w-[100%]"
                }
                placeholder={"Type in a new password"}
                value={passwordInput}
                onChangeHandler={(e) => setPasswordInput(e.target.value)}
              />
            </LabelContainer>
            <LabelContainer
              labelClassName={"SmallPhones$Tablets:self-start mb-2"}
              className={"SmallPhones$Tablets:flex-col"}
              htmlFor={"password-confirm-input"}
              label={"Confrim New Password"}
            >
              <Input
                id={"password-confirm-input"}
                type={"password"}
                className={
                  "input input-bordered w-[60%] SmallPhones$Tablets:w-[90%] Mobile_L_425:w-[100%]"
                }
                placeholder={"Retype your new password"}
                value={passwordConfirmInput}
                onChangeHandler={(e) => setPasswordConfirmInput(e.target.value)}
              />
            </LabelContainer>
          </main>

          <div className={"w-full flex items-center justify-end mt-16"}>
            <Button
              type={"submit"}
              className={`${
                !validPasswordHandler() && "disabled:cursor-not-allowed" //? NOTE: This is not working
              }`}
              disabled={!validPasswordHandler() && true}
            >
              Update Profile
            </Button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Profile;
