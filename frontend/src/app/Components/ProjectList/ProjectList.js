import NewProject from "../NewProject/NewProject";
import style from "./ProjectList.module.css";
import { useRouter } from "next/navigation";
import slugify from "slugify";
export default function ProjectList({projects,user}){
    if(projects && projects.length>0){
        const router = useRouter();
        
        const routeToProj = ((projName,projId) => {
                router.push(`/project/${slugify(projName,{lower:true})}-${projId}`);
        });
        
        return(
            
                
                <div className={style.containerForTheProjects}>
                    <div className={style.contentBox}>
                        <h1 className={style.title}>Projects</h1>

                        <div className={style.projectsRow}>
                        <NewProject user={user} />
                        {projects.map((project) => 
                            <div key={project.project_id} className={style.projectCard} onClick={() => routeToProj(project.project_name , project.project_id)}>
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