"use client";
import {auth, useAuth} from "../firebaseConfig/firebaseInit.js";
import {useState, useEffect} from "react";
export default function someOtherSite(){

    const user = useAuth();
    return <h1>Yoyo{user? user.email : "loading"}</h1>
}