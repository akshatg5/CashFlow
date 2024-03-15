import { useEffect, useState } from "react";
import React from "react";
import { Heading } from "./heading";
import { SubHeading } from "./subHeading";
import { Searchbar } from "../components/Searchbar";
import { Button } from "./button";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Usercard = () => {
  const [users, setUsers] = useState([]);
  const [filter,setFilter] = useState("")

  useEffect(() => {
    const username =localStorage.getItem('username')
    const token = localStorage.getItem(`security-token-for-${username}`);
    const headers = {Authorization : `Bearer ${token}`}
    axios.get(("https://cash-flow-backend.vercel.app/cfapi/v1/user/all-users?filter="+filter),{headers}).then(response => {
      setUsers(response.data.user)
    }).catch(error => {
      console.error("Error fetching the user list: ",error)
    })
  },[filter])

  return (
    <div className="flex-flex-col items-center">
    <Searchbar onChange={(e) => {
      setFilter(e.target.value)
    }} />
      {users.map((user, index) => (
        <User user={user} key={index}/>
      ))}
    </div>
  );
};

function User({ user }) {
  const navigate = useNavigate();
  const icon = user.firstName[0].toUpperCase();

  console.log(icon)
  return (
    <div className="flex justify-between my-1 mx-8">
      <div className="flex">
        <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
          <div className="flex flex-col justify-center h-full text-xl">
            {icon}
          </div>
        </div>
        <div className="flex flex-col justify-center h-ful">
          <div>
            <h1 className="text-white text-2xl">
              {user.firstName} {user.lastName}
            </h1>
          </div>
        </div>
      </div>

      <div className="flex flex-col justify-center h-ful">
        <Button btnText={"Send Money"} onClick={(e) => {
          navigate(`/sendmoney?id=${user._id}&name=${user.firstName}`)
        }} />
      </div>
    </div>
  );
}
