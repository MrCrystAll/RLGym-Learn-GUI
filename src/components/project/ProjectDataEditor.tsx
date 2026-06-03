import { useEffect } from "react";
import LearningCoordinatorConfigEditor from "./rlgym-learn/LearningCoordinatorConfigEditor";
import type { LearningCoordinatorConfigModel } from "../../models/rlgym-learn/api";
import type { PPOAgentControllerConfigModel } from "rlgym-learn-client";


interface ProjectDataEditorArgs{
    backToHome: () => void,

    updateProjectConfig: (config: LearningCoordinatorConfigModel) => void
    projectConfig: LearningCoordinatorConfigModel,
    getDefaultConfig: (configType: string) => Promise<PPOAgentControllerConfigModel>
}

function ProjectDataEditor({backToHome, updateProjectConfig, projectConfig, getDefaultConfig}: ProjectDataEditorArgs) 
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
            <LearningCoordinatorConfigEditor getDefaultConfig={getDefaultConfig} learningCoordinatorConfig={projectConfig} setLearningCoordinatorConfig={updateConfig}/>
        </div>
    )

  
}

export default ProjectDataEditor
