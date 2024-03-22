import React, { useState } from "react";
import { Navbar } from "../components/Navbar";
import { Heading } from "../components/heading";
import { Balance } from "../components/Balance";
import { Usercard } from "../components/Usercard";

export const Dashboard = () => {
    const [user,setuser] = useState("")
    return (
        <div className="bg-blue-800 h-full">
            <Navbar/>
            <hr />
            <Balance/>
            <Usercard />
        </div>
    )
}