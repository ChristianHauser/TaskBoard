export async function createANewTask(title,content,colId,projectId){

    const res = await fetch("http://localhost/my_stuff/TaskBoard/TaskBoard/backend/api/index.php?q=create-new-task",{
        method: {"Content-Type" : "application/json"},
        body: JSON.stringify({title,content,colId, projectId}),
        method: "POST",

    })
    if(res.ok){
        return await res.json();
    }

}