import React, { useEffect, useState } from "react";
import { Heading } from "./heading";
import axios from "axios";

export const Balance = () => {
  const username = localStorage.getItem("username");
  const token = localStorage.getItem(`security-token-for-${username}`);
  const headers = { Authorization: `Bearer ${token}` };
  const [balance, setBalance] = useState(null);

  useEffect(() => {
    const fetchBalance = async () => {
        try {
            const response = await axios.get("http://localhost:3000/cfapi/v1/account/balance",{headers})
            const formatBalance = Number(response.data.balance).toFixed(2)
            setBalance(formatBalance)
        } catch (error) {
            console.log("Balance fetch error occured",error)

        }
    }
    fetchBalance();
  },[]);
  return (
    <div className="flex ml-10 mt-5">
      <Heading heading={"Your balance:"} />
      <h1 className="text-white text-2xl font-semibold text-center pl-2">
        ₹{balance}
      </h1>
    </div>
  );
};
