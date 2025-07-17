import { useRouter } from "next/navigation";
import {auth,useAuth} from "../../firebaseConfig/firebaseInit";
import styles from "./NewProject.module.css";
import { AiFillPlusSquare } from "react-icons/ai";
import { AiOutlinePlus } from "react-icons/ai";

import{verifyToken} from "../../api/getprojects.js";
export default function NewProject({user}){
    const router = useRouter();

    
    const createNewProject =  async function (){
        console.log(user);
        if(!user) return;
        const tokenId = await auth.currentUser.getIdToken(true);
        console.log(tokenId);
        try{
            await verifyToken(tokenId);
            const res = await fetch("http://localhost/my_stuff/TaskBoard/TaskBoard/backend/api/createNewProject.php", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: {user}           
            })
                if(!res.ok){
                    const errorText = await res.text();
                    throw new Error(`Creating Project Failed: ${res.status} - ${errorText}`);
                }
                router.push("/project");
        }catch{
            console.log(`Error no valid tokenId found `);
        }
        
        
    }
    return(
        <div className={styles.newProject} onClick={createNewProject}>
            <p className={styles.text}>Add new Project</p>
            <AiOutlinePlus size={28} className={styles.icon}/>
        </div>
    );
}