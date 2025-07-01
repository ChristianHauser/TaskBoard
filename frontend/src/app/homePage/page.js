'use client';
import {auth,useAuth} from "../firebaseConfig/firebaseInit";

import { onAuthStateChanged } from "firebase/auth";

import { useEffect, useState } from "react";

export default function homePage(){

//const  [user, setUser] = useState(null);

const user = useAuth();
async function awaitToken(){
    if(user){
    const tokenId = await user.getIdToken();
        fetch("http://localhost/my_stuff/TaskBoard/TaskBoard/backend/api/verification.php",{
            method: "POST",
            headers: {"Content-Type": "application/json", Authorization: `Bearer ${tokenId}`
            },
            
            body: JSON.stringify({tokenId}),

        })
    }
}
awaitToken();

return(
    <div>
    <h1>Welcome home {user ? user.email : "loading"}</h1>
    <a  href="./someOtherSite" target="_blank">AYO WHAAT</a>
    </div>
)





}