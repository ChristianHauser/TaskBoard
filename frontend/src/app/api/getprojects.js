
export async function verifyToken(tokenId){

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
                //const data = await res.json();
                console.log("token is verified");
                return await res.json();     

} 

export async function getproject(uid){

    const res = await fetch("http://localhost/my_stuff/TaskBoard/TaskBoard/backend/api/index.php?q=get-all-projects-of-user", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({uid})
        
    });

    const dataOfProj = await res.json();
    
    return dataOfProj.projectData;
        
    
}
