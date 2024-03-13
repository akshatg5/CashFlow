import React from "react";
import { Heading } from "../components/heading";
import { SubHeading } from "../components/subHeading";
import { Button } from "../components/button";
import { InputBox } from "../components/inputBox";

export const Signin = () => {
    return (
        <div className="bg-blue-800 h-screen flex items-center justify-center align-middle">
            <div className="rounded-lg shadow-xl px-10 py-8 max-w-md align-middle border border-gray-300">
            <Heading heading={"Sign In"} className="text-center text-3xl font-bold mb-6"/>
            <SubHeading subheading={"Enter username and password to log in."} className="text-gray-600 text-center mb-8"/>
            
        <InputBox  placeholder={"Username"} />
        <InputBox  placeholder={"Password"} />
        <div className="flex justify-center mt-10">
            <Button btnText={"Sign In"} warningText={"Create a new account here"} toLink={"/signup"} linkBtnText={"Sign Up"}/>
        </div>
            </div>
        </div>
    )
}