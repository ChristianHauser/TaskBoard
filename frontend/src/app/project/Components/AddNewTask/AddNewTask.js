import style from "./AddNewTask.module.css";
import {createANewTask} from "../../apiCall/taskBoardApiCalls";
import {getTasks} from "../../apiCall/taskBoardApiCalls"
import {createPortal} from "react-dom";
import {useState, useEffect} from "react";
import Overlay from "../Overlay/Overlay";
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
        
        
            
            <Overlay open={showingPopup} onClose={()=> setShowingPopup(false)} >
            
            <form className={style.formContainer} onSubmit={(e)=>{handleSubmit(e);setShowingPopup(false);}}>
                <label className={style.labelTitle}>Aufgabentitel:</label>
                <input required className={style.inputField} name="headline"></input>
                <label className={style.labelTitle}>Beschreibung:</label>
                <textarea className={style.textArea} name="content"></textarea>
                <label className={style.zeileTitle}>Zeile: <select className={style.selectField} name="column" defaultValue={currentColumn}>
                    {
                        column.map(element => {
                            return(
                            <option key={element.id} value={element.id}>
                                {element.name}
                            </option>
                            )
                        })
                    }
                    

                    
                </select></label>
                
                <button className={style.submitButton} type="submit">Submit</button>
                
            </form>

            
        </Overlay>
        
        
        </>
    )
}