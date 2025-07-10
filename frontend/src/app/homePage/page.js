'use client';
import {auth,useAuth} from "../firebaseConfig/firebaseInit";

import { onAuthStateChanged } from "firebase/auth";
import{verifyToken,getproject} from "../api/getprojects.js";
import { useEffect, useState } from "react";
import ProjectList from "../Components/ProjectList";
export default function homePage(){

const [projects, setProjects] = useState ([]);
//const  [user, setUser] = useState(null);
const {user, loading} = useAuth();
useEffect(() => {
    
    if(loading || !user) return;
    async function init(){
        if(user){
            if (!auth.currentUser) {
                console.error("No current user. Can't get token.");
                return;
            }

            const tokenId = await auth.currentUser.getIdToken(true);
            await verifyToken(tokenId);
            
            setProjects(await getproject(tokenId));
        }
    }   
        init(); 
}, [user,loading]);





useEffect (() => {
    
    
    if(projects && projects.length>0){
        
        const projectName =  projects[0].project_name;
        console.log(projectName);
        
    }
    
}, [projects]);


return(
    <div>
    <h1>Welcome home {user ? user.email : "loading"}</h1><br></br>
    <div></div>
    <h2>Projects</h2>
    <ProjectList projects= {projects}></ProjectList>
    </div>
)





}