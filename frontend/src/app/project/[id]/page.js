"use client";

import {auth,useAuth} from "../../firebaseConfig/firebaseInit.js";
import {verifyToken} from "../../api/getprojects.js";
import {useState, useEffect} from "react";
import Header from "../../Components/Header/Header.js";
import {useParams} from "next/navigation";
import slugify from "slugify";
import Column from "../Components/Column/Column.js";
import AddNewTask from "../Components/AddNewTask/AddNewTask.js";
export default function project(){

    const urlInfo = useParams();
    const {user,loading} = useAuth();
    const [displayName, setDisplayName] = useState();
    
    useEffect(() =>{
        async function init(){
            if(user){
                
                const tokenId = await user.getIdToken(true);
                await verifyToken(tokenId);

                console.log("troken verified");
                setDisplayName(user.displayName);
            }
        
    }

    init();
    }, [user,loading]);
    
    //<Header user={user}></Header>
    
    const parts = urlInfo.id.split("-");
    const name = parts.slice(0,-1).join(" ");
    const projectId = parts[parts.length-1];
    console.log(projectId);
    
    return(
        <div>
            <Header user={user}></Header>
            <p>{displayName} {name} {projectId}</p>
            <Column projectId={projectId}></Column>
            
        </div>
    )
}