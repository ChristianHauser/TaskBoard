"use client";

import {auth,useAuth} from "../../firebaseConfig/firebaseInit.js";
import {verifyToken} from "../../api/homePageApiCalls.js";
import {useState, useEffect} from "react";
import Header from "../../Components/Header/Header.js";
import {useParams} from "next/navigation";
import slugify from "slugify";
import Column from "../Components/Column/Column.js";
import AddNewTask from "../Components/AddNewTask/AddNewTask.js";
import { getProjectName } from "@/app/api/homePageApiCalls.js";

import EditTextField from "../Components/EditTextField/EditTextField.js";
import { setProjectName } from "../apiCall/taskBoardApiCalls.js";
export default function project(){

    const urlInfo = useParams();
    const [urlState, setUrlState] = useState(urlInfo);
    const {user,loading} = useAuth();
    const [projName, setProjName] = useState();
    const [displayName, setDisplayName] = useState();
    const parts = urlState.id.split("-");
    const name = parts.slice(0,-1).join(" ");
    const projectId = parts[parts.length-1];

    useEffect(()=>{
        if(!projName || !projectId)return;

        const slug = slugify(projName, {lower: true, strict:true});
        const nextUrl = `/project/${slug}-${projectId}`;

        
        if (window.location.pathname !== nextUrl) {
        window.history.replaceState(null, "", nextUrl);
        }

    }, [projName, projectId]);
    
    useEffect(() =>{
        async function init(){
            if(user){
                
                const tokenId = await user.getIdToken(true);
                await verifyToken(tokenId);
                
                
                setDisplayName(user.displayName);
                const projectName = await getProjectName(projectId);
                setProjName(projectName.project_name);
                console.log(projectName);
            }
        
    }

    init();
    }, [user,loading]);

    
    //<Header user={user}></Header> <h2 className={style.projName}>{projName}</h2>
    
   
    const handleCommit = async (text)=>{
        const finalText = text || "Unbennantes Projekt";
        const prev = finalText;
        setProjName(finalText);
        try{
            await setProjectName(finalText,projectId);
            console.log("changedName");

        }catch(e){
            console.log(e);
        }
        
        
    }
    
    
    return(
        <div>
            <EditTextField value={projName} placeholder={"Unbennantes Projekt"}onCommit={handleCommit}></EditTextField>
            
            <Column projectId={projectId}></Column>
            
        </div>
    )
}