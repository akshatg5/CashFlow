import React from "react";
import { Navbar } from "../components/Navbar";
import { Heading } from "../components/heading";
import { Balance } from "../components/Balance";

export const Dashboard = () => {
    return (
        <div className="bg-blue-800 h-screen">
            <Navbar username={"Akshat"} />
            <hr />
            <Balance balance={180902}/>
        </div>
    )
}