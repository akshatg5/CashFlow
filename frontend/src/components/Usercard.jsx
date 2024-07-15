import { useEffect, useState } from "react";
import React from "react";
import { Searchbar } from "../components/Searchbar";
import { Button } from "./button";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Usercard = () => {
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    const username = localStorage.getItem('username');
    const token = localStorage.getItem(`security-token-for-${username}`);
    const headers = { Authorization: `Bearer ${token}` };
    axios.get(`https://cash-flow-backend.vercel.app/cfapi/v1/user/all-users?filter=${filter}`, { headers })
      .then(response => {
        setUsers(response.data.user);
      })
      .catch(error => {
        console.error("Error fetching the user list: ", error);
      });
  }, [filter]);

  return (
    <div className="flex flex-col items-center px-4 sm:px-10 py-4">
      <Searchbar onChange={(e) => setFilter(e.target.value)} />
      {users.map((user, index) => (
        <User user={user} key={index} />
      ))}
    </div>
  );
};

function User({ user }) {
  const navigate = useNavigate();
  const icon = user.firstName[0].toUpperCase();

  return (
    <div className="flex flex-col sm:flex-row justify-between items-center bg-blue-600 rounded-lg p-4 my-2 w-full max-w-md sm:max-w-2xl mx-auto">
      <div className="flex items-center mb-4 sm:mb-0">
        <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center items-center mr-4">
          <div className="text-xl">
            {icon}
          </div>
        </div>
        <div>
          <h1 className="text-white text-xl sm:text-2xl">
            {user.firstName} {user.lastName}
          </h1>
        </div>
      </div>

      <Button
        btnText={"Send Money"}
        onClick={() => navigate(`/sendmoney?id=${user._id}&name=${user.firstName}`)}
        className="w-full sm:w-auto"
      />
    </div>
  );
}
