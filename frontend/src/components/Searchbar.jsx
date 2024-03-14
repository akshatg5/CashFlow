import React from "react";
import { Heading } from "./heading";

export const Searchbar = ({onChange}) => {
  return (
    <div>
      <div className="flex justify-center align-middle items-center mt-5">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-10 h-10 p-2 rounded-xl items-center"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
          />
        </svg>
        <input
          className="w-1/2 rounded-2xl px-4 items-center py-2 focus:ring-2 focus:ring-blue-500"
          placeholder="Search Users..."
          onChange={onChange}
        />
      </div>
      <div className="mt-4">
      <Heading heading={"Users: "}  />
      </div>
    </div>
  );
};
