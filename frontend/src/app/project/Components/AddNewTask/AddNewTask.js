import style from "./AddNewTask.module.css";
import {createANewTask} from "../../apiCall/createATask.js";
import {getTasks} from "../../apiCall/getTasksApi"
import {createPortal} from "react-dom";
import {useState, useEffect} from "react";
export default function AddNewTask({column, projectId, tasksByColumn, setTaskByColumn, showingPopup, setShowingPopup, currentColumn}){

    
    //const [mounted, setMounted] = useState(false);

    //useEffect(() => setMounted(true), []);

    const handleSubmit = async (e)=>{
        e.preventDefault();
        const formData = new FormData(e.target);
        await createANewTask(formData.get("headline"),formData.get("content"),formData.get("column"),projectId);
        await getData(formData.get("column"));
        
    }
    async function getData(columnId) {

        const newArray = await getTasks(columnId);
        setTaskByColumn(prev => ({
                ...prev,                
                [columnId]: Array.isArray(newArray) 
                ? newArray 
                : newArray.tasks || []
        }));
    }


    return(
        <>
        
        {showingPopup && createPortal(
            
            <div className={style.overlay}>
            <div className={style.addTaskContainer}>
            <form onSubmit={handleSubmit}>
                <label>Aufgabentitel:</label>
                <input name="headline"></input>
                <label>Beschreibung:</label>
                <input name="content"></input>
                <label>Column:</label>
                <select name="column" defaultValue={currentColumn}>
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
                <button type="button" onClick={() =>setShowingPopup(false)}>
                    Cancel
                </button>   
            </form>

            </div>
        </div>, document.body
        )}
        
        </>
    )
}