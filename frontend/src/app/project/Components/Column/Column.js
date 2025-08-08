import {getColumns} from "../../apiCall/getColumns.js";

export default function Column({projectId}){

    //what should hapüpen here, i need to get my colums of this proiject via the project id
    //after every colums insertion i get last inserted id of that column so i can search the task tables for its tasks by its column id
    async function getData(){
        
        const result = await getColumns(projectId);
        const columnsArray = result.columnsOfProj;
        console.log(columnsArray);
        let tasksArray = [];
        if(columnsArray){
            for(let i = 0; i<columnsArray.length;i++){
                tasksArray.push(await getTasks(columnsArray[i].id));
            }
        }
        console.log(tasksArray);
    }
    getData();
    return(
        <div>

        </div>
    )
}