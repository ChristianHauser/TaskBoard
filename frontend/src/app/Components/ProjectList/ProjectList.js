import NewProject from "../NewProject/NewProject";

export default function ProjectList({projects,user}){
    if(projects && projects.length>0){
        
        console.log(projects.map(p => p.project_id));
        return(
            <div>
                <h1>Projects</h1>
                <NewProject user= {user}></NewProject>
                    {
                        projects.map((project) =>{ 
                            return (
                                
                                <div key={project.project_id}>
                                    
                                    <p>{project.project_name}</p>
                                    <p>{project.updated_at}</p>
                                </div>
                            );
                        })
                    }
            </div>
        )
        
    }
    return <p>No Projects yet</p>
}