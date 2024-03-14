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
  const navigate = useNavigate();

  return (
    <div className="bg-blue-800 h-screen flex items-center justify-center align-middle">
      <div className="rounded-lg shadow-xl px-10 py-8 max-w-md align-middle border border-gray-300">
        <Heading
          heading={"Sign In"}
          className="text-center text-3xl font-bold mb-6"
        />
        <SubHeading
          subheading={"Enter username and password to log in."}
          className="text-gray-600 text-center mb-8"
        />

        <InputBox
          onChange={(e) => {
            setUsername(e.target.value);
          }}
          placeholder={"Username"}
        />
        <InputBox
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          placeholder={"Password"}
        />
        <div className="flex justify-center mt-10">
          <Button
            onClick={async () => {
              const response = await axios.post(
                "http://localhost:3000/cfapi/v1/user/signin",
                {
                  username,
                  password,
                }
              );
              localStorage.setItem('username',username);
              localStorage.setItem(`security-token-for-${username}`,response.data.token)
              navigate('/dashboard');
            }}
            btnText={"Sign In"}
            warningText={"Create a new account here"}
            toLink={"/signup"}
            linkBtnText={"Sign Up"}
          />
        </div>
      </div>
    </div>
  );
};
