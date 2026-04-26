import { useEffect } from "react";
import ChoosePythonPath from "../ChoosePythonPath";
import LearningCoordinatorConfigEditor from "./rlgym-learn/LearningCoordinatorConfigEditor";
import type { LearningCoordinatorConfigModel } from "../../models/rlgym-learn/api";

import {type ProjectMetadata} from "rlgym-learn-client"

interface ProjectDataEditorArgs{
    projectMetadata: ProjectMetadata
    updatePythonInterpreter: (path: string) => void,

    updateProjectConfig: (config: LearningCoordinatorConfigModel) => void
    projectConfig: LearningCoordinatorConfigModel
}

function ProjectDataEditor({projectMetadata, updatePythonInterpreter, updateProjectConfig, projectConfig}: ProjectDataEditorArgs) 
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
            <div className="d-flex align-items-center">
                <p>Python interpreter: {projectMetadata.interpreter}</p>
                <ChoosePythonPath setPythonPath={updatePythonInterpreter}></ChoosePythonPath>
            </div>
            <LearningCoordinatorConfigEditor learningCoordinatorConfig={projectConfig} setLearningCoordinatorConfig={updateConfig}/>
            <hr className="border border-light mx-2"/>
        </div>
    )

  
}

export default ProjectDataEditor
