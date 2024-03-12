import React from "react";

export const InputBox = ({ placeholder, label }) => {
  return (
    <div className="flex flex-col space-y-2 pt-4 pb-8 bg-blue-800 rounded-lg shadow-md my-2">
      <label className="text-white text-xl font-bold">{label}</label>

      <input
        placeholder={placeholder}
        className="bg-gray-700 text-white w-full rounded-lg p-2 border border-gray-700 focus:outline-none focus:ring-offset-2 focus:ring-blue-200"
      />
    </div>
  );
};
