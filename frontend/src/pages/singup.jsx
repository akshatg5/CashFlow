import React from "react";
import { Heading } from "../components/heading";
import { SubHeading } from "../components/subHeading";
import { InputBox } from "../components/inputBox";

export const Signup = () => {
  return (
    <div className="bg-blue-800 h-screen flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-md px-10 py-8 w-full max-w-md">
        <Heading
          heading={"Sign Up"}
          className="text-center text-2xl font-bold mb-6"
        />
        <SubHeading
          subheading={"Fill the following details to continue."}
          className="text-gray-600 text-center mb-8"
        />
        <InputBox label={"Username"} placeholder={"username"} />
        <InputBox label={"Email"} placeholder={"email"} />
        <InputBox label={"Password"} placeholder={"password"} />
        <InputBox label={"First Name"} placeholder={"Robert"} />
        <InputBox label={"Last Name"} placeholder={"Downey"} />
        <div className="flex justify-center mt-10">
          <button className="bg-black text-white font-bold py-2 px-4 rounded-md hover:bg-gray-700">
            Sign Up
          </button>
        </div>
        <div className="text-center text-gray-500 mt-6">Forgot password?</div>
      </div>
    </div>
  );
};