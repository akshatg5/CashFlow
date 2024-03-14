import React, { useEffect, useState } from "react";
import { Heading } from "./heading";
import { SubHeading } from "./subHeading";
import axios from "axios";
import { Button } from "./button";
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
          "http://localhost:3000/cfapi/v1/user/userprofile",
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
    localStorage.removeItem("username")
    navigate("/")
  }

  return (
    <div className="flex justify-between py-4">
      <div className="ml-10">
        <Heading heading={"CashFlow"} />
      </div>
      <div className="mr-10 flex">
      <div className="items-center align-middle mr-8 mt-1">
        <SubHeading subheading={`Hello, ${firstname} ${lastname}`} />
      </div>
        <div>
          <button
            onClick={handleLogout}
            className="bg-white text-blue-800 text-xl px-8 py-1 rounded-xl border font-semibold border-gray-200 shadow-xl"
          >
            <h1>Logout</h1>
          </button>
        </div>
      </div>
    </div>
  );
};
