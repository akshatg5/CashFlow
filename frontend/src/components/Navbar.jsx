import React, { useEffect, useState } from "react";
import { Heading } from "./heading";
import { SubHeading } from "./subHeading";
import axios from "axios";

export const Navbar = () => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");

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

  return (
    <div className="flex justify-between py-4">
      <div className="ml-10">
        <Heading heading={"CashFlow"} />
      </div>
      <div className="mr-10">
        <SubHeading subheading={`Hello, ${firstname} ${lastname}`} />
      <div>
        Logout
      </div>
      </div>
    </div>
  );
};
