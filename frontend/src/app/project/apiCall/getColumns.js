export async function getColumns(projectId){
    const res = await fetch("http://localhost/my_stuff/TaskBoard/TaskBoard/backend/api/index.php?q=get-projectcolumns-by-id",{
        method: "POST",
        headers: {"Content-Type" : "application/json"},
        body: JSON.stringify({projectId}),
        

    });
    return await res.json();
    
}