import style from "./AddNewTask.module.css";
import {createANewTask} from "../../apiCall/createATask.js";


export default function AddNewTask({column, projectId,onTaskAdded}){

    const handleSubmit = (e)=>{
        e.preventDefault();
        const formData = new FormData(e.target);
        createANewTask(formData.get("headline"),formData.get("content"),formData.get("column"),projectId);
        
    }

    if (typeof onTaskAdded === "function") {
    onTaskAdded(); 
    }
    

    return(

        <div className={style.AddTaskContainer}>
            <form onSubmit={handleSubmit}>
                <label>Titel:</label>
                <input name="headline"></input>
                <label>Inhalt:</label>
                <input name="content"></input>
                <label>Column:</label>
                <select name="column">
                    {
                        column.map(element => {
                            return(
                            <option key={element.id} value={element.id}>
                                {element.name}
                            </option>
                            )
                        })
                    }
                    
                    
                </select>
                <button type="submit">Submit</button>

            </form>

        </div>
    )
}