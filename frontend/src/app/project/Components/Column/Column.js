import { getColumns } from "../../apiCall/taskBoardApiCalls.js";
import { getTasks } from "../../apiCall/taskBoardApiCalls.js";
import { useState, useEffect } from "react";
import Task from "../Task/Task.js";
import style from "./Column.module.css";
import AddNewTask from "../../Components/AddNewTask/AddNewTask.js";

export default function Column({ projectId }) {
  const [columns, setColumns] = useState([]);
  const [tasksByColumn, setTasksByColumn] = useState({}); // <-- Mapping nach column_id
  const [showingPopup, setShowingPopup] = useState(false);
  const [currentColumn, setCurrentColumn] = useState();
  useEffect(() => {
    let isMounted = true;
    getData(isMounted);
    return ()=> {
      isMounted = false;
    }
    
  }, [projectId]);

  async function getData(isMounted) {
    if(!isMounted) return;
    console.log("GET DATA BEING CALLED")
      const result = await getColumns(projectId);
      const columnsArray = result.columnsOfProj || [];
      
      setColumns(columnsArray);

      if (columnsArray.length) {
        const tasksArr = await Promise.all(
          columnsArray.map(col => getTasks(col.id))
        );
        console.log(tasksArr);
        
        const newTasksByColumn = {};
        columnsArray.forEach((col, idx) => {
          newTasksByColumn[col.id] = tasksArr[idx] || [];
        });

        setTasksByColumn(newTasksByColumn);
      }
    }  

  return (
    <>
    <div className={style.allColumns}>
      
      {columns.map(col => 
        <div className={style.singleColumn} key={col.id}>
          <div className={style.colTitle}>{col.name}</div>
          <Task colId={col.id} setShowingPopup={setShowingPopup} setCurrentColumn={setCurrentColumn} taskArray={tasksByColumn[col.id] || []} />
          
        </div>
      )}
      
    </div>
    <AddNewTask projectId={projectId} column={columns} tasksArray={tasksByColumn} setTaskByColumn={setTasksByColumn} showingPopup={showingPopup} setShowingPopup={setShowingPopup} currentColumn={currentColumn}></AddNewTask>
    </>
  );
}
