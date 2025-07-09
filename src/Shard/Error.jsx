import Lottie from "lottie-react";
import errorAnimation from "../assets/error-Animation - 1752035383607.json";
import { Link } from "react-router";

const Error = () => {
  return (
    <div className="  mx-auto grid px-4 min-h-screen  lg:w-2/4 ">
      {/* use lottie animation */}
      <Lottie animationData={errorAnimation} loop={true}></Lottie>
      <h2 className="text-3xl text-center italic text-info">Page not Fount </h2>
      <Link className="btn btn-info " to="/">
        {" "}
        Go Back Home
      </Link>
    </div>
  );
};

export default Error;
