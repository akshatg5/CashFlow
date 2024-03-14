import React from "react";
import { Heading } from "./heading";

export const Balance = ({balance}) => {
    return (
        <div className="flex ml-10 mt-5">
        <Heading heading={"Your balance:"} />
        <h1 className="text-white text-2xl font-semibold text-center pl-2">₹{balance}</h1>
        </div>
    )
}