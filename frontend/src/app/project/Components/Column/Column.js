import { getColumns, moveTask } from "../../apiCall/taskBoardApiCalls.js";
import { getTasks,setColumnName,getBoard } from "../../apiCall/taskBoardApiCalls.js";
import { useState, useEffect, useRef} from "react";
import Task from "../Task/Task.js";
import style from "./Column.module.css";
import AddNewTask from "../../Components/AddNewTask/AddNewTask.js";
import EditTextField from "../EditTextField/EditTextField.js";

export default function Column({ projectId }) {
  const [columns, setColumns] = useState([]);
  const [tasksByColumn, setTasksByColumn] = useState({}); // <-- Mapping nach column_id
  const [showingPopup, setShowingPopup] = useState(false);
  const [currentColumn, setCurrentColumn] = useState();
  const [showTaskPopup,setShowTaskPopup] = useState(false);

  const [columnId, setColumnId] = useState();
  
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

    useEffect (()=>{
      if(tasksByColumn){
        console.log(tasksByColumn);
      }
    },[tasksByColumn])
    const handleCommit = async(text,colId,colName)=>{
      const finalText = text?.trim() || "Unbenannte Zeile";
      const prev = colName;
      if(finalText === prev)return;
      console.log(columns);

      setColumns(curr =>
        curr.map(c=> (c.id === colId) ? {...c, name:finalText} : c));

      
      await setColumnName(colId,finalText);
     
      
      console.log(columns);
      //<div  className={style.colTitle}>{col.name}</div>

    }

    const handleTaskMove = async(taskId,fromColId,colRef,curTargRef)=>{
      console.log(fromColId);
      
      let colRefId = (colRef.current?.dataset?.colId ?? fromColId);
     console.log(colRefId);
      
      if(parseInt(fromColId) === parseInt(colRefId)){
        
        curTargRef.current.style.top =  "0px";
        curTargRef.current.style.left = "0px";
        
        setTasksByColumn(prev=> prev);
        return;
      } 
      setTasksByColumn(prev =>{
        
        const from = prev[fromColId] ?? [];
        const to = prev[colRefId] ?? [];
        const task = from.find(t => t.id === taskId);
        const taskWithColId = {...task, column_id: colRefId};
        
        return{
          ...prev,
          [fromColId]: from.filter(t => t.id !== taskId),
          [colRefId]: [...to, taskWithColId],
        };

      });
      //Database actually changing stuff
      console.log(colRefId)
      console.log(taskId)
      await moveTask(taskId,colRefId);
      console.log("Database önderungen")

    };

  return (
    <>
    <div className={style.allColumns}>
      
      {columns.map(col => 
        <div className={style.singleColumn} key={col.id} data-col-id={col.id}>
          
          <div className={style.columnName}>
          <EditTextField  value={col.name} placeholder={"Unbennante Zeile"} onCommit={(text) => handleCommit(text,col.id,col.name)}></EditTextField>
          </div>
          <Task moveTask={(taskId,fromColId,curTargRef,colRef)=>handleTaskMove(taskId,fromColId,colRef,curTargRef)} showTaskPopup={showTaskPopup} setShowTaskPopup={setShowTaskPopup} colId={col.id} setShowingPopup={setShowingPopup} setCurrentColumn={setCurrentColumn} taskArray={tasksByColumn[col.id] || []} />
          
        </div>
      )}
      
    </div>
    <AddNewTask  projectId={projectId} column={columns} tasksArray={tasksByColumn} setTaskByColumn={setTasksByColumn} showingPopup={showingPopup} setShowingPopup={setShowingPopup} currentColumn={currentColumn}></AddNewTask>
    </>
  );
}
