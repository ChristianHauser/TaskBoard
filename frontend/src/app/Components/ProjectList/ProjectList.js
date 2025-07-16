import NewProject from "../NewProject/NewProject";
import style from "./ProjectList.module.css";
export default function ProjectList({projects,user}){
    if(projects && projects.length>0){
        
        console.log(projects.map(p => p.project_id));
        return(
            
                
                <div className={style.containerForTheProjects}>
                    <div className={style.contentBox}>
                        <h1 className={style.title}>Projects</h1>

                        <div className={style.projectsRow}>
                        <NewProject user={user} />
                        {projects.map((project) => 
                            <div key={project.project_id} className={style.projectCard}>
                                <p className={style.projectName}>{project.project_name} </p>
                                <div className={style.roleAndTime}>
                                    <p className={style.updatedAt}>{project.updated_at}</p>
                                    <p className={style.role}>{project.role}</p>
                                </div>
                                
                            </div>
                        )}
                        </div>
                    </div>
                </div>
        )
        
    }
    return <p>No Projects yet</p>
}