import style from "./AddNewTask.module.css";
import {createANewTask} from "../../apiCall/createATask.js";
import {getTasks} from "../../apiCall/getTasksApi"

export default function AddNewTask({column, projectId, tasksByColumn, setTaskByColumn}){

    const handleSubmit = async (e)=>{
        e.preventDefault();
        const formData = new FormData(e.target);
        await createANewTask(formData.get("headline"),formData.get("content"),formData.get("column"),projectId);
        await getData(formData.get("column"));
        
    }
    async function getData(columnId) {

        const newArray = await getTasks(columnId);
         setTaskByColumn(prev => ({
    ...prev,                // keep old columns
    [columnId]: Array.isArray(newArray) 
      ? newArray 
      : newArray.tasks || [] // normalize to an array
  }));
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