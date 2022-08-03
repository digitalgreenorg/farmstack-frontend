import React, { useState, useEffect } from "react";
import GuestUserBanner from "../../Components/GuestUser/GuestUserBanner";
import GuestUserDescription from "../../Components/GuestUser/GuestUserDescription";
import Loader from "../../Components/Loader/Loader";
import GuestUserNavBar from "../../Components/Navbar/GuestUserNavbar";

export default function GuestUserLegal(props){
    const [isLoader, setIsLoader] = useState(false);
    return(
        <>
        {isLoader ? <Loader /> : ""}
        <GuestUserNavBar />
        <GuestUserBanner />
        </>
    );
}