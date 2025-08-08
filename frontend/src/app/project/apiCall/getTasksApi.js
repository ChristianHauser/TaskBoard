export async function getTasks(taskId){

    const res = await fetch("http://localhost/my_stuff/TaskBoard/TaskBoard/backend/api/getTasks.php",{
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({taskId}),
    });
    return await res.json();
}