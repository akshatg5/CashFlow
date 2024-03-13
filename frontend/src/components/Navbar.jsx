import React from "react";
import { Heading } from "./heading";
import { SubHeading } from "./subHeading";

export const Navbar = ({username}) => {
    return (
        <div className="flex justify-between py-4">
        <div className="ml-10">
            <Heading heading={"CashFlow"} />
        </div>
        <div className="mr-10">
            <SubHeading subheading={`Hello,${username}`} />
        </div>
        </div>
    )
}