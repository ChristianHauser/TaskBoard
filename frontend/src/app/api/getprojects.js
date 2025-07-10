
"user client";
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

export async function getproject(tokenId){

    const res = await fetch("http://localhost/my_stuff/TaskBoard/TaskBoard/backend/api/getProjects.php", {
        method: "POST",
        headers: {"Content-Type": "application/json", Authorization: `Bearer ${tokenId}`},
        
    });

    const dataOfProj = await res.json();
    
    return dataOfProj.projectData;
        
    
}
