export async function getTasks(columnId){

    const res = await fetch("http://localhost/my_stuff/TaskBoard/TaskBoard/backend/api/index.php?q=get-tasks-of-column",{
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({columnId}),
    });
    return await res.json();
}