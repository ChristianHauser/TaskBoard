import {useState} from "react";
import style from "./Task.module.css";
import formatDate from "../FormatDate/formatDate.js";
import {useRef, useEffect} from "react";
export default function Task({taskArray}){
    const containerRef = useRef(null);
    const lastRef = useRef(null);
    
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

    // 👇 round UP so we cover any leftover pixels
    const totalRows = Math.ceil((grid.clientHeight + gap) / (row + gap));
    const span = Math.max(1, totalRows - rowsUsed);

    // start on the next free row and span to the bottom
    last.style.gridRow = `${rowsUsed + 1} / span ${span}`;
  };

  const ro = new ResizeObserver(measure);
  ro.observe(grid);
  measure();
  return () => ro.disconnect();
}, [taskArray.length]);
    
    if(taskArray){
        return(
        
        <div ref={containerRef} className={style.taskContainer}>
            {taskArray.map(task=> {
                return(
                    <div className={style.singleTask}key={task.id}>
                        {task.head_line}<br></br>
                        <span className={style.createdAt}>{formatDate(task.created_at)}</span>
                        <span className={style.assignedUser}>{task.assigned_user_id}</span>
                    </div>
                    
                );
                
            })}
            {isOdd && <div  className={style.ghost}></div>}
            <div ref={lastRef} className={style.addTask}>+</div>
           
        </div>
        
        
        )
    }
    return <div>loading</div>
}