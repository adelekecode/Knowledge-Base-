import React from "react";
import notFound from "../../assets/images/404.svg";
import Button from "../../components/Button";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <>
      <div className="px-6 py-16 lg:py-20 h-screen flex flex-wrap content-center">
        <div className="block justify-items-stretch mx-auto items-center text-center">
          <img width={650} height={450} src={notFound} alt="404" />
          <h2 className="font-bold font-serif font-2xl lg:text-4xl leading-7 mb-4 text-FontPrimaryColor">
            Page is not found!
          </h2>
          <Link to="/">
            <Button className={"font-semibold mt-4 px-8 py-3"}>
              Back to home
            </Button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default NotFound;
