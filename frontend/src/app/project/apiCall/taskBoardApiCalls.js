

const BASE = "http://localhost/my_stuff/TaskBoard/TaskBoard/backend/api/index.php";

async function jsonFetch(path, payload) {
  const res = await fetch(`${BASE}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`HTTP ${res.status} ${res.statusText}: ${text}`);
  }
  return res.json();
}

export async function createANewTask(title, content, colId, projectId) {
  return jsonFetch("?q=create-new-task", { title, content, colId, projectId });
}

export async function getTasks(columnId) {
  return jsonFetch("?q=get-tasks-of-column", { columnId });
}

export async function getColumns(projectId) {
  return jsonFetch("?q=get-projectcolumns-by-id", { projectId });
}

export async function setProjectName(projectName, projectId) {
  return jsonFetch("?q=set-project-name", { projectName, projectId });
}

export async function setColumnName(colId, newColName) {
  return jsonFetch("?q=set-column-name", { colId, newColName });
}

export async function getBoard(projId,userId) {
    return jsonFetch("?q=get-board", projId, userId);
}

export async function moveTask(taskId,colId){
  return jsonFetch("?q=move-task", {taskId, colId});
}