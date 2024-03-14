import React from "react";
import { Link } from "react-router-dom";

export const Button = ({ btnText, warningText, toLink, linkBtnText,onClick }) => {
  return (
    <div className="text-center items-center">
      <button onClick={onClick}
        type="button"
        className="text-blue-800 font-semibold items-center bg-white rounded-md px-20 py-2"
      >
        <h1>{btnText}</h1>
      </button>
      <Link to={toLink}>
        <div className="flex">
          <h1 className="p-2 text-white text-center">{warningText}</h1>
          <button
            type="button"
            className="px-2 text-white rounded-md "
          >
            <h1 className="underline">{linkBtnText}</h1>
          </button>
        </div>
      </Link>
    </div>
  );
};
