import {useState} from "react";
import style from "./Task.module.css";
import formatDate from "../FormatDate/formatDate.js";
import {useRef, useEffect} from "react";
import Overlay from "../Overlay/Overlay";
export default function Task({taskArray, colId, setShowingPopup,setCurrentColumn,showTaskPopup,setShowTaskPopup}){
    const containerRef = useRef(null);
    const lastRef = useRef(null);
    const[extraHover, setExtraHover] = useState(false);
    const [selectedTask, setSelectedTask] = useState(null);

    const open = Boolean(selectedTask);
    
    const isOdd = taskArray?.length % 2 ===1;
    if(isOdd && lastRef){
        lastRef.current.style.setProperty("--topRight", "0");
    }

    useEffect(() => {
    if(!containerRef || !lastRef) return;
    const grid = containerRef.current;
    const last = lastRef.current;
    if (!grid || !last) return;

    const measure = () => {
    last.style.gridColumn = "1 / -1";
    last.style.gridRow = "auto";

    const cs  = getComputedStyle(grid);
    const row = parseFloat(cs.gridAutoRows);
    const gap = parseFloat(cs.rowGap) || 0;

    const taskCount = taskArray.length;
    const rowsUsed  = Math.ceil((taskCount + (taskCount % 2)) / 2);


    const totalRows = Math.ceil((grid.clientHeight + gap) / (row + gap));
    const span = Math.max(1, totalRows - rowsUsed);

    
    last.style.gridRow = `${rowsUsed + 1} / span ${span}`;
  };

  const ro = new ResizeObserver(measure);
  ro.observe(grid);
  measure();
  return () => ro.disconnect();
}, [taskArray.length]);



    
    if(taskArray){
        return(
        
        <div ref={containerRef} className={`${style.taskContainer} ${extraHover ? style.extraHover : ""}`}>
            {taskArray.map(task=> {
                return(
                    //Einzellnen Tasks
                    <div onClick={()=>{setSelectedTask(task);setShowTaskPopup(true);}} className={style.singleTask}key={task.id}>
                        <p className={style.headLine}>{task.head_line}</p><br></br>
                        <span className={style.createdAt}>{formatDate(task.created_at)}</span>
                        <span className={style.assignedUser}>{task.assigned_user_id}</span>
                    </div>
                    
                );
                
            })}

            {showTaskPopup && selectedTask &&(<Overlay open={open} onClose={()=> setSelectedTask(null)}>
                
                <p>{selectedTask.head_line}</p>
                <p>{selectedTask.content}</p>
                </Overlay>)}
            
            {isOdd && <div onMouseLeave={()=> setExtraHover(false)} onMouseEnter={()=> setExtraHover(true)}onClick={(e)=>{
                e.preventDefault();
                setShowingPopup(true);
                setCurrentColumn(colId);
                }}  className={`${style.ghost} ${style.addTask}`}></div>}

            <div onMouseLeave={()=> setExtraHover(false)} onMouseEnter={()=> setExtraHover(true)} onClick={(e)=>{
                e.preventDefault();
                setShowingPopup(true);
                setCurrentColumn(colId);
                }} 
                ref={lastRef} className={style.addTask}>+
            </div>
            
        </div>
        
        
        )
    }
    return <div>loading</div>
}