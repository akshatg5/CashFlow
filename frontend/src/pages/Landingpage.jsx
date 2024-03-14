import React from "react";
import { Button } from "../components/button";
import { useNavigate } from "react-router-dom";

export const Landingpage = () => {
  const navigate = useNavigate();
  return (
    <div className="bg-blue-800 flex flex-col justify-center h-screen align-middle">
      <div className="">
        <div className="text-white text-3xl mb-2">
          <h1 className="text-center font-bold">CashFlow</h1>
        </div>
        <div className="mb-2 flex justify-center items-center">
          <p className="items-center text-center text-white w-96">
            CashFlow is a simple payments app that allows you to send money to
            your friends and family.
          </p>
        </div>
        <div className="justify-center text-center my-2">
          <button
            onClick={() => {
              navigate("/signup");
            }}
            className="bg-white text-blue-800 text-xl px-8 py-2 rounded-xl border font-semibold border-gray-200 shadow-xl"
          >
            <h1>Sign Up</h1>
          </button>
        </div>
        <div className="justify-center text-center my-2">
          <button
            onClick={() => {
              navigate("/signin");
            }}
            className="bg-white text-blue-800 text-xl px-8 py-2 rounded-xl border font-semibold border-gray-200 shadow-xl"
          >
            <h1>Sign In</h1>
          </button>
        </div>
      </div>
    </div>
  );
};
