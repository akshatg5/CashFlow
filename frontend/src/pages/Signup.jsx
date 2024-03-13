import React from "react";
import { Heading } from "../components/heading";
import { SubHeading } from "../components/subHeading";
import { InputBox } from "../components/inputBox";
import { Button } from "../components/button";

export const Signup = () => {
  return (
    <div className="bg-blue-800 h-screen flex items-center justify-center align-middle">
      <div className="rounded-lg shadow-xl px-10 py-8 max-w-md align-middle border border-gray-300">
        <Heading
          heading={"Sign Up"}
          className="text-center text-3xl font-bold mb-6"
        />
        <SubHeading
          subheading={"Fill the following details to continue."}
          className="text-gray-600 text-center mb-8"
        />
        <InputBox placeholder={"Username"} />
        <InputBox placeholder={"Email"} />
        <InputBox placeholder={"Password"} />
        <InputBox placeholder={"First Name"} />
        <InputBox placeholder={"Last Name"} />
        <div className="flex justify-center mt-10">
          <Button btnText={"Sign Up"} warningText={"Already have an account?"} toLink={"/signin"} linkBtnText={"Sign In"} />
        </div>
        <div className="text-center text-white mt-6">Forgot password?</div>
      </div>
    </div>
  );
};
