import {getColumns} from "../../apiCall/getColumns.js";
import {getTasks} from "../../apiCall/getTasksApi.js";
import {useState, useEffect} from "react";
import Task from "../Task/Task.js";
export default function Column({projectId}){

    const [taskArray, setTaskarray] = useState([]);
    const [columns, setColumns] = useState([]);

    useEffect(() =>{

        async function getData(){
        
        const result = await getColumns(projectId);
        const columnsArray = result.columnsOfProj || [];
        //console.log(columnsArray);
        setColumns(columnsArray);
        //let tasksArr = [];
        if(columnsArray){

            const tasksArr = await Promise.all(
                columnsArray.map(cols => {
                    return getTasks(cols.id);
                }
                    
                )
            )
            /* for(let i = 0; i<columnsArray.length;i++){
                
                tasksArr.push(await getTasks(columnsArray[i].id));
            } */
            //console.log("TEST" + JSON.stringify(tasksArr[0][0].id));
            setTaskarray(tasksArr);
            


            
        }
        

        }
        getData();
        
    },[projectId]);
    //what should hapüpen here, i need to get my colums of this proiject via the project id
    //after every colums insertion i get last inserted id of that column so i can search the task tables for its tasks by its column id
    
    
    return(
        <div className="columns">

            {columns.map((cols, idx) =>{
                    return(
                        <div key={cols.id}>
                            {cols.name}
                                <div>
                                                                            
                                    <Task taskArray={taskArray[idx]}></Task>
                                                                                                                
                                </div>
                                
                        </div>  
                 
                    );
                })
                
            }
            
        </div>
    )
}