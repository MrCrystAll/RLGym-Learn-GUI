import { useEffect } from "react";
import LearningCoordinatorConfigEditor from "./rlgym-learn/LearningCoordinatorConfigEditor";
import type { LearningCoordinatorConfigModel } from "../../models/rlgym-learn/api";


interface ProjectDataEditorArgs{
    backToHome: () => void,

    updateProjectConfig: (config: LearningCoordinatorConfigModel) => void
    projectConfig: LearningCoordinatorConfigModel
}

function ProjectDataEditor({backToHome, updateProjectConfig, projectConfig}: ProjectDataEditorArgs) 
{
    useEffect(() => {
        return () => {                
            window.api.removeAllListeners();
        }
    }, [])
    
    const updateConfig = (config: LearningCoordinatorConfigModel) => {
        updateProjectConfig(config);
    }

    
    return (
        <div className="bg-dark text-light">
            <button className="btn btn-success" onClick={backToHome}>Back to run main</button>
            <LearningCoordinatorConfigEditor learningCoordinatorConfig={projectConfig} setLearningCoordinatorConfig={updateConfig}/>
        </div>
    )

  
}

export default ProjectDataEditor
