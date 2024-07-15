import React, { useEffect, useState } from "react";
import { Heading } from "./heading";
import { SubHeading } from "./subHeading";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Navbar = () => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const userProfile = async () => {
      const username = localStorage.getItem("username");
      const token = localStorage.getItem(`security-token-for-${username}`);
      const headers = { Authorization: `Bearer ${token}` };
      try {
        const response = await axios.get(
          "https://cash-flow-backend.vercel.app/cfapi/v1/user/userprofile",
          { headers }
        );
        setFirstname(response.data.firstName);
        setLastname(response.data.lastName);
      } catch (error) {
        console.error("Navbar user name error", error);
      }
    };
    userProfile();
  }, []);

  const handleLogout = () => {
    // when logging out simply clear the local storage for all the tokens
    localStorage.removeItem("username");
    navigate("/");
  };

  return (
    <div className="flex flex-col sm:flex-row justify-between py-4 px-4 sm:px-10">
      <div className="mb-4 sm:mb-0">
        <Heading heading={"CashFlow"} className="text-center sm:text-left" />
      </div>
      <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-8">
        <div className="text-center sm:text-left">
          <SubHeading subheading={`Hello, ${firstname} ${lastname}`} />
        </div>
        <div>
          <button
            onClick={handleLogout}
            className="bg-white text-blue-800 text-lg sm:text-xl px-6 sm:px-8 py-2 rounded-xl border font-semibold border-gray-200 shadow-xl"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};
