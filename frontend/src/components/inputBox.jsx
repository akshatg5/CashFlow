import React from "react";

export const InputBox = ({ placeholder }) => {
  return (
    <div className="flex space-y-2 bg-blue-800 rounded-lg shadow-md my-1">
      <input
        placeholder={placeholder}
        className="bg-blue-800 py-2 m-2 px-4 text-white w-full rounded-lg p-2 border border-white focus:outline-none focus:ring-offset-2 focus:ring-blue-200"
      />
    </div>
  );
};
