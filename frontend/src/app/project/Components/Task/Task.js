import {useState} from "react";


export default function Task({taskArray}){
    
    console.log("TEST"+ JSON.stringify(taskArray));
    if(taskArray){
        return(
        <div>
            {taskArray.map(task=> {
                return(
                    <div key={task.id}>
                        {task.headl_line}
                    </div>
                );
                
            })}
        </div>
        
        )
    }
    return <div>loading</div>
}