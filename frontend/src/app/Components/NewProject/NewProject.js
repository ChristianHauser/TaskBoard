import { useRouter } from "next/navigation";
import {auth,useAuth} from "../../firebaseConfig/firebaseInit";
export default function NewProject({user}){
    const router = useRouter();

    
    const createNewProject =  async function (){
        if(!user) return;
        const tokenId = await auth.currentUser.getIdToken(true);
        console.log(tokenId);
        try{
            const res = await fetch("http://localhost/my_stuff/TaskBoard/TaskBoard/backend/api/createNewProject.php", {
            method: "POST",
            headers: {"Content-Type": "application/json", Authorization: `Bearer ${tokenId}`},           
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
        <div className="newProject" onClick={createNewProject}>
            Hallo oi
        </div>
    );
}