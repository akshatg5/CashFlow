import React, { useState } from "react";
import { Heading } from "../components/heading";
import { SubHeading } from "../components/subHeading";
import { InputBox } from "../components/inputBox";
import { Button } from "../components/button";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastname] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignup = async () => {
    try {
      const response = await axios.post(
        "https://cash-flow-backend.vercel.app/cfapi/v1/user/signup",
        {
          username,
          email,
          password,
          firstName,
          lastName,
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
        setError("Invalid Inputs. Try again!");
      } else {
        setError("Invalid inputs. Please recheck and try again.");
      }
    }
  };

  return (
    <div className="bg-blue-800 h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="rounded-lg shadow-xl px-6 py-8 sm:px-10 sm:py-10 max-w-md w-full border border-gray-300">
        <Heading
          heading={"Sign Up"}
          className="text-center text-2xl sm:text-3xl font-bold mb-6"
        />
        <SubHeading
          subheading={"Fill the following details to continue."}
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
            setEmail(e.target.value);
          }}
          placeholder={"Email"}
          className="mb-4"
        />
        <InputBox
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          placeholder={"Password"}
          className="mb-4"
        />
        <InputBox
          onChange={(e) => {
            setFirstName(e.target.value);
          }}
          placeholder={"First Name"}
          className="mb-4"
        />
        <InputBox
          onChange={(e) => {
            setLastname(e.target.value);
          }}
          placeholder={"Last Name"}
          className="mb-6"
        />
        <div className="flex justify-center mt-6">
          <Button
            onClick={handleSignup}
            btnText={"Sign Up"}
            warningText={"Already have an account?"}
            toLink={"/signin"}
            linkBtnText={"Sign In"}
          />
        </div>
        {error && <p className="text-red-500 text-sm text-center mt-4">{error}</p>}
        <div className="text-center text-blue-800 mt-6">Forgot password?</div>
      </div>
    </div>
  );
};
