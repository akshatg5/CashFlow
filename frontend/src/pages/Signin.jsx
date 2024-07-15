import React, { useState } from "react";
import { Heading } from "../components/heading";
import { SubHeading } from "../components/subHeading";
import { Button } from "../components/button";
import { InputBox } from "../components/inputBox";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Signin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignIn = async () => {
    try {
      const response = await axios.post(
        "https://cash-flow-backend.vercel.app/cfapi/v1/user/signin",
        {
          username,
          password,
        }
      );
      localStorage.setItem("username", username);
      localStorage.setItem(
        `security-token-for-${username}`,
        response.data.token
      );
      navigate("/dashboard");
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        setError("Invalid username or password. Try again!");
      } else {
        setError("An unexpected error occurred. Please recheck and try again.");
      }
    }
  };

  return (
    <div className="bg-blue-800 h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="rounded-lg shadow-xl px-6 py-8 sm:px-10 sm:py-10 max-w-md w-full border border-gray-300">
        <Heading
          heading={"Sign In"}
          className="text-center text-2xl sm:text-3xl font-bold mb-6"
        />
        <SubHeading
          subheading={"Enter username and password to log in."}
          className="text-gray-600 text-center mb-6 sm:mb-8"
        />
        <InputBox
          onChange={(e) => {
            setUsername(e.target.value);
          }}
          placeholder={"Username"}
          className="mb-4"
        />
        <InputBox
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          placeholder={"Password"}
          className="mb-6"
        />
        <div className="flex justify-center mt-6">
          <Button
            onClick={handleSignIn}
            btnText={"Sign In"}
            warningText={"Create a new account here"}
            toLink={"/signup"}
            linkBtnText={"Sign Up"}
          />
        </div>
        {error && <p className="text-red-500 text-sm text-center mt-4">{error}</p>}
      </div>
    </div>
  );
};
