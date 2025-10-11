import { useRouter } from "next/navigation";
import {auth,useAuth} from "../../firebaseConfig/firebaseInit";
import styles from "./NewProject.module.css";
import { AiFillPlusSquare } from "react-icons/ai";
import { AiOutlinePlus } from "react-icons/ai";

import{verifyToken} from "../../api/homePageApiCalls.js";
export default function NewProject({user}){
    const router = useRouter();

    
    const createNewProject =  async function (){
        
        if(!user) return;
        const tokenId = await auth.currentUser.getIdToken(true);
        console.log(user);
        
        try{
            
            await verifyToken(tokenId);
            const res = await fetch("http://localhost/my_stuff/TaskBoard/TaskBoard/backend/api/index.php?q=create-new-project", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({user})        
            })
            
                if(!res.ok){
                    
                    const errorText = await res.text();
                    throw new Error(`Creating Project Failed: ${res.status} - ${errorText}`);
                }
                
                const data = await res.json();
                
                const projId = data.project_id;
                
                router.push(`/project/${projId}`);
        }catch(err){
            console.log(err);
        }
        
        
    }
    return(
        <div className={styles.newProject} title="Neues Projekt Erstellen" onClick={createNewProject}>
            <p className={styles.text}>Add new Project</p>
            <AiOutlinePlus size={28} className={styles.icon}/>
        </div>
    );
}