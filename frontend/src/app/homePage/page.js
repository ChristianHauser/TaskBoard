'use client';
import {auth,useAuth} from "../firebaseConfig/firebaseInit";

import { onAuthStateChanged } from "firebase/auth";

import { useEffect, useState } from "react";

export default function homePage(){
const [projects, setProjects] = useState ();
//const  [user, setUser] = useState(null);
const user = useAuth();
useEffect(() => {
    async function awaitToken(){
        if(user){
            const tokenId = await user.getIdToken();
            const res = await fetch("http://localhost/my_stuff/TaskBoard/TaskBoard/backend/api/verification.php",{
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${tokenId}`
                }
            });
            const data = await res.json();
            console.log("token is verified");
            console.log(data);
            getProjects(tokenId);
        }
    }
    awaitToken();
}, [user]);


async function getProjects(tokenId){
    
    const res = await fetch("http://localhost/my_stuff/TaskBoard/TaskBoard/backend/api/getProjects.php", {
        method: "POST",
        headers: {"Content-Type": "application/json", Authorization: `Bearer ${tokenId}`},
        
    });

    const projectData = await res.json();
    console.log(projectData);
    setProjects(projectData);
}



return(
    <div>
    <h1>Welcome home {user ? user.email : "loading"}</h1>
    <a  href="./someOtherSite" target="_blank">AYO WHAAT</a>
    <p>{JSON.stringify(projects)}</p>
    </div>
)





}