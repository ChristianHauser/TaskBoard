import {useState} from "react";
import style from "./Task.module.css";
import formatDate from "../FormatDate/formatDate.js";
export default function Task({taskArray}){
    
    
    if(taskArray){
        return(
        <div>
            {taskArray.map(task=> {
                return(
                    <div className={style.singleTask}key={task.id}>
                        {task.head_line}<br></br>
                        <span className={style.createdAt}>{formatDate(task.created_at)}</span>
                        <span className={style.assignedUser}>{task.assigned_user_id}</span>
                    </div>
                );
                
            })}
        
        </div>
        )
    }
    return <div>loading</div>
}