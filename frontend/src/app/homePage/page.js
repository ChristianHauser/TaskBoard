'use client';
import {auth,useAuth} from "../firebaseConfig/firebaseInit";

import { onAuthStateChanged } from "firebase/auth";

import { useEffect, useState } from "react";

export default function homePage(){
const [projects, setProjects] = useState ([]);
//const  [user, setUser] = useState(null);
const {user, loading} = useAuth();
useEffect(() => {
    
    if(loading || !user) return;
    async function awaitToken(){
        if(user){
            if (!auth.currentUser) {
                console.error("No current user. Can't get token.");
                return;
            }

            const tokenId = await auth.currentUser.getIdToken(true);
            
            const res = await fetch("http://localhost/my_stuff/TaskBoard/TaskBoard/backend/api/verification.php",{
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${tokenId}`,
                },
            });
            if (!res.ok) {
                const errorText = await res.text();
                throw new Error(`Verification failed: ${res.status} - ${errorText}`);
            }
            const data = await res.json();
            console.log("token is verified");
            console.log(data);
            
            getProjects(tokenId);
           
        }
    }
    awaitToken();
}, [user,loading]);



async function getProjects(tokenId){
    
    const res = await fetch("http://localhost/my_stuff/TaskBoard/TaskBoard/backend/api/getProjects.php", {
        method: "POST",
        headers: {"Content-Type": "application/json", Authorization: `Bearer ${tokenId}`},
        
    });

    const dataOfProj = await res.json();
    
    setProjects(dataOfProj.projectData);
    
}
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
    <p>{projects && projects.length > 0 ? JSON.stringify(projects[1].project_name) : "No projects yet"}</p>
    </div>
)





}